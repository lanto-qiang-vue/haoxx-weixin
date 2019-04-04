<template>
<div class="login">
	<ul class="tab">
		<li :class="{on: activeBlock=='code'}" @click="activeBlock='code'">验证码登录</li>
		<li :class="{on: activeBlock=='pass'}" @click="activeBlock='pass'">密码登录</li>
	</ul>
	<mt-tab-container class="active-block" v-model="activeBlock" :swipeable="true">
		<mt-tab-container-item id="code">
			<Form :model="codeForm" class="account-form"
			      :label-width="0" label-position="left" ref="codeForm">
				<FormItem prop="phone">
					<Input v-model.trim="codeForm.phone" :maxlength="11" placeholder="手机号"></Input>
				</FormItem>
				<FormItem prop="code">
					<Input v-model.trim="codeForm.code" placeholder="验证码"></Input>
					<countdown class="get-code" text="获取验证码" ref="countdown" @click="getCode"></countdown>
				</FormItem>
			</Form>
		</mt-tab-container-item>
		<mt-tab-container-item id="pass">
			<Form :model="passForm" class="account-form"
			      :label-width="0" label-position="left" ref="passForm">
				<FormItem prop="telphone">
					<Input v-model.trim="passForm.telphone" placeholder="账号"></Input>
				</FormItem>
				<FormItem prop="telpass">
					<Input v-model.trim="passForm.telpass" type="password" placeholder="密码"></Input>
				</FormItem>
			</Form>
			<a class="forget">忘记密码</a>
		</mt-tab-container-item>
	</mt-tab-container>

	<div :class="['submit',{on: canLogin}]" @click="login">登录</div>

	<p class="protocol">新用户登录即完成注册，代表同意
		<a>《好修修车生活用户协议》</a>
	</p>

	<div class="other-way">
		<small>其他登录方式</small>
		<ul>
			<li>
				<div style="background-color: #50B674">
					<i class="fa fa-weixin"></i>
				</div>
				<p>微信登录</p>
			</li>
		</ul>
	</div>

</div>
</template>

<script>
import Countdown from '@/components/countdown-button.vue'
import { reg} from '@/util.js'
export default {
	name: "login",
	components: {Countdown },
	data(){
		return{
			activeBlock: 'code',
			codeForm:{
				phone:'',
				code:'',
			},
			passForm: {
				telphone: '15900418638',
				telpass: '123456',
			}
		}
	},
	computed:{
		canLogin(){
			let status= false
			switch (this.activeBlock){
				case 'code':{
					if(reg.vehicle.test(this.codeForm.phone) && this.codeForm.code){
						status= true
					}
					break
				}
				case 'pass':{
					if(this.passForm.telphone && this.passForm.telpass){
						status= true
					}
					break
				}
			}
			return status
		}
	},
	methods:{
		getCode(){
			this.$refs.countdown.startTimers()
		},
		login(){
			this.$router.push('/')
			if(this.canLogin){
				switch (this.activeBlock){
					case 'code':{

						break
					}
					case 'pass':{

						break
					}
				}
				this.axiosQixiuHxx.post('/operate/controller/passwordLogin', this.passForm).then(res => {

				})
			}
		}
	}
}
</script>

<style scoped lang="less">
.login{
	padding: 0 30px;
	transition: all .5s;
	height: 100vh;
	position: relative;
	overflow: hidden;
	.tab{
		padding: 0 10px;
		margin: 30px 0;
		overflow: hidden;
		li{
			padding: 10px 0;
			width: 50%;
			float: left;
			text-align: center;
			font-size: 16px;
			color: #333333;
		}
		li.on{
			color: #FE8636;
		}
	}
	.active-block{
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
		.forget{
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 14px;
			color: #666666;
		}
	}
	.submit{
		margin-top: 40px;
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
	.protocol{
		margin-top: 20px;
		text-align: center;
		color: #666666;
		font-size: 12px;
		a{
			color: #FF9738;
			display: block;
		}
	}
	.other-way{
		height: 100px;
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0 30px;
		small{
			color: #999999;
			font-size: 12px;
			padding: 0 15px;
			background-color: white;
			position: absolute;
			left: 50%;
			top: 0;
			transform: translate(-50%, -50%);
		}
		ul{
			border-top: 1px solid #E0E0E0;
			padding-top: 30px;
			text-align: center;
			li{
				display: inline-block;
				vertical-align: top;
				overflow: hidden;
				margin: 0 10px;
				div{
					width: 30px;
					height: 30px;
					display: inline-block;
					position: relative;
					border-radius: 100%;
					i{
						font-size:  16px;
						color: white;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}
				p{
					color: #999999;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
