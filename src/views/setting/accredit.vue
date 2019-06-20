<template>
<div class="accredit">
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
	</div>
	<a class="affirm">同意授权</a>
	<a class="cancel">暂不授权</a>
</div>
</template>

<script>
export default {
	name: "accredit",

}
</script>

<style scoped lang="less">
.accredit{
	height: 100vh;
	background-color: #F3F3F3;
	.icon{
		padding: 35px 0;
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
	.affirm{
		display: block;
		width: 80%;
		margin: 60px auto 5px auto;
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
