<template>
<div class="query-vin">
	<ul class="tab">
		<li :class="{on: active=='vin'}" @click="active='vin'"><span>按车架号查询</span></li>
		<li :class="{on: active=='car'}" @click="active='car'"><span>按我的爱车查询</span></li>
	</ul>

	<div class="block vin" v-show="active=='vin'">
		<Form class="common-form vin-form" :label-width="50" label-position="left" ref="form">
			<FormItem label="车架号">
				<Input v-model.trim="upperCaseVin" placeholder="请输入车架号或拍照识别" :maxlength="17"></Input>
				<i class="fa fa-camera" @click="showCamera= true"></i>
			</FormItem>
		</Form>
		<submit-button class="look" @click="query(vin)" :datas="{vin}" :rules="rule" :feedback="true">查看</submit-button>

		<h5 v-show="showReport">已付费报告</h5>
		<ul class="report-list" v-show="showReport">
			<Form class="common-form" :label-width="60" label-position="left"
			      v-for="(item, key) in reportList" :key="key">
				<FormItem label="车架号">
					<Input :value="item.vin" readonly></Input>
				</FormItem>
				<FormItem label="查询时间">
					<Input :value="item.createTime" readonly></Input>
				</FormItem>
				<FormItem label="支付金额">
					<Input :value="item.amount" readonly></Input>
				</FormItem>
				<FormItem label="报告版本" class="noborder">
					<Input :value="item.type" readonly></Input>
					<router-link :to="`/report/report?id=${item.id}&from=my`" class="detail">查看详情</router-link>
				</FormItem>
			</Form>
		</ul>
		<router-link tag="div" class="button" to="/my/car-report" v-show="showReport">查看更多>></router-link>
	</div>

	<div class="block car" v-show="active=='car'">
		<div class="no-car" v-show="!showCar">
			<img src="~@/assets/img/report/no-report.png"/>
			<p>暂无爱车信息，<router-link to="/bind-car?back=true">赶紧去添加爱车吧>></router-link></p>
		</div>
		<ul class="car-list" v-show="showCar">
			<li v-for="(item, key) in carList" :key="key">
				<p><label>车牌号：</label>{{item.vehiclePlateNumber}}</p>
				<p><label>车架号：</label>{{item.vin}}</p>
				<a @click="query(item.vin)">查看</a>
			</li>
		</ul>
	</div>

	<upload mode="camera" @done="getVin" ref="upload" operate="base64"></upload>
	<mt-actionsheet
			:actions="actions"
			v-model="showCamera">
	</mt-actionsheet>
</div>
</template>

<script>
import { getWeixinId, reg} from '@/util.js'
import Upload from '@/components/compress-upload.vue'
import SubmitButton from '@/components/submit-button.vue'
export default {
	name: "query-vin",
	components: { Upload, SubmitButton},
	data(){
		return{
			active: 'vin',
			vin: '',
			showCamera: false,
			resolve: null,
			reportList: [],
			carList: [],
		}
	},
	computed:{
		actions() {
			let self= this
			return [
				{
					name: '拍行驶证',
					method(){
						self.getCamera().then((base64)=>{
							self.toOcr(1, base64)
						})
					}
				},{
				name: '拍车架号',
				method(){
					self.getCamera().then((base64)=>{
						self.toOcr(0, base64)
					})
				}
			}]
		},
		upperCaseVin: {
			get(){
				return this.vin;
			},
			set(val){
				this.vin = val.toUpperCase();
			}
		},
		rule(){
			return {
				vin: { validator: (rule, value, callback) => {
					if(reg.vin.test(value)){
						callback()
					}else{
						callback(new Error('车架号格式不正确'))
					}
				}}
			}
		},
		showReport(){
			return this.reportList.length> 0
		},
		showCar(){
			return this.carList.length> 0
		}
	},
	mounted(){
		this.getReport()
		this.getCarList()
	},
	methods:{
		getReport(){
			this.axiosQixiu.post('/hxxdc/order/list', {
				pageNo: 1,
				pageSize: 2,
			},{hxxtoken: true}).then( (res) => {
				if(res.data.items&&res.data.items.length){
					this.reportList= res.data.items
				}
			})
		},
		getCarList(){
			this.axiosQixiu.post('/hxxdc/vehicle/bind/list', {
				pageNo: 1,
				pageSize: 10000,
			},{hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					if(res.data.items&&res.data.items.length){
						this.carList= res.data.items
					}
				}
			})
		},
		getCamera(){
			return new Promise((resolve, reject) => {
				this.resolve= resolve
				this.$refs.upload.clickBox()
			});
		},
		getVin({base64}){
			if(this.resolve){
				this.resolve(base64)
				this.resolve= null
			}
		},
		toOcr(type, base64){
			this.axiosQixiu.post('/hxxdc/travel/license/ocr/vin', {
				type, base64: base64.split('base64,')[1]
			}, {hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					this.vin= res.data.item.vin
				}
			})
		},
		query(vin){
			if(vin){
				this.axiosQixiu.get('/hxxdc/order/state/' +vin, {hxxtoken: true}).then( (res) => {
					if(res.data.code=='0' ){
						switch (res.data.item.action){
							case 'NO_ACTION':{
								this.$toast('此车辆暂无报告')
								break
							}
							case 'WAIT_BUY':
							case 'WAIT_PAY':{
								this.$router.push('/report/pay?vin='+vin)
								break
							}
							case 'NO_OPEN_ID':{
								this.$messagebox({message: '需要授权微信信息', closeOnClickModal: false,
									confirmButtonText: '授权', cancelButtonText: '取消', showCancelButton: true}).then(action => {
									// console.log('action', action)
									switch (action){
										case 'confirm':{
											getWeixinId()
											break
										}
										case 'cancel':{
										}
									}
								})
								break
							}
						}
					}
				})
			}else{
				this.$toast('请输入或拍摄车架号')
			}

		},
	}

}
</script>

