<template>
<div class="accredit">
	<div class="description">
		<span>提示：</span>授权使用您在汽修平台的信息
	</div>
	<Form :model="form" class="common-form"
	      :label-width="100" label-position="left" ref="form">
		<FormItem label="选择汽修平台" prop="area_code">
			<select-radio class="ivu-input select" v-model="form.area_code" :options="areaList"></select-radio>
		</FormItem>
		<FormItem label="汽修平台账号" prop="telphone">
			<Input v-model="form.telphone" :maxlength="11" placeholder="请输入汽修平台账号"></Input>
		</FormItem>
		<FormItem label="验证码" prop="telcode">
			<Input v-model="form.telcode" :maxlength="10" placeholder="请输入验证码"></Input>
			<countdown class="get-code" @click="form.telSession= $event"
			           url="/operate/controller/getCarliveCode" :phone="form.telphone"></countdown>
		</FormItem>
	</Form>
	<div :class="['submit',{on: activity}]" @click="bind">同意授权</div>

	<!--<div class="qr" v-show="showQR">-->
		<!--<p>请识别下方二维码，关注并注册上海汽修平台</p>-->
		<!--<img src="/img/shanghai-qrcode.jpg"/>-->
	<!--</div>-->
</div>
</template>

<script>
import Countdown from '@/components/countdown-button.vue'
import SelectRadio from '@/components/select-radio.vue'
import { reg} from '@/util.js'
export default {
	name: "accredit",
	components: {Countdown ,SelectRadio },
	data(){
		return{
			form: {
				area_code: '',
				telphone: '',
				telcode: '',
				telSession: '',
			},
			areaList: [
				{label: '上海汽修平台', value: '310'},
				{label: '山东汽修平台', value: '370'},
			],
			showQR: false
		}
	},
	computed:{
		activity(){
			let status= false
			if(reg.mobile.test(this.form.telphone) && this.form.telcode){
				status= true
			}
			return status
		}
	},
	mounted(){
		this.form.telphone= this.$store.state.user.userinfo.telphone
	},
	methods:{
		bind() {
			if (this.activity) {
				this.axiosHxx.post('/operate/qixiuwang/bind', this.form).then(res => {
					this.bindSuccess(res.data)
				})
			}
		},
		bindSuccess(data){
			if(data.success){
				switch( this.form.area_code){
					case '310':{
						this.$store.commit('setQixiuToken', data.data.qxToken);
						break
					}
					case '370':{
						this.$store.commit('setQixiuToken', data.data.qxToken);
						break
					}
				}

				this.$toast('绑定成功');
				this.goBackUrl()
			}else{
				this.showQR= true
			}
		},
		goBackUrl(){
			if(this.$route.query.redirect){
				this.$router.replace({
					path: this.$route.query.redirect
				})
			}else{
				this.$router.go(-1)
			}
		},
	}
}
</script>

<style scoped lang="less">
.accredit{
	.description{
		width:100%;
		line-height:40px;
		background:#F3F3F3;
		padding-left:15px;
		font-size: 14px;
		span{
			color:#FE8636;
		}
	}
	.common-form{
		.get-code{
			color: #333333;
			position: absolute;
			right: 10px;
			top: 50%;
			transform: translateY(-50%);
			width: auto;
			margin-top: 0;
			&.off{
				color: #999999;
			}
		}
	}
	.submit{
		margin: 60px 20px 0;
		height:40px;
		line-height: 40px;
		background-color: #FFCB9C;
		border-radius:20px;
		font-size: 16px;
		color: white;
		text-align: center;
		&.on{
			background-color: #FF9738;
		}
	}
	.qr{
		margin-top: 25px;
		padding: 0 20px;
		text-align: center;
		color: #515a6e;
		img{
			width: 100%;
		}
	}
}
</style>
