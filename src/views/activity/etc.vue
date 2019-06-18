<template>
<div class="etc">
	<div class="above">
		<h2>输入办理ETC车主信息</h2>
		<Form :model="form" class="common-form"
		      :label-width="100" label-position="left" ref="form">
			<FormItem label="车主姓名" prop="name">
				<Input v-model="form.name" :maxlength="11" placeholder="务必与机动车所有人一致 "></Input>
			</FormItem>
			<FormItem label="车主常用手机号" prop="tel">
				<Input v-model="form.tel" :maxlength="11" placeholder="请填写车主常用手机号"></Input>
			</FormItem>
		</Form>

		<h2>输入办理ETC的车牌号</h2>
		<ul class="license">
			<template v-for="(val, index) in license">
				<li @click="getLicense(index)"
					:class="{'new-energy': index== 7 && !val, on: clickOn== index}">{{val}}</li>
				<i class="fa fa-circle" v-if="index== 1"></i>
			</template>
		</ul>
		<p class="rule">交通部规定，1辆车仅允许办理1张ETC卡，专车专用</p>

		<h2>选择车牌类型</h2>
		<ul class="plate">
			<li :class="['blue', {on: form.color=='blue'}]" @click="form.color='blue'">蓝牌</li>
			<li :class="['green', {on: form.color=='green'}]" @click="form.color='green'">绿牌</li>
			<li class="gray" @click="showAlert= true">其他</li>
		</ul>
		<p class="rule">暂只支持 ≦7座的个人小型汽车办理</p>
	</div>
	<div class="msg">
		<p>办理农行沪通ETC卡，免费领取ETC设备</p>
		<img src="~@/assets/img/obu/msg-text.png"/>
	</div>
	<submit-button class="next" :rules="rule" :datas="form" :feedback="true" @click="submit">下一步</submit-button>
	<custom-keyboard ref="keyboard" @ok="keyboardOk" @del="keyboardDel" @close="keyboardClose"></custom-keyboard>

	<div class="alert" v-show="showAlert">
		<div class="mask"></div>
		<div class="info">
			<h2>提示</h2>
			<p>抱歉，暂时仅支持<span class="bl">蓝色</span>和<span class="gr">绿色</span>车牌的车辆办理</p>
			<a @click="showAlert= false">确认</a>
		</div>
	</div>
</div>
</template>

<script>
import SubmitButton from '@/components/submit-button.vue'
import CustomKeyboard from '@/components/custom-keyboard.vue'
import { reg} from '@/util.js'
export default {
	name: "etc",
	components: { SubmitButton, CustomKeyboard},
	data(){
		return{
			form: {
				name: '',
				tel: '',
				license: '',
				color: 'blue',
				open_id: localStorage.getItem("OPENID")|| ''
			},
			plateArea: '京津沪渝苏浙豫粤川陕冀辽吉皖闽鄂湘鲁晋黑赣贵甘桂琼云青蒙藏宁新',
			plateType: 'ABCDEFGHJKLMNOPQRSTUVWXYZ',
			plateNum: '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ',
			license: ['','','','','','','',''],
			clickOn: null,
			rule: {
				name: { required: true, message:'请填写姓名'},
				tel: { validator: (rule, value, callback) => {
						if (reg.mobile.test(value)) {
							return callback();
						}else{
							return callback(new Error('请填写正确的手机号'));
						}
					}
				},
				license: { validator: (rule, value, callback) => {
						if (reg.vehicle.test(value)) {
							return callback();
						}else{
							return callback(new Error('请选择正确的车牌号'));
						}
					}
				},
			},
			showAlert: false
		}
	},
	computed:{
		color(){
			return this.form.color
		},

	},
	watch:{
		color(val){
			if(val=='blue'){
				this.license[7]= ''
			}else{
				this.getLicense(7)
			}
		}
	},
	methods:{
		getLicense(index){
			// console.log('index', index)
			this.clickOn= index
			switch (index){
				case 0:{
					this.$refs.keyboard.open(this.plateArea)
					break
				}
				case 1:{
					this.$refs.keyboard.open(this.plateType)
					break
				}
				case 7:{
					this.form.color= 'green'
				}
				default :{
					this.$refs.keyboard.open(this.plateNum)
				}
			}
		},
		keyboardOk(val){
			this.license[this.clickOn]= val
			if(this.clickOn<6 || (this.clickOn<7 && this.form.color== 'green'))
				this.getLicense(this.clickOn+1)
			else
				this.$refs.keyboard.close()
		},
		keyboardDel(){
			this.license[this.clickOn]= ''
			if(this.clickOn){
				this.clickOn--
			}this.getLicense(this.clickOn)
		},
		keyboardClose(){
			let pass= true
			this.clickOn=null
			if(!this.license[7]) this.form.color= 'blue'
			for(let i=0; i<6; i++){
				if(!this.license[i]){
					pass= false
				}
			}
			if(pass){
				this.form.license= this.license.join('')
			}
		},
		submit(){
			this.axiosHxx.post('/carlive/etc/saveetcmsg', this.form,{ baseURL: '/hxx-gateway-proxy/'}).then(res => {
				if(res.data.success){
					window.location.href='https://mobile.abchina.com/MBRCard/netBank/webank/applyCard.aspx?id=&q=direct5130&cardcode=CCPY5I'
				}
			})
		}
	}
}
</script>