<style scoped lang="less">
.query-vin{
	height: 100vh;
	overflow: auto;
	.tab{
		overflow: hidden;
		border-bottom: 5px #F7F7F7 solid;
		text-align: center;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: white;
		li{
			width: 150px;
			display: inline-block;
			text-align: center;
			font-size: 16px;
			color: #333333;
			span{
				display: inline-block;
				margin: 0 auto;
				line-height: 38px;
				border-bottom: 2px solid transparent;
			}
		}
		li.on span{
			color: #FF6D0E;
			border-bottom: 2px solid  #FF6D0E;
		}
	}
	.block{
		padding-top: 45px;
		min-height: 100%;
		position: relative;
		overflow: hidden;
	}
	.vin.block{
		.vin-form{
			.fa-camera{
				/*color: #666666;*/
				width: auto;
				margin: 0;
				font-size: 20px;
				position: absolute;
				top: 50%;
				right: 20px;
				transform: translateY(-50%);
			}
		}
		.look{
			display: block;
			line-height: 40px;
			text-align: center;
			width: 80%;
			margin: 20px auto;
			background-color: #FFCB9C;
			color: white;
			font-size: 16px;
			border-radius: 20px;
			&.on{
				background-color: #FF9738;
			}
		}
		h5{
			line-height: 30px;
			padding: 0 15px;
			font-size: 12px;
			font-weight: 400;
			background-color: #F3F3F3;
		}
		.report-list{
			.common-form{
				border-bottom: 5px solid #F3F3F3;
				.detail{
					font-size: 12px;
					width:80px;
					line-height: 24px;
					text-align: center;
					border: 1px solid #FF9738;
					color: #FF9738;
					border-radius: 12px;
					position: absolute;
					right: 15px;
					top: 50%;
					transform: translateY(-50%);
					margin: 0;
				}
			}
		}
		.button{
			width: 100px;
			margin: 10px auto;
			text-align: center;
			color: #FF9738;
			font-size: 14px;
		}
	}
	.car.block{
		.no-car{
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			img{
				width: 50px;
				margin-bottom: 40px;
			}
			p{
				color: #999999;
				white-space: nowrap;
				a{
					color: #FF9738;
				}
			}
		}
		.car-list{
			padding-left: 15px;
			li{
				border-bottom: 1px solid #F3F3F3;
				padding: 10px 0;
				position: relative;
				p{
					color: #333333;
					line-height: 24px;
					label{
						color: #999999;
					}
				}
				a{
					line-height: 22px;
					padding: 0 15px;
					display: inline-block;
					border: 1px solid #FF9738;
					color: #FF9738;
					font-size: 12px;
					border-radius: 18px;
					position: absolute;
					right: 20px;
					bottom: 10px;
				}
			}
		}
	}
}
/*.query-vin{*/
	/*.row{*/
		/*height: 70px;*/
		/*line-height: 60px;*/
		/*border-bottom: 10px solid #F3F3F3;*/
		/*padding: 0 15px;*/
		/*font-size: 14px;*/
		/*position: relative;*/
		/*label{*/
			/*display: inline-block;*/
			/*min-width: 55px;*/
			/*color: #333333;*/
		/*}*/
		/*input{*/
			/*width: 55%;*/
			/*line-height: 22px;*/
		/*}*/
		/*i{*/
			/*color: #666666;*/
			/*font-size: 20px;*/
			/*position: absolute;*/
			/*top: 50%;*/
			/*right: 80px;*/
			/*transform: translateY(-50%);*/
		/*}*/
		/*.look{*/
			/*display: inline-block;*/
			/*height: 24px;*/
			/*line-height: 24px;*/
			/*padding: 0 15px;*/
			/*!*background-color: #FFCB9C;*!*/
			/*background-color: #FF9738;*/
			/*color: white;*/
			/*border-radius: 18px;*/
			/*position: absolute;*/
			/*top: 50%;*/
			/*right: 15px;*/
			/*transform: translateY(-50%);*/
			/*&.on{*/
				/*background-color: #FF9738;*/
			/*}*/
		/*}*/
	/*}*/
	/*.button{*/
		/*text-align: center;*/
		/*width:150px;*/
		/*line-height: 34px;*/
		/*height:36px;*/
		/*border-radius:20px;*/
		/*border:1px solid #D6D6D6;*/
		/*color: #4A4A4A;*/
		/*font-size: 14px;*/
		/*margin: 70px auto 0;*/
	/*}*/
/*}*/
</style>
