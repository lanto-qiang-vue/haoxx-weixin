<template>
<div class="query-vin">
	<div class="row">
		<label>车架号</label>
		<input ref="input" v-model="vin" placeholder="请输入车架号"/>
		<i class="fa fa-camera"></i>
		<div class="look">查看<img :src="img"/></div>
	</div>
	<div class="row">
		<label>我的爱车</label>
		<div class="look">查看</div>
	</div>
	<div class="button">我的报告</div>
</div>
</template>

<script>
export default {
	name: "query-vin",
	data(){
		return{
			vin: '',
			img: ''
		}
	},

}
</script>

<style scoped lang="less">
.query-vin{
	.row{
		height: 70px;
		line-height: 60px;
		border-bottom: 10px solid #F3F3F3;
		padding: 0 15px;
		font-size: 14px;
		position: relative;
		label{
			display: inline-block;
			min-width: 55px;
			color: #333333;
		}
		input{
			width: 55%;
		}
		i{
			color: #CACACA;
			font-size: 20px;
			position: absolute;
			top: 50%;
			right: 90px;
			transform: translateY(-50%);
		}
		.look{
			display: inline-block;
			height: 24px;
			line-height: 24px;
			padding: 0 15px;
			background-color: #FF9738;
			color: white;
			border-radius: 18px;
			position: absolute;
			top: 50%;
			right: 15px;
			transform: translateY(-50%);
		}
	}
	.button{
		text-align: center;
		width:150px;
		line-height: 34px;
		height:36px;
		border-radius:20px;
		border:1px solid #D6D6D6;
		color: #4A4A4A;
		font-size: 14px;
		margin: 70px auto 0;
	}
}
</style>
