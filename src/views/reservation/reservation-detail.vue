<template>
<div class="reservation-detail">
	<Form :class="['common-form']" :model="info"
	      :label-width="80" label-position="left" ref="form">
		<!--<FormItem label="门店名称">-->
		<!--<span class="line">{{TENANT_NAME}}</span>-->
		<!--</FormItem>-->
		<FormItem label="服务门店" prop="appointmentTime">
			<span class="text">{{info.shop}}</span>
		</FormItem>
		<FormItem label="门店地址" prop="appointmentTime">
			<span class="select">{{info.add}}</span>
		</FormItem>
		<FormItem label="门店电话" prop="appointmentTime">
			<span class="text">{{info.tel}}</span>
			<a class="tel">
				<i class="fa fa-phone"></i>
			</a>
		</FormItem>
		<FormItem label="预约时间" prop="appointmentTime">
			<span class="text">{{info.shop}}</span>
		</FormItem>
		<FormItem label="预约类型" prop="appointmentTime">
			<span class="text">{{info.shop}}</span>
		</FormItem>
		<FormItem label="车牌号" prop="appointmentTime">
			<span class="text">{{info.shop}}</span>
		</FormItem>
		<FormItem label="预约单号" prop="appointmentTime">
			<span class="text">{{info.shop}}</span>
		</FormItem>
		<FormItem label="状态" prop="appointmentTime">
			<span class="text">{{info.shop}}</span>
		</FormItem>
	</Form>

	<div class="common-submit" @click="cancel"><a class="on">取消预约</a></div>
</div>
</template>

<script>
export default {
	name: "reservation-detail",
	data(){
		return{
			// info:{
			// 	shop: '小明汽车快修',
			// 	add: '淞虹路207号明基商务广场C栋',
			// 	tel: '021-55678906'
			// }
		}
	},
	computed:{
		info(){
			return this.$route.query
		}
	},
	mounted(){
		console.log(this.$route.query)
	},
	methods:{
		cancel(){

		}
	}
}
</script>

<style scoped lang="less">
.reservation-detail{
	.common-form{
		.tel{
			position: absolute;
			top: 50%;
			right: 15px;
			transform: translateY(-50%);
			display: inline-block;
			width: auto;
			margin: 0;
			font-size: 22px;
		}
	}
}
</style>
