<template>
<div class="get-awards">
	<h2>请输入您的手机号和地址以便邮寄您的奖品</h2>
	<Form :class="['common-form']" :model="form" :rules="ruleValidate"
	      :label-width="80" label-position="left" ref="form">
		<FormItem label="联系电话" prop="mobile">
			<Input v-model.trim="form.mobile" type="tel" :maxlength="11"></Input>
		</FormItem>
		<FormItem label="收货地址" prop="address">
			<Input v-model.trim="form.address" ></Input>
		</FormItem>
	</Form>
	<div class="submit" @click="submit">提交</div>
</div>
</template>

<script>
export default {
	name: "get-awards",
	data(){
		let rule= { required: true, message:'必填项不能为空'}
		return{
			form: {
				mobile: '',
				address: '',
			},
			ruleValidate: {
				mobile: rule,
				address: rule,
			}
		}
	},
	methods:{
		submit(){
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.axiosQixiu.post('/lucky-draw/receive', {
						recordId: this.$route.query.id,
						...this.form
					}, {baseURL: '/laozhao-api', hxxtoken: true}).then(res=>{
						if(res.data.status=='200'){
							this.$toast('领取成功')
							this.$router.go(-1)
						}
					})
				}
			})

		}
	}
}
</script>

<style scoped lang="less">
.get-awards{
	h2{
		margin: 20px 0;
		text-align: center;
		width: 100%;
		color: #FF9738;
		font-size: 14px;
		font-weight: 400;
	}
	.submit{
		margin: 50px 40px;
		height:40px;
		line-height: 40px;
		background: #FF9738;
		border-radius:20px;
		font-size: 16px;
		color: white;
		text-align: center;
		display: block;
	}
}
</style>
