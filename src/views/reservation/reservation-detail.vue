<template>
<div class="reservation-detail">
	<div :class="['status', 'statu'+status]">{{$store.state.user.unit[form.STATUS]|| '新建'}}</div>
	<Form :class="['common-form']" :model="form" :rules="ruleValidate"
	      :label-width="80" label-position="left" ref="form">
		<FormItem label="门店名称">
			<span class="line">{{TENANT_NAME}}</span>
		</FormItem>
		<FormItem label="到店时间" prop="appointmentTime">
			<span class="ivu-input select"  readonly @click="open">{{form.appointmentTime}}</span>
		</FormItem>
		<FormItem label="当前里程" prop="MILEAGE">
			<Input v-model.trim="form.MILEAGE" type="number"></Input>
			<p style="position: absolute;top: 50%;right: 5px;transform: translateY(-50%);width: auto;margin: 0">公里</p>
		</FormItem>
		<FormItem label="预约人" prop="ORDER_PERSON">
			<Input v-model.trim="form.ORDER_PERSON"></Input>
		</FormItem>
		<FormItem label="联系电话" prop="TELPHONE">
			<Input v-model.trim="form.TELPHONE"></Input>
		</FormItem>
		<FormItem label="车牌号码" prop="PLATE_NUM">
			<Input v-model.trim="form.PLATE_NUM" style="padding-right: 15px"></Input>
			<div class="next" @click="selectPlate"></div>
		</FormItem>
		<FormItem label="车辆型号" prop="VEHICLE_MODEL">
			<Input v-model.trim="form.VEHICLE_MODEL" style="padding-right: 15px"></Input>
			<div class="next" @click="$refs.vehicle.open()"></div>
		</FormItem>
		<FormItem label="维修类型" prop="REPAIR_TYPE">
			<select-radio class="ivu-input select" v-model="form.REPAIR_TYPE" :options="typeList"></select-radio>
		</FormItem>
		<FormItem label="故障描述" prop="FAULT_DESC">
			<Input v-model.trim="form.FAULT_DESC"></Input>
		</FormItem>
	</Form>
	<div class="common-submit" @click="submit" v-show="!orderId"><a>提交预约</a></div>
	<mt-datetime-picker
			v-model="pickerVisible"
			type="datetime"
			ref="picker"
			:startDate="new Date()"
			@confirm="confirmTime"
			hour-format="{value}时"
			minute-format="{value}分">
	</mt-datetime-picker>

	<vehicle-model ref="vehicle" @ok="form.VEHICLE_MODEL= $event.MODEL_NAME;form.VEHICLE_ID= $event.MODEL_ID;form.TID = $event.TID;"></vehicle-model>

	<!--<my-car-list style="position: fixed;top: 0;left: 0" v-if="qixiutoken" v-show="showCarList" :isPage="false" :showButton="false"-->
		<!--@select="form.PLATE_NUM=$event.vehicleplatenumber;form.VIN_NO=$event.vin;showCarList=false"></my-car-list>-->

	<mt-popup
			v-model="showCarList"
			position="right"
			popup-transition="popup-fade">
		<car-list ref="carlist" style="width: 90vw" :show-button="false"
		          @select="form.PLATE_NUM=$event.vehiclePlateNumber;form.VIN_NO=$event.vin;showCarList=false"></car-list>
	</mt-popup>
</div>
</template>

<script>
import SelectRadio from '@/components/select-radio.vue'
import VehicleModel from '@/components/vehicle-model.vue'
import CarList from '@/views/car-record/car-list.vue'
export default {
	name: "reservation-detail",
	components: {SelectRadio, VehicleModel, CarList},
	data(){
		let rule= { required: true, message:'必填项不能为空'}
		return{
            pickerVisible:"",
            defaultYear:"",
            defaultMonth:"",
            defaultDay:"",
			TENANT_NAME:"",
			form: {
                ORDER_DATE:"",//预约时间 年月日
                ORDER_TIME:"",//时分
                appointmentTime:"",//拼接的时间
                MILEAGE:"",//里程
                ORDER_PERSON:"",//预约人
                TELPHONE:"",//联系人
                PLATE_NUM:"",//车牌号码
                VEHICLE_MODEL:"",//车型中文说明
                VEHICLE_ID:"",//车型ID
                REPAIR_TYPE:"10191001",//维修类型1019系列
                FAULT_DESC:"",//故障描述
                ORDER_ID:"",
                ORDER_TYPE: "10411001",
                VIN_NO:"",
				//无关页面还必须有写字段
                CUSTOMER_INFO:"",
                STATUS: "10421001",
                IS_ITEM_GROUP: "10411003",
                REPAIR_ITEM_DERATE_MONEY: 0,
                REPAIR_PART_DERATE_MONEY: 0,
                REPAIR_ITEM_MONEY: 0,
                REPAIR_PART_MONEY: 0,
                SUM_MONEY: 0,
				//新增字段
				TID:'',
			},
            roadliense:"",//道路许可证
			ruleValidate : {
				appointmentTime: [rule],
			},
			typeList:[],
			showCarList: false
		}
	},
	computed:{
		status(){
			return this.form.status? this.form.status.toString(): ''
		},
		qixiutoken(){
			return this.$store.state.user.qixiutoken
		},
		orderId(){
			return this.$route.query.id
		}
	},
	mounted(){
		if(this.orderId){
			this.getData(this.orderId);
		}else{
			this.TENANT_NAME = this.$route.query.name;
			this.roadliense = this.$route.query.license;
			this.confirmTime(new Date());
		}
		this.typeList =  this.$store.state.user.dict['1019'];

		this.form.TELPHONE= this.$store.state.user.userinfo.telphone
	},
    methods:{
        confirmTime(res){
            this.form.ORDER_DATE = res.getFullYear()+"-"+this.fillZero(res.getMonth()+1)+"-"+this.fillZero(res.getDate());
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
                if(res.data.success){
                    //下一步操作
	                this.$toast('提交成功')
	                this.$router.go(-1)
                }
            })
        },
        getData(id){
            this.axiosHxx.post('/operate/order/queryOrderDetail', {ORDER_ID:id}).then(res => {
                if(res.data.success){
                    //下一步操作;
                    let data = res.data.data[0];
                    this.pickerVisible = data.appointmentTime = data.ORDER_DATE.substr(0,10) + " " + data.ORDER_TIME;
                    for(let i in this.form){
                       this.form[i] = data[i] || "";
                    }
                    this.TENANT_NAME = data.TENANT_NAME || '';
                }
            })
        },
	    selectPlate(){
        	if(this.qixiutoken){
		        this.showCarList= true
	        }else{
		        this.$toast('请添加汽修平台账号')
		        this.$router.push({path: '/accredit-bind', query: { redirect: this.$route.fullPath }})
	        }
	    }
    },
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
