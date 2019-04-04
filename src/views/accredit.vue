<template>
<div class="accredit">
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
				account: '',
				code: ''
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
}
</style>
