<template>
<div class="setting">
	<ul>
		<router-link tag="li" to="/setting?show=showChangePass">修改密码 <i></i></router-link>
		<router-link tag="li" to="/setting?show=showVerifyPhone">修改手机号 <i></i></router-link>
	</ul>
	<div class="change-pass" v-show="showChangePass">
		<Form :model="passChange" class="account-form"
		      :label-width="0" label-position="left" ref="passChange">
			<FormItem prop="pass1" required>
				<Input v-model="passChange.pass1" type="password" placeholder="原密码"></Input>
			</FormItem>
			<FormItem prop="pass2">
				<Input v-model="passChange.pass2" type="password" placeholder="新密码"></Input>
			</FormItem>
			<FormItem prop="pass3">
				<Input v-model="passChange.pass3" type="password" placeholder="再次确认新密码"></Input>
			</FormItem>
		</Form>

		<div class="submit">确定</div>
	</div>
	<div class="verify-phone" v-show="showVerifyPhone">
		<Form :model="phoneVerify" class="account-form"
		      :label-width="0" label-position="left" ref="phoneVerify">
			<FormItem prop="phone">
				<Input v-model="phoneVerify.phone" :maxlength="11" placeholder="手机号"></Input>
			</FormItem>
			<FormItem prop="pass">
				<Input v-model="phoneVerify.pass" type="password" placeholder="登录密码"></Input>
			</FormItem>
		</Form>

		<div class="submit" @click="next">下一步</div>
	</div>

	<mt-popup v-model="showChangePhone" position="right">
		<div class="change-phone">
			<Form :model="phoneChange" class="account-form"
			      :label-width="0" label-position="left" ref="phoneChange">
				<FormItem prop="phone">
					<Input v-model="phoneChange.phone" :maxlength="11" placeholder="手机号"></Input>
				</FormItem>
				<FormItem prop="code">
					<Input v-model="phoneChange.code" placeholder="验证码"></Input>
					<countdown class="get-code" text="获取验证码" ref="countdown" @click="getCode"></countdown>
				</FormItem>
			</Form>

			<div class="submit">确定并重新登录</div>
		</div>
	</mt-popup>
</div>
</template>

<script>
import Countdown from '@/components/countdown-button.vue'
export default {
	name: "setting",
	components: {Countdown },
	data(){
		return{
			passChange:{
				pass1: '',
				pass2: '',
				pass3: '',
			},
			phoneVerify:{
				phone: '',
				pass: '',
			},
			phoneChange:{
				phone: '',
				code: '',
			},
			showChangePass: false,
			showVerifyPhone: false,
			showChangePhone: false,
		}
	},
	watch:{
		'$route'(to){
			this.showBlock()
		},
	},
	mounted(){
		this.showBlock()
	},
	methods:{
		showBlock(){
			let show= this.$route.query.show
			if(show== 'showChangePass') this.showChangePass=true
			else this.showChangePass=false
			if(show== 'showVerifyPhone') this.showVerifyPhone=true
			else this.showVerifyPhone=false
			this.showChangePhone= false
		},
		next(){
			this.showChangePhone= true
		},
		getCode(){
			this.$refs.countdown.startTimers()
		},
	}
}
</script>

<style scoped lang="less">
.setting{
	>ul{
		padding-left: 15px;
		li{
			padding-left: 15px;
			height: 55px;
			line-height: 54px;
			color: #333333;
			font-size: 16px;
			border-bottom: 1px solid #D9D9D9;
			position: relative;
			i{
				position: absolute;
				right: 20px;
				top: 50%;
				border-right: 1px solid;
				border-bottom: 1px solid;
				width: 10px;
				height: 10px;
				color: #999;
				transform: translateY(-50%) rotate(-45deg);
			}
		}
	}
	.change-pass, .verify-phone, .change-phone{
		padding: 40px 30px 0;
		height: 100vh;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: white;
		.submit{
			margin-top: 100px;
			height:40px;
			line-height: 40px;
			background: #FF9738;
			border-radius:20px;
			font-size: 16px;
			color: white;
			text-align: center;
		}
		.get-code{
			color: #333333;
			font-size: 14px;
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			&.off{
				color: #999999;
			}
		}
	}
}
</style>
