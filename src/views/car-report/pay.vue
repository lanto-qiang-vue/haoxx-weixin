<template>
<div class="report-pay">
	<div class="block">
		<Form class="common-form"
		      :label-width="60" label-position="left" ref="form">
			<FormItem label="车架号">
				<Input v-model="vin" readonly></Input>
			</FormItem>
			<FormItem label="版本号" class="noborder">
				<ul class="radio">
					<li v-for="(item, key) in list" :key="key">
						<p @click="clickRadio(item)" :class="{disabled: item.disabled}"><span class="mint-radio">
							<input type="radio" class="mint-radio-input" :value="item.id"
							       :checked="radio.id==item.id">
							<span class="mint-radio-core"></span>
						</span>{{`${item.name} ${item.price}元`}}</p>
						<router-link :to="{path: '/report/report',query:{ id:'1', detailVersion: item.detailVersion}}"
						             tag="span" >查看样例</router-link>
					</li>
					<!--<li>-->
						<!--<p @click="radio='10'"><span class="mint-radio">-->
							<!--<input type="radio" class="mint-radio-input" value="10" :checked="radio=='10'">-->
							<!--<span class="mint-radio-core"></span>-->
						<!--</span>详细版 10.00元</p>-->
						<!--<span>查看样例</span>-->
					<!--</li>-->
				</ul>
			</FormItem>
		</Form>
	</div>
	<div class="block">
		<Form class="common-form" v-show="radio.price"
		      :label-width="60" label-position="left" ref="form">
			<FormItem label="优惠券">
				<span class="ivu-input select" @click="openCoupons">{{showCouponName || '请选择'}}</span>
			</FormItem>
			<FormItem label="支付金额">
				<Input :value="`¥ ${showPrice}`" readonly class="money"></Input>
			</FormItem>
		</Form>
	</div>
	<single-checkbox v-model="agree" class="agree">
		<span>同意<router-link to="/article-detail?infoId=hxx-report-protocol">《好修修车史协议》</router-link></span>
	</single-checkbox>
	<!--<div class="pay" @click="create">去支付</div>-->
	<submit-button class="pay" :rules="rule" :datas="{id: radio.id, agree}" :feedback="true" @click="create">去支付</submit-button>

	<coupons-use ref="coupons" @ok="coupon= $event"></coupons-use>
</div>
</template>

