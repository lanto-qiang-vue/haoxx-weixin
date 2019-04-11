<template>
<div class="reservation-detail">
	<div :class="['status', 'statu'+status]" v-show="statusText">{{statusText}}</div>
	<Form :class="['common-form']" :model="form"
	      :label-width="80" label-position="left" ref="form">
		<FormItem label="门店名称">
			<span class="line">{{compname}}</span>
		</FormItem>
		<FormItem label="到店时间" prop="ownerName">
			<Input v-model.trim="form.name"></Input>
		</FormItem>
		<FormItem label="当前里程" prop="ownerName">
			<Input v-model.trim="form.name" type="number"></Input>
		</FormItem>
		<FormItem label="预约人" prop="ownerName">
			<Input v-model.trim="form.name"></Input>
		</FormItem>
		<FormItem label="联系电话" prop="ownerName">
			<Input v-model.trim="form.name"></Input>
		</FormItem>
		<FormItem label="车牌号码" prop="ownerName">
			<select-radio class="ivu-input select" v-model="form.area" :options="options"></select-radio>
		</FormItem>
		<FormItem label="车辆型号" prop="ownerName">
			<Input v-model.trim="form.name"></Input>
		</FormItem>
		<FormItem label="维修类型" prop="ownerName">
			<Input v-model.trim="form.name"></Input>
		</FormItem>
		<FormItem label="故障描述" prop="ownerName">
			<Input v-model.trim="form.name" type="textarea" :rows="2"></Input>
		</FormItem>
	</Form>
	<div class="common-submit"><a>提交预约</a></div>
</div>
</template>

<script>
import SelectRadio from '@/components/select-radio.vue'
export default {
	name: "reservation-detail",
	components: {SelectRadio },
	data(){
		return{
			form: {
				name: '',
				area: '11'
			},
			options: [{label:'测试1',value: '11'}, {label:'测试2',value: '22'}]
		}
	},
	computed:{
		compname(){
			return this.$route.query.name||''
		},
		status(){
			return this.form.status? this.form.status.toString(): ''
		},
		statusText(){
			let text= ''
			switch (this.status){
				case '1':{
					text= '待审核';break
				}
				case '2':{
					text= '审核成功';break
				}
				case '3':{
					text= '审核不通过';break
				}
				default :{
					text= '新建';break
				}
			}
			return text
		},
	}
}
</script>

<style scoped lang="less">
.reservation-detail{
	padding-bottom: 70px;
	.status{
		height: 40px;
		line-height: 40px;
		padding-left: 15px;
		color: #6CBC16;
		font-size: 14px;
		border-bottom: 1px solid #E5E5E5;
	}
	.statu1{
		color: #FF9900;
	}
	.statu3{
		color: #ed4014;
	}
}
</style>
