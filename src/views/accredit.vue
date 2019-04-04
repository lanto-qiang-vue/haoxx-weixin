<template>
<div class="accredit">
	<div class="description">
		<span>提示：</span>授权使用您在汽修平台的信息
	</div>
	<Form :model="form" class="common-form"
	      :label-width="100" label-position="left" ref="form">
		<FormItem label="汽修平台账号" prop="account">
			<Input v-model="form.account"></Input>
		</FormItem>
		<FormItem label="验证码" prop="code">
			<Input v-model="form.code"></Input>
			<countdown class="get-code" text="获取验证码" ref="countdown" @click="getCode"></countdown>
		</FormItem>
	</Form>
	<div :class="['submit',{on: canLogin}]">同意授权</div>
</div>
</template>

<script>
import Countdown from '@/components/countdown-button.vue'
import { reg} from '@/util.js'
export default {
	name: "accredit",
	components: {Countdown },
	data(){
		return{
			form: {
				account: '1111111111',
				code: '11111'
			}
		}
	},
	methods:{
		getCode(){
			this.$refs.countdown.startTimers()
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
		margin: 40px 20px 0px 20px;
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
}
</style>
