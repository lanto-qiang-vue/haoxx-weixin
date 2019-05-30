<template>
<div class="query-vin">
	<div class="row">
		<label>车架号</label>
		<input ref="input" v-model="vin" placeholder="请输入车架号"/>
		<i class="fa fa-camera" @click="showCamera= true"></i>
		<div class="look" @click="query">查看</div>
	</div>
	<div class="row">
		<label>我的爱车</label>
		<div class="look" @click="showCarList= true">查看</div>
	</div>

	<router-link tag="div" class="button" to="/my/car-history">我的报告</router-link>

	<upload mode="camera" @done="getVin" ref="upload" operate="base64"></upload>

	<mt-actionsheet
			:actions="actions"
			v-model="showCamera">
	</mt-actionsheet>

	<mt-popup
			v-model="showCarList"
			position="right"
			popup-transition="popup-fade">
		<car-list style="width: 90vw" @select="getCar" :show-button="false"></car-list>
	</mt-popup>
</div>
</template>

<script>

import Upload from '@/components/compress-upload.vue'
import CarList from '@/views/car-record/car-list.vue'
export default {
	name: "query-vin",
	components: { Upload, CarList},
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
		}
	},
	methods:{
		getCar(item){
			this.vin= item.vin
			this.showCarList= false
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
		query(){
			let vin= this.vin
			if(vin){
				this.axiosQixiu.post('/hxxdc/order/state/' +vin, {hxxtoken: true}).then( (res) => {
					if(res.data.code=='0' ){
						// if(res.data.item){
						// 	this.$router.push('/report/pay?vin='+vin)
						// }else{
						// 	this.$toast('此车辆无报告')
						// }
					}
				})
			}else{
				this.$toast('请输入或拍摄车架号')
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
		}
		i{
			color: #CACACA;
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
			background-color: #FF9738;
			color: white;
			border-radius: 18px;
			position: absolute;
			top: 50%;
			right: 15px;
			transform: translateY(-50%);
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
