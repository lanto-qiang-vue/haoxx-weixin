<template>
<div class="reservation-detail">
	<div :class="['status', 'statu'+status]" v-show="statusText">{{statusText}}</div>
	<Form :class="['common-form']" :model="form"
	      :label-width="80" label-position="left" ref="form">
		<FormItem label="门店名称">
			<span class="line">{{compname}}</span>
		</FormItem>
		<FormItem label="到店时间" prop="appointmentTime">
			<span class="ivu-input select"  readonly @click="open">{{form.appointmentTime}}</span>
		</FormItem>
		<FormItem label="当前里程" prop="MILEAGE">
			<Input v-model.trim="form.MILEAGE" type="number"></Input>
		</FormItem>
		<FormItem label="预约人" prop="ORDER_PERSON">
			<Input v-model.trim="form.ORDER_PERSON"></Input>
		</FormItem>
		<FormItem label="联系电话" prop="TELPHONE">
			<Input v-model.trim="form.TELPHONE"></Input>
		</FormItem>
		<FormItem label="车牌号码" prop="PLATE_NUM">
			<Input v-model.trim="form.PLATE_NUM"></Input>
			<!--<select-radio class="ivu-input select" v-model="form.area" :options="options"></select-radio>-->
		</FormItem>
		<FormItem label="车辆型号" prop="VEHICLE_MODEL">
			<Input v-model.trim="form.VEHICLE_MODEL"></Input>
		</FormItem>
		<FormItem label="维修类型" prop="REPAIR_TYPE">
			<select-radio class="ivu-input select" v-model="form.REPAIR_TYPE" :options="typeList"></select-radio>
		</FormItem>
		<FormItem label="故障描述" prop="FAULT_DESC">
			<Input v-model.trim="form.FAULT_DESC" type="textarea" :rows="2"></Input>
		</FormItem>
	</Form>
	<div class="common-submit" @click="submit"><a>提交预约</a></div>
	<mt-datetime-picker
			v-model="pickerVisible"
			type="datetime"
			ref="picker"
			@confirm="confirmTime"
			year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日">
	</mt-datetime-picker>
</div>
</template>

<script>
import SelectRadio from '@/components/select-radio.vue'
export default {
	name: "reservation-detail",
	components: {SelectRadio },
	data(){
		return{
            pickerVisible:"",
            defaultYear:"",
            defaultMonth:"",
            defaultDay:"",
			form: {
                ORDER_DATE:"2019-04-04",//预约时间 年月日
                ORDER_TIME:"22:22",//时分
                appointmentTime:"2019-04-04 22:22",//拼接的时间
                MILEAGE:"1",//里程
                ORDER_PERSON:"王旭",//预约人
                TELPHONE:"138888888",//联系人
                PLATE_NUM:"沪FY3303",//车牌号码
                VEHICLE_MODEL:"B4 BITURBO N55R30A 后轮驱动 8A/MT（2016-",//车型中文说明
                VEHICLE_ID:"22393",//车型ID
                REPAIR_TYPE:"10091001",//维修类型1019系列
                FAULT_DESC:"接口通不通",//故障描述
                ORDER_ID:"",
				//无关页面还必须有写字段
                VIN_NO:"",
                ORDER_TYPE: "10411001",
                CUSTOMER_INFO:"",
                STATUS: "10421001",
                IS_ITEM_GROUP: "10041002",
                REPAIR_ITEM_DERATE_MONEY: 0,
                REPAIR_PART_DERATE_MONEY: 0,
                REPAIR_ITEM_MONEY: 0,
                REPAIR_PART_MONEY: 0,
                SUM_MONEY: 0
			},
            roadliense:"370181320005",//道路许可证
			typeList:[{label:'1009001',value:1009001},{label:'1009002',value:1009002},],
		}
	},
	methods:{
        confirmTime(res){
        this.form.ORDER_DATE = res.getFullYear()+"-"+this.fillZero(res.getMonth()+1)+"-"+this.fillZero(res.getDay());
        this.form.ORDER_TIME= this.fillZero(res.getHours()) +":"+this.fillZero(res.getMinutes());
        this.form.appointmentTime = this.form.ORDER_DATE  + " " + this.form.ORDER_TIME;
        this.pickerVisible = this.form.appointmentTime;
		},
	    open(){
            this.$refs.picker.open();
		},
		fillZero(n){
            return n < 10 ? "0"+n : n + "";
		},
	    submit(){
            this.axiosHxx.post('/operate/order/saveOrSubmit', {data:this.form,items:[],itemGroups:[],parts:[],roadliense:this.roadliense}).then(res => {
                if(res.success){
                    //下一步操作
				}
            })
		}
	},
	mounted(){
       this.confirmTime(new Date());
        this.typeList =  this.$store.state.user.dict['1009'];
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
