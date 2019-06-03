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
						<p @click="radio= item"><span class="mint-radio">
							<input type="radio" class="mint-radio-input" :value="item.code"
							       :checked="radio.code==item.code">
							<span class="mint-radio-core"></span>
						</span>{{`${item.name} ${item.price}元`}}</p>
						<router-link :to="{path: '/report/report',
						query:{detailVersion: item.detailVersion, id:'1'}}"
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
		<Form class="common-form"
		      :label-width="60" label-position="left" ref="form">
			<FormItem label="支付金额">
				<Input :value="`¥ ${radio.price}`" readonly class="money"></Input>
			</FormItem>
		</Form>
	</div>
	<div class="pay" @click="create">去支付</div>
</div>
</template>

<script>
import { getwxticket} from '@/util.js'
export default {
	name: "report-pay",
	data(){
		return{
			vin: '',
			radio: {},
			list: []
		}
	},
	mounted(){
		this.vin= this.$route.query.vin
		this.getList()

		getwxticket(['chooseWXPay'])
	},
	methods:{
		getList(){
			this.axiosQixiu.get('/hxxdc/product/list', {hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					let list= res.data.items
					if(list && list.length){
						this.radio= list[0]
						this.list= res.data.items
					}
				}
			})
		},
		create(){
			this.axiosQixiu.post('/hxxdc/order/create',{
				type: this.radio.code,
				vin: this.vin
			}, {hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					this.pay(res.data.id)
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

			function onBridgeReady(){
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": data.appid,
						"timeStamp": data.timestamp,
						"nonceStr": data.noncestr,
						"package": data.package,
						"signType":"MD5",
						"paySign": data.sign,
					},
					function(res){
						alert(JSON.stringify(res))
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
			height: 40px;
			padding-left: 10px;
			&:first-child{
				height: 41px;
				border-bottom: 1px solid #EEEEEE;
			}
			p{
				display: inline-block;
				line-height: 40px;
				color: #333333;
				>span{
					margin-right: 10px;
				}
			}
			>span{
				font-size: 12px;
				color: #666666;
				float: right;
				line-height: 30px;
				margin: 5px 0;
			}
		}
	}
}
	.pay{
		height: 40px;
		line-height: 40px;
		margin: 20px 40px 0;
		background: #FF9738;
		border-radius:20px;
		font-size: 16px;
		color: white;
		text-align: center;
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
