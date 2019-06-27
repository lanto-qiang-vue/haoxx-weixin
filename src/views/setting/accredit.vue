<template>
<div :class="['accredit', {fixed: isComponent}]">
	<div class="icon">
		<img src="~@/assets/img/hxx-icon.png"/>
		<i class="fa fa-exchange"></i>
		<img src="~@/assets/img/record-icon.png"/>
	</div>
	<div class="content">
		<h2>您同意好修修车生活平台 获取您在汽车维修电子健康档案系统中的以下权限：</h2>
		<p>获取您的公开信息（登录名、昵称、头像） </p>
		<p>获取您的车辆信息（如：车牌、车型、维修记录） </p>
		<p>好修修车生活平台仅在您使用相关服务时，可获取您留存在好修修车生活和汽车维修电子健康档案系统的上述必 要信息。</p>
		<!--<p>若您已在汽车维修电子健康档案系统注册，但账号不是尾号({{tel.substring(7, 11)}})，您可在下方“使用手机号授权”处更改为您在汽车维修电子健康档案系统注册的账号。</p>-->
	</div>
	<!--<Form :model="form" class="common-form"-->
	      <!--:label-width="100" label-position="left" ref="form">-->
		<!--<FormItem label="使用手机号授权" prop="telphone">-->
			<!--<Input v-model="form.telphone" :maxlength="11" placeholder="请输入手机号"></Input>-->
		<!--</FormItem>-->
		<!--<FormItem label="验证码" prop="telcode" v-show="needVerify">-->
			<!--<Input v-model="form.telcode" :maxlength="10" placeholder="请输入验证码"></Input>-->
			<!--<countdown class="get-code" @click="form.telSession= $event"-->
			           <!--url="/operate/controller/getCarliveCode" :phone="form.telphone"></countdown>-->
		<!--</FormItem>-->
	<!--</Form>-->
	<a class="affirm" @click="affirm(true)">同意授权</a>
	<a class="cancel" @click="affirm(false)">暂不授权</a>
</div>
</template>

<script>
import Countdown from '@/components/countdown-button.vue'
export default {
	name: "accredit",
	components: {Countdown },
	props:{
		isComponent: {
			default: false
		},
	},
	data(){
		return{
			form:{
				telphone: '',
				telcode: ''
			},
			resolve: null,
			show: false,
		}
	},
	computed:{
		needVerify(){
			return this.form.telphone!= this.tel
		},
		tel(){
			return this.$store.state.user.userinfo.telphone
		},
		display(){
			if(this.isComponent){
				return this.show
			}else{
				return true
			}
		}
	},
	mounted(){
		this.form.telphone= this.tel
	},
	methods:{
		open(){
			this.show= true
			return new Promise((resolve, reject) => {
				this.resolve= resolve
			});
		},
		affirm(status){
			if(status){
				this.axiosHxx.post('/cartalk/userinfo/authorizeCarlive',{}, {baseURL: '/hxx-gateway-proxy'}).then(res=>{
					if(res.data.success){
						this.$store.commit('changeUserInfo', {isAuthorize: true});
						this.$toast('授权成功');
						this.goBackUrl()
					}
				})
			}else{
				this.$router.go(-1)
			}
		},
		deal(status){
			if(this.isComponent){
				if(this.resolve){
					this.resolve({status})
					this.resolve= null
				}
				this.show= false
			}else{
				if(status){
					this.goBackUrl()
				}else{
					this.$router.go(-1)
				}
			}
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
	}
}
</script>

<style scoped lang="less">
.accredit{
	overflow: hidden;
	min-height: 100vh;
	background-color: #F3F3F3;
	&.fixed{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		overflow: auto;
	}
	.icon{
		padding: 30px 0;
		text-align: center;
		background:linear-gradient(135deg,rgba(255,142,32,1) 0%,rgba(255,115,36,1) 100%,rgba(247,107,28,1) 100%);
		color: white;
		img{
			width: 50px;
			height: 50px;
			vertical-align: middle;
		}
		i{
			font-size: 20px;
			vertical-align: middle;
			margin: 0 30px;
		}
	}
	.content{
		padding: 10px 0 10px 15px;
		background-color: white;
		h2{
			padding-bottom: 5px;
			font-weight: 400;
			color: #333333;
			font-size: 14px;
			padding-right: 15px;
			border-bottom: 1px solid #D9D9D9;
			margin-bottom: 5px;
		}
		p{
			font-size: 12px;
			color: #666666;
			line-height: 24px;
			padding: 0 10px 0 6px;
			position: relative;
			&:before{
				content: '';
				display: block;
				width: 3px;
				height: 3px;
				background-color: #666666;
				position: absolute;
				left: 0;
				top: 10px;
				border-radius: 2px;
			}
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
	.affirm{
		display: block;
		width: 80%;
		margin: 20px auto 5px auto;
		font-size: 16px;
		color: white;
		text-align: center;
		line-height: 40px;
		background-color: #FF9738;
		border-radius: 20px;
	}
	.cancel{
		font-size: 16px;
		display: block;
		width: 100px;
		margin: 5px auto;
		text-align: center;
		line-height: 40px;
		color: #666666;
	}
}
</style>