<script>
import { getwxticket} from '@/util.js'
import SubmitButton from '@/components/submit-button.vue'
import SingleCheckbox from '@/components/single-checkbox.vue'
import CouponsUse from '@/views/coupons/coupons-use.vue'
export default {
	name: "report-pay",
	components: { SubmitButton, SingleCheckbox, CouponsUse},
	data(){
		return{
			vin: '',
			radio: {},
			list: [],
			detailVersion: false,
			rule: {
				id: { required: true, message:'请选择版本号'},
				agree: { validator: (rule, value, callback) => {
						if (value) {
							return callback();
						}else{
							return callback(new Error('请同意《好修修车史协议》'));
						}
					}
				},
			},
			orderId: '',
			agree: true,
			coupon: {}
		}
	},
	computed:{
		showCouponName(){
			// let item= this.coupon
			// let num= parseFloat(item.discount|| 0), text=''
			// if(num>0 && num<1){
			// 	text= num*10 + '折'
			// }else if(num>=1){
			// 	text= num + '元'
			// }
			// return item.name? item.name + text : ''
			return this.coupon.name
		},
		showPrice(){
			// let oldP= parseFloat(this.radio.price||0) , minus= parseFloat(this.coupon.amount||0) , newP=0;
			// if(minus){
			// 	let val= oldP - minus
			// 	newP= val>=0? val: 0
			// }else{
			// 	newP= oldP
			// }
			// return newP.toFixed(2)

			return this.coupon.amount|| this.radio.price
		}
	},
	mounted(){
		this.vin= this.$route.query.vin
		let detailVersion= this.$route.query.detailVersion
		if(detailVersion){
			this.detailVersion= JSON.parse(detailVersion)
		}
		this.getList()

		// getwxticket(['chooseWXPay'])
	},
	methods:{
		getList(){
			this.axiosQixiu.get('/hxxdc/product/list?vin='+ this.vin, {hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					let list= res.data.items
					if(list && list.length){
						if(this.detailVersion){
							for(let i in list){
								if(list[i].detailVersion){
									// this.radio= list[i]
								}else{
									list[i].disabled= true
								}
								this.list.push(list[i])
							}
						}else{
							// this.radio= list[0]
							this.list= res.data.items
						}
					}
				}
			})
		},
		clickRadio(item){
			if(!item.disabled) this.radio= item
		},
		create(){
			this.axiosQixiu.post('/hxxdc/order/create',{
				productId: this.radio.id,
				promotionId: this.coupon.id|| null,
				vin: this.vin
			}, {hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					let orderId= res.data.item.id
					this.orderId= orderId
					if(res.data.item.action== 'VIEW_REPORT'){
						this.$router.push('/report/report?id='+ orderId)
					}else{
						this.pay(orderId)
					}

				}
			})
		},
		pay(id){
			this.axiosQixiu.get('/hxxdc/order/pay/parameter/'+id, {hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					let data= res.data.item.data
					this.callon(data)
				}
			})
		},
		callon(data){
			// wx.chooseWXPay({
			// 	timestamp: data.timestamp,
			// 	nonceStr: data.noncestr,
			// 	package: 'prepay_id='+ data.prepayid,
			// 	signType: "MD5",
			// 	paySign: data.sign,
			// 	success: function (res) {
			// 		alert(JSON.stringify(res))
			// 	},
			// 	fail(err){
			// 		alert(JSON.stringify(err))
			// 	},
			// 	cancel: function (res) {
			// 		alert(JSON.stringify(res))
			// 	}
			// });
			let orderId= this.orderId
			let self= this

			function onBridgeReady(){
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": data.appId,
						"timeStamp": data.timeStamp,
						"nonceStr": data.nonceStr,
						"package": data.package,
						"signType": data.signType,
						"paySign": data.sign,
					},
					function(res){
						// alert(JSON.stringify(res))
						switch (res.err_msg){
							case 'get_brand_wcpay_request:ok':{
								// alert('支付成功')
								self.$toast('购买成功')
								self.$router.push('/report/report?id='+ orderId)
								break
							}
							case 'get_brand_wcpay_request:cancel':
							case 'get_brand_wcpay_request:fail':{
								self.axiosQixiu.delete('/hxxdc/order/'+orderId, {hxxtoken: true}).then( (dres) => {
									console.log(dres.data)
								})
								break
							}
						}
						// if(res.err_msg == "get_brand_wcpay_request:ok" ){
						// 	// 使用以上方式判断前端返回,微信团队郑重提示：
						// 	//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						// }
					});
			}
			if (typeof WeixinJSBridge == "undefined"){
				if( document.addEventListener ){
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				}else if (document.attachEvent){
					document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				}
			}else{
				onBridgeReady();
			}
		},
		openCoupons(){
			this.$refs.coupons.open(this.radio.id)
		}
	}
}
</script>

<style scoped lang="less">
.report-pay{
.block{
	border-top: 10px solid #F3F3F3;
	.radio{
		margin: 0;
		li{
			line-height: 40px;
			padding-left: 10px;
			border-bottom: 1px solid #EEEEEE;
			position: relative;
			&:last-child{
				border: 0;
			}
			p{
				display: inline-block;
				line-height: 20px;
				color: #333333;
				padding-right: 55px;
				max-width: 100%;
				word-break: break-all;
				vertical-align: middle;
				margin: 5px 0;
				padding-left: 30px;
				position: relative;
				>span{
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			>span{
				font-size: 12px;
				color: #666666;
				float: right;
				line-height: 30px;
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
			}
			.disabled .mint-radio .mint-radio-core{
				background-color: #ececec;
			}
		}
	}
}
	.pay{
		height: 40px;
		line-height: 40px;
		margin: 10px 40px 0;
		background-color: #FFCB9C;
		border-radius:20px;
		font-size: 16px;
		color: white;
		text-align: center;
		display: block;
		&.on{
			background-color: #FF9738;
		}
	}
	.agree{
		margin-top: 20px;
	}
}
</style>
<style lang="less">
.report-pay{
	.money input{
		color: #FE8636;
	}
}

</style>
