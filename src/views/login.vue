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
				<FormItem prop="telphone">
					<Input v-model.trim="codeForm.telphone" :maxlength="11" placeholder="手机号" clearable></Input>
				</FormItem>
				<FormItem prop="telcode">
					<Input v-model.trim="codeForm.telcode" :maxlength="10" placeholder="验证码"></Input>
					<countdown class="get-code" text="获取验证码" ref="countdown" @click="codeForm.telSession= $event"
					url="/operate/controller/getCarliveCode" :phone="codeForm.telphone"></countdown>
				</FormItem>
			</Form>
		</mt-tab-container-item>
		<mt-tab-container-item id="pass">
			<Form :model="passForm" class="account-form"
			      :label-width="0" label-position="left" ref="passForm">
				<FormItem prop="telphone">
					<Input v-model.trim="passForm.telphone" placeholder="账号" clearable></Input>
				</FormItem>
				<FormItem prop="telpass">
					<Input v-model.trim="passForm.telpass" type="password" placeholder="密码" clearable></Input>
				</FormItem>
			</Form>
			<router-link to="/login?type=forget" class="forget">忘记密码</router-link>
		</mt-tab-container-item>
	</mt-tab-container>

	<div :class="['submit',{on: activity}]" @click="submit">登录</div>

	<p class="protocol">新用户登录即完成注册，代表同意
		<router-link to="/article-detail?infoId=hxx-protocol">《好修修车生活用户协议》</router-link>
	</p>

	<div class="other-way" v-show="unionid">
		<small>其他登录方式</small>
		<ul>
			<li @click="unionidLogin">
				<div style="background-color: #50B674">
					<i class="fa fa-weixin"></i>
				</div>
				<p>微信登录</p>
			</li>
		</ul>
	</div>

	<mt-popup v-model="showBind" position="right" class="login-popup">
		<div class="bind-phone">
			<p><label>提示：</label>
				<span v-show="activeBlock=='bindPhone'">平台登录方式更新为使用手机号登录,请验证您的手机号</span>
				<span v-show="activeBlock=='bindWeixin'">此微信还未绑定账号，请绑定</span>
			</p>
			<Form :model="bindForm" class="account-form"
			      :label-width="0" label-position="left" ref="bindForm">
				<FormItem prop="telphone">
					<Input v-model.trim="bindForm.telphone" :maxlength="11" placeholder="手机号" clearable></Input>
				</FormItem>
				<FormItem prop="smsCode">
					<Input v-model.trim="bindForm.smsCode" placeholder="验证码" :maxlength="10"></Input>
					<countdown class="get-code" text="获取验证码" @click="bindForm.telSession= $event"
					           :phone="bindForm.telphone"  url="/operate/account/getBindCode"
					           :token="tempToken"
					           v-show="activeBlock=='bindPhone'"></countdown>
					<countdown class="get-code" text="获取验证码" @click="bindForm.telSession= $event"
					           url="/operate/controller/getCarliveCode" :phone="bindForm.telphone"
					           v-show="activeBlock=='bindWeixin'"></countdown>
				</FormItem>
				<FormItem prop="password" v-show="activeBlock=='bindPhone'">
					<Input v-model.trim="bindForm.password" type="password" placeholder="登录密码" clearable></Input>
				</FormItem>
			</Form>

			<div :class="['submit',{on: activity}]" @click="submit">提交</div>
		</div>
	</mt-popup>

	<mt-popup v-model="showForget" position="right" class="login-popup">
		<div class="forget-phone">
			<Form :model="forgetForm" class="account-form"
			      :label-width="0" label-position="left" ref="forgetForm">
				<FormItem prop="telphone">
					<Input v-model.trim="forgetForm.telphone" :maxlength="11" placeholder="手机号" clearable></Input>
				</FormItem>
				<FormItem prop="telcode">
					<Input v-model.trim="forgetForm.telcode" placeholder="验证码" :maxlength="10"></Input>
					<countdown class="get-code" text="获取验证码" @click="forgetForm.telSession= $event"
					           :phone="forgetForm.telphone"  url="/getResetCode.do"></countdown>
				</FormItem>
				<FormItem prop="password">
					<Input v-model.trim="forgetForm.password" type="password" placeholder="输入密码" clearable></Input>
				</FormItem>
				<FormItem prop="password_cp">
					<Input v-model.trim="forgetForm.password_cp" type="password" placeholder="确认密码" clearable></Input>
				</FormItem>
			</Form>

			<div :class="['submit',{on: activity}]" @click="submit">提交</div>
		</div>
	</mt-popup>
</div>
</template>

