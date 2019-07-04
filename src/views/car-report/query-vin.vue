<template>
<div class="query-vin">
	<div class="row">
		<label>车架号</label>
		<input ref="input" v-model="upperCaseVin" placeholder="请输入车架号" maxlength="17"/>
		<i class="fa fa-camera" @click="showCamera= true"></i>
		<!--<div class="look" @click="query(vin)">查看</div>-->
		<submit-button class="look" @click="query(vin)" :datas="{vin}" :rules="rule" :feedback="true">查看</submit-button>
	</div>
	<div class="row">
		<label>我的爱车</label>
		<div class="look on" @click="lookMyCar">查看</div>
	</div>

	<router-link tag="div" class="button" to="/my/car-report">我的报告</router-link>

	<upload mode="camera" @done="getVin" ref="upload" operate="base64"></upload>

	<mt-actionsheet
			:actions="actions"
			v-model="showCamera">
	</mt-actionsheet>

	<mt-popup
			v-model="showCarList"
			position="right"
			popup-transition="popup-fade">
		<car-list ref="carlist" style="width: 90vw" @select="getCar" :show-button="false"></car-list>
	</mt-popup>
</div>
</template>

<script>
import { getWeixinId, reg} from '@/util.js'
import Upload from '@/components/compress-upload.vue'
import CarList from '@/views/car-record/car-list.vue'
import SubmitButton from '@/components/submit-button.vue'
export default {
	name: "query-vin",
	components: { Upload, CarList, SubmitButton},
	data(){
		return{
			vin: '',
			showCamera: false,
			showCarList: false,
			resolve: null,
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
		}
	},
	methods:{
		getCar(item){
			this.vin= item.vin
			this.showCarList= false
			this.query(item.vin)
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
		lookMyCar(){
			let length= this.$refs.carlist.list.length
			// console.log('this.$refs.carlist.list.length', length)
			switch (length){
				case 0:{
					this.$messagebox({message: '请先绑定个人爱车', closeOnClickModal: false,
						confirmButtonText: '去绑定', cancelButtonText: '取消', showCancelButton: true}).then(action => {
						// console.log('action', action)
						switch (action){
							case 'confirm':{
								this.$router.push({path: '/bind-car'})
								break
							}
							case 'cancel':{
							}
						}
					})
					break
				}
				case 1:{
					this.query(this.$refs.carlist.list[0].vin)
					break
				}
				default :{
					this.showCarList= true
				}
			}
		}
	}

}
</script>

<style scoped lang="less">
.query-vin{
	.row{
		height: 70px;
		line-height: 60px;
		border-bottom: 10px solid #F3F3F3;
		padding: 0 15px;
		font-size: 14px;
		position: relative;
		label{
			display: inline-block;
			min-width: 55px;
			color: #333333;
		}
		input{
			width: 55%;
			line-height: 22px;
		}
		i{
			color: #666666;
			font-size: 20px;
			position: absolute;
			top: 50%;
			right: 80px;
			transform: translateY(-50%);
		}
		.look{
			display: inline-block;
			height: 24px;
			line-height: 24px;
			padding: 0 15px;
			/*background-color: #FFCB9C;*/
			background-color: #FF9738;
			color: white;
			border-radius: 18px;
			position: absolute;
			top: 50%;
			right: 15px;
			transform: translateY(-50%);
			&.on{
				background-color: #FF9738;
			}
		}
	}
	.button{
		text-align: center;
		width:150px;
		line-height: 34px;
		height:36px;
		border-radius:20px;
		border:1px solid #D6D6D6;
		color: #4A4A4A;
		font-size: 14px;
		margin: 70px auto 0;
	}
}
</style>
