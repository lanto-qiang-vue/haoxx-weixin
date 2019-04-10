<template>
<div class="setting">
	<ul>
		<router-link tag="li" to="/setting?show=showChangePass">修改密码 <i></i></router-link>
		<router-link tag="li" to="/setting?show=showVerifyPhone">修改手机号 <i></i></router-link>
	</ul>
	<div class="change-pass" v-show="showChangePass">
		<Form :model="passChange" class="account-form"
		      :label-width="0" label-position="left" ref="passChange">
			<FormItem prop="old_pwd">
				<Input v-model="passChange.old_pwd" type="password" placeholder="原密码"></Input>
			</FormItem>
			<FormItem prop="new_pwd">
				<Input v-model="passChange.new_pwd" type="password" placeholder="新密码"></Input>
			</FormItem>
			<FormItem prop="new_pwd_cp">
				<Input v-model="passChange.new_pwd_cp" type="password" placeholder="再次确认新密码"></Input>
			</FormItem>
		</Form>

		<div class="submit" @click="ChangePass">确定</div>
	</div>
	<div class="verify-phone" v-show="showVerifyPhone">
		<Form :model="phoneVerify" class="account-form"
		      :label-width="0" label-position="left" ref="phoneVerify">
			<FormItem prop="phone">
				<Input v-model="phoneVerify.telphone" :maxlength="11" placeholder="原手机号"></Input>
			</FormItem>
			<FormItem prop="pass">
				<Input v-model="phoneVerify.pwd" type="password" placeholder="登录密码"></Input>
			</FormItem>
		</Form>
		<div class="submit" @click="next">下一步</div>
	</div>

	<mt-popup v-model="showChangePhone" position="right" style="height: 100vh;width: 100%">
		<div class="change-phone">
			<Form :model="phoneChange" class="account-form"
			      :label-width="0" label-position="left" ref="phoneChange">
				<FormItem prop="phone">
					<Input v-model="phoneChange.telphone" :maxlength="11" placeholder="手机号"></Input>
				</FormItem>
				<FormItem prop="code">
					<Input v-model="phoneChange.telcode" placeholder="验证码"></Input>
					<countdown class="get-code" text="获取验证码" ref="countdown"
					           :phone="phoneChange.telphone" @click="getCode" url="/operate/account/getCode"></countdown>
				</FormItem>
			</Form>

			<div class="submit" @click="submit">确定并重新登录</div>
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
                old_pwd: 'lantoev.com1',
                new_pwd: 'lantoev.com',
                new_pwd_cp: 'lantoev.com',
                // access_token:localStorage.getItem("token"),
			},
			phoneVerify:{
                telphone: '17321492645',
                pwd: '123456',
                // access_token:localStorage.getItem("token"),
			},
			phoneChange:{
                telphone: '',
                telcode: '',
                // access_token:localStorage.getItem("token"),
                telSession:'',
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
        ChangePass(){
            this.axiosHxx.post('/operate/account/resetPassword', this.passChange).then(res => {
	            if(res.data.success){
		            this.$toast("修改成功");
		            this.$router.go(-1)
	            }
            })
		},
		showBlock(){
			let show= this.$route.query.show
			if(show== 'showChangePass') this.showChangePass=true
			else this.showChangePass=false
			if(show== 'showVerifyPhone') this.showVerifyPhone=true
			else this.showVerifyPhone=false
			this.showChangePhone= false
		},
		next(){
            this.axiosHxx.post('/operate/account/checkUser',this.phoneVerify).then(res => {
               if(res.data.success)  this.showChangePhone= true;
            })
		},
		getCode(telSession){
         this.phoneChange.telSession = telSession;
		},
        submit(){
            this.axiosHxx.post('/operate/account/updateTel', this.phoneChange).then(res => {
                  if(res.data.success){

				  }
            })
		}
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