<script>
import Countdown from '@/components/countdown-button.vue'
import { reg} from '@/util.js'
export default {
	name: "accredit-bind",
	components: {Countdown },
	data(){
		return{
			activeBlock: 'code',
			codeForm:{
				telphone:'',
				telcode:'',
				telSession:'',
			},
			passForm: {
				telphone: '',
				telpass: '',
			},
			bindForm:{
				telphone:'',
				smsCode:'',
				telSession:'',
				password:'',
			},
			forgetForm:{
				telphone:'',
				telcode:'',
				telSession:'',
				password:'',
				password_cp:'',
			},
			showBind: false,
			showForget: false,
			tempToken: ''
		}
	},
	computed:{
		activity(){
			let status= false
			switch (this.activeBlock){
				case 'code':{
					if(reg.mobile.test(this.codeForm.telphone) && this.codeForm.telcode){
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
				case 'bindPhone':{
					if(reg.mobile.test(this.bindForm.telphone) && this.bindForm.smsCode&& this.bindForm.password){
						status= true
					}
					break
				}
				case 'bindWeixin':{
					if(reg.mobile.test(this.bindForm.telphone) && this.bindForm.smsCode){
						status= true
					}
					break
				}
				case 'forget':{
					if(reg.mobile.test(this.forgetForm.telphone) && this.forgetForm.telcode
						&& this.forgetForm.password && this.forgetForm.password_cp){
						status= true
					}
					break
				}
			}
			return status
		},
		unionid(){
			return localStorage.getItem("UNIONID");
		},
		weixinid(){
			return {
				open_id: localStorage.getItem("OPENID")||'',
				union_id: localStorage.getItem("UNIONID")||'',
			}
		}
	},
	watch:{
		'$route'(){
			this.showBlock()
		},
	},
	mounted(){
		this.showBlock('code')
	},
	methods:{
		showBlock(block){
			let show= this.$route.query.type
			if(show== 'forget'){
				this.activeBlock= 'forget'
				this.showForget=true
			} else {
				this.activeBlock= block|| 'pass'
				this.showForget=false
			}
		},
		submit(){
			if(this.activity){
				switch (this.activeBlock){
					case 'code':{
						this.axiosHxx.post('/operate/controller/carLiveLogin',
							Object.assign(this.codeForm, this.weixinid)).then(res => {
							this.loginSuccess(res.data)
						})
						break
					}
					case 'pass':{
						this.axiosHxx.post('/operate/controller/carlivePWDLogin',
							Object.assign(this.passForm, this.weixinid)).then(res => {
							this.loginSuccess(res.data)
						})
						break
					}
					case 'bindPhone':{
						this.axiosHxx.post('/operate/account/bind',{
							access_token: this.tempToken,
							...this.bindForm
						}).then(res => {
							if(res.data.success){
								this.activeBlock='code'
								this.showBind= false
								this.$toast('绑定成功');
								// this.goBackUrl()
								this.loginSuccess(res.data)
							}
						})
						break
					}
					case 'forget':{
						this.axiosHxx.post('/resetPassword.do', this.forgetForm).then(res => {
							if(res.data.success){
								this.$toast('密码重置成功，请登录');
								this.$router.go(-1)
							}
						})
						break
					}
					case 'bindWeixin':{
						this.axiosHxx.post('/operate/controller/carLiveLogin', Object.assign({
							telphone: this.bindForm.telphone,
							telcode: this.bindForm.smsCode,
							telSession: this.bindForm.telSession,
						}, this.weixinid)).then(res => {
							if(res.data.success){
								this.activeBlock='code'
								this.showBind= false
								this.loginSuccess(res.data)
							}
						})
						break
					}
				}
			}
		},
		unionidLogin(){
			this.axiosHxx.post('/operate/controller/loginByWx', {unionid: this.unionid}).then(res => {
				if(res.data.success){
					this.loginSuccess(res.data)
				}else{
					this.$indicator.close()
					// this.$toast('');
					this.activeBlock='bindWeixin'
					this.showBind= true
				}
			})
		},
		loginSuccess(data){
			if(data.success){
				if(data.data.qxtoken) this.$store.commit('setQixiuToken',data.data.qxtoken);
				if(data.data.isBindNewphone== 1){
					this.setStore(data)
					this.$toast('登录成功');
					this.activeBlock='code'
					this.goBackUrl()
				}else{
					this.tempToken= data.data.tokenStr
					this.activeBlock='bindPhone'
					this.showBind= true
				}
			}
		},
		setStore(data){
			this.$store.commit('setHxxToken',data.data.tokenStr);
			this.$store.dispatch('dictInit',data.data.dict);
			delete data.data.dict
			this.$store.commit('setUserInfo',data.data);
		},
		goBackUrl(){
			if(this.$route.query.redirect){
				this.$router.replace({
					path: this.$route.query.redirect
				})
			}else{
				this.$router.replace({path: '/'})
			}
		},
	},
	beforeRouteLeave (to, from, next) {
		this.activeBlock='code'
		this.showBind= false
		console.log('beforeRouteLeave')
		next()
	},
	beforeDestory(){
		console.log('beforeDestory')
	},
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
		.forget{
			position: absolute;
			right: 0;
			bottom: 0;
			font-size: 14px;
			color: #666666;
		}
	}
	.get-code{
		background-color: white;
		color: #333333;
		font-size: 14px;
		position: absolute;
		line-height: 30px;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		&.off{
			color: #999999;
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
	.login-popup{
		width: 100%;
		height: 100vh;
	}
	.bind-phone, .forget-phone{
		padding: 40px 30px 0;
		height: 100vh;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: white;
		>p{
			color: #333333;
			font-size: 14px;
			line-height: 20px;
			/*text-align: center;*/
			margin-bottom: 40px;
			label{
				color: #FE8636;
			}
		}
	}
}
</style>
