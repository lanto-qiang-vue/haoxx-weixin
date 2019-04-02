<template>
<div class="setting">
	<ul>
		<li @click="">修改密码 <i></i></li>
		<li @click="">修改手机号 <i></i></li>
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
	<div class="change-phone" v-show="showChangePhone">

	</div>
</div>
</template>

<script>
export default {
	name: "setting",
	data(){
		return{
			passChange:{
				pass1: '',
				pass2: '',
				pass3: '',
			},
			showChangePass: true,
			showChangePhone: false,
		}
	},
	methods:{

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
	.change-pass, change-phone{
		padding: 40px 30px 0;
		height: 100vh;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: white;
		.submit{
			margin-top: 40px;
			height:40px;
			line-height: 40px;
			background: #FF9738;
			border-radius:20px;
			font-size: 16px;
			color: white;
			text-align: center;
		}
	}
}
</style>
