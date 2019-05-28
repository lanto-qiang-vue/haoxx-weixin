<template>
<div class="pay-history">
	<div class="block">
		<Form class="common-form"
		      :label-width="60" label-position="left" ref="form">
			<FormItem label="车架号">
				<Input v-model="vin" readonly></Input>
			</FormItem>
			<FormItem label="版本号" class="noborder">
				<ul class="radio">
					<li>
						<p @click="radio='5'"><span class="mint-radio">
							<input type="radio" class="mint-radio-input" value="5" :checked="radio=='5'">
							<span class="mint-radio-core"></span>
						</span>简要版 5.00元</p>
						<span>查看样例</span>
					</li>
					<li>
						<p @click="radio='10'"><span class="mint-radio">
							<input type="radio" class="mint-radio-input" value="10" :checked="radio=='10'">
							<span class="mint-radio-core"></span>
						</span>详细版 10.00元</p>
						<span>查看样例</span>
					</li>
				</ul>
			</FormItem>
		</Form>
	</div>
	<div class="block">
		<Form class="common-form"
		      :label-width="60" label-position="left" ref="form">
			<FormItem label="支付金额">
				<Input :value="`¥ ${radio}.00`" readonly class="money"></Input>
			</FormItem>
		</Form>
	</div>
	<div class="pay">去支付</div>
</div>
</template>

<script>
export default {
	name: "pay-history",
	data(){
		return{
			vin: 'LSF12345678UHG123',
			radio: '5',
			list: []
		}
	},
	mounted(){
		this.getList()
	},
	methods:{
		getList(){
			this.axiosQixiu.get('/hxxdc/product/list', {hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					this.list= res.data.items
				}
			})
		}
	}
}
</script>

<style scoped lang="less">
.pay-history{
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
.pay-history{
	.money input{
		color: #FE8636;
	}
}

</style>