<style scoped lang="less">
.etc{
	overflow: hidden;
	.above{
		padding: 15px 0 0 15px;
		h2{
			color: #333333;
			font-size: 16px;
			font-weight: 400;
			padding-left: 10px;
			border-left: 2px solid #31C8B6;
			line-height: 20px;
			margin-bottom: 10px;
		}
		.common-form{
			padding: 0;
			margin-bottom: 20px;
		}
		.rule{
			color: #999999;
			font-size: 12px;
			margin-top: 10px;
			margin-bottom: 20px;
		}
		.license{
			white-space: nowrap;
			li{
				display: inline-block;
				width: 32px;
				height: 42px;
				border: 1px solid #8C9094;
				border-radius: 5px;
				vertical-align: top;
				margin-right: 4px;
				line-height: 40px;
				text-align: center;
				font-size: 18px;
				color: black;
				&:not(.on).new-energy{
					margin: 0;
					border: 1px dashed #8C9094;
					position: relative;
					line-height: 20px;
					color: #8C9094;
					&:before{
						content: '+';
						font-size: 16px;
						line-height: 22px;
						display: block;
						text-align: center;
					}
					&:after{
						content: '新能源';
						font-size: 12px;
						display: block;
						transform: translateX(50%) scale(.7);
						transform-origin: left;
						white-space: nowrap;
						position: absolute;
						left: -50%;
						bottom: 3px;
					}
				}
				&.on{
					border-color: #31C8B6;
					color: #31C8B6;
				}
			}
			i{
				transform: scale(.7);
				font-size: 12px;
				line-height: 42px;
				margin-right: 4px;
			}
		}
		.plate{
			li{
				line-height: 34px;
				padding: 0 25px;
				font-size: 14px;
				color: white;
				border-radius: 4px;
				font-family: 'Material-Design-Iconic-Font';
				position: relative;
				display: inline-block;
				margin-right: 10px;
				&.blue{
					background-color: #2C82D7;
					border: 1px solid #0B62C0;
				}
				&.green{
					color: #333333;
					background:linear-gradient(180deg,rgba(242,255,240,1) 3%,rgba(97,227,19,1) 98%);
					border: 1px solid #33B21B;
				}
				&.gray{
					color: #999999;
					background-color: #EEEEEE;
					border: 1px solid #C3C3C3;
				}
				&.on:before {
					line-height: 16px;
					width: 16px;
					height: 16px;
					text-align: center;
					display: block;
					/*content: '\F269';*/
					content: '\F26B';
					font-size: 14px;
					color: white;
					position: absolute;
					right: -5px;
					bottom: -5px;
					background-color: #31C8B6;
					border-radius: 100%;
				}
			}
		}
	}
	.msg{
		text-align: center;
		margin-bottom: 20px;
		p{
			color: #D0021B;
			font-size: 12px;
			margin-bottom: 20px;
		}
		img{
			width: 80%;
		}
	}
	.next{
		font-size: 18px;
		color: white;
		line-height: 40px;
		display: block;
		width: 80%;
		margin: 10px auto;
		background:rgba(49,200,182,1);
		box-shadow:0px 4px 4px 0px rgba(192,249,242,1);
		border-radius:5px;
		text-align: center;
	}
	.alert{
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		.mask{
			width: 100%;
			height: 100%;
			background-color: #333333;
			opacity: .5;
		}
		.info{
			width: 90%;
			min-width: 300px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: white;
			border-radius: 5px;
			color: #333333;
			text-align: center;
			h2{
				font-size: 16px;
				margin: 15px 0;
			}
			p{
				font-size: 14px;
				margin-bottom: 20px;
				.bl{
					color: #2C82D7;
				}
				.gr{
					color: #31C8B6;
				}
			}
			a{
				font-size: 14px;
				line-height: 40px;
				color: #31C8B6;
				display: block;
				border-top: 1px solid #DCDEE3;
			}
		}
	}
}
</style>
