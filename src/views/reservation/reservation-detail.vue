<template>
<div class="reservation-detail">
	<Form :class="['common-form']" :model="info"
	      :label-width="80" label-position="left" ref="form">
		<!--<FormItem label="门店名称">-->
		<!--<span class="line">{{TENANT_NAME}}</span>-->
		<!--</FormItem>-->
		<FormItem label="服务门店">
			<span class="text">{{info.TENANT_NAME}}</span>
		</FormItem>
		<FormItem label="门店地址">
			<span class="select" @click="sheetVisible= true">{{info.TENANT_ADD}}</span>
		</FormItem>
		<FormItem label="门店电话">
			<span class="text">{{info.LINK_TEL ||'暂无'}}</span>
			<a class="tel" v-show="info.LINK_TEL" :href="'tel:'+ info.LINK_TEL">
				<i class="fa fa-phone"></i>
			</a>
		</FormItem>
		<FormItem label="预约时间">
			<span class="text">{{`${info.ORDER_DATE} ${info.ORDER_TIME}`}}</span>
		</FormItem>
		<FormItem label="预约类型">
			<span class="text">{{unit[info.REPAIR_TYPE]}}</span>
		</FormItem>
		<FormItem label="车牌号">
			<span class="text">{{info.PLATE_NUM}}</span>
		</FormItem>
		<FormItem label="预约单号">
			<span class="text">{{info.ORDER_NO}}</span>
		</FormItem>
		<FormItem label="状态">
			<span class="text">{{unit[info.STATUS]}}</span>
		</FormItem>

		<FormItem label="使用机油" v-show="oil.name">
			<span class="text">{{oil.name}}</span>
		</FormItem>
		<FormItem label="机油用量" v-show="oil.total">
			<span class="text">{{oil.total}}升</span>
		</FormItem>
		<div v-show="oil.total_fee">
			<p style="color: red;" v-show="oil.total_fee">使用量超过5升，需额外购买{{oil.number}}升，需支付{{oil.total_fee}}元</p>
			<a class="topay" @click="pay">立即支付</a>
		</div>
	</Form>


	<div v-show="info.STATUS!='10201007'" class="common-submit" @click="cancel"><a class="on">取消预约</a></div>

	<mt-actionsheet
			:actions="actions"
			v-model="sheetVisible">
	</mt-actionsheet>
</div>
</template>

<script>
import { wxPay} from '@/util'
export default {
	name: "reservation-detail",
	data(){
		return{
			point: {},
			sheetVisible: false,
			oil: {}
		}
	},
	computed:{
		info(){
			return this.$route.query
		},
		unit(){
			return this.$store.state.user.unit
		},
		actions(){
			let name= this.info.TENANT_NAME
			let address= this.info.TENANT_ADD
			return  [{
				name: '高德地图',
				method:()=>{

					window.location.href = `http://uri.amap.com/marker?position=${this.point.lon},${this.point.lat}&name=${name}&src=好修修车生活&coordinate=wgs84&callnative=1`
				}
			}, {
				name: '百度地图',
				method:()=>{
					window.location.href = `http://api.map.baidu.com/marker?location=${this.point.lat},${this.point.lon}&title=${name}&content=${address}&output=html&src=webapp.baidu.openAPIdemo`
				}
			}]
		},
	},
	mounted(){
		// console.log(this.$route.query)
		this.getPoint()
		this.gitOil()
	},
	methods:{
		cancel(){
			this.$messagebox.confirm('确定取消预约?').then(action => {
				// console.log('action', action)
				this.axiosHxx.post('/operate/appoint/cancel', {
					orderId: this.info.ORDER_ID,
					status: '10201007',
				}).then(res => {
					if(res.data.success){
						//下一步操作
						this.$toast('已取消')
						this.$router.go(-1)
					}
				})
			});
		},
		getPoint(){
			// this.axiosQixiu({
			// 	method: 'get',
			// 	baseURL: '/repair-proxy',
			// 	url: '/micro/search/shop/repair/'+ this.info.ROAD_LICENSE,
			// }).then(res => {
			// 	this.point= res.data.point
			// })

			this.axiosQixiu.get('/micro/search/shop?fl=sid,type,name,addr,lon,lat&fq=licenseNo:'+ this.info.ROAD_LICENSE,{
				baseURL: '/repair-proxy',
			}).then( (res) => {
				this.point= res.data.content[0]
			})
		},
		gitOil(){
			if(this.info.STATUS== '10421001' && this.info.TID){
				this.axiosHxx.post('/operate/appoint/getOil', {
					tid: this.info.TID
				}).then(res => {
					if(res.data.success){
						this.oil= res.data.data
					}
				})
			}
		},
		pay(){
			this.axiosHxx.post('/operate/appoint/payOrder', {
				orderNo: this.info.ORDER_NO,
				deviceType: 2
			}).then(res => {
				if(res.data.success){
					let data= res.data.data
					wxPay(data, (res2)=>{
						if(res2=='ok'){
							this.$toast('支付成功')
						}
						this.$router.replace('/my-reservation')
					})
				}
			})
		},
	}
}
</script>

<style scoped lang="less">
.reservation-detail{
	.common-form{
		.tel{
			position: absolute;
			top: 50%;
			right: 15px;
			transform: translateY(-50%);
			display: inline-block;
			width: auto;
			margin: 0;
			font-size: 22px;
		}
	}
	.topay{
		display: inline-block;
		background-color: #FF7324 ;
		padding: 5px 10px;
		border-radius: 5px;
		color: white;
		float: right;
		margin-right: 10px;
	}
}
</style>
