<template>
<div class="reservation">
	<!--<div :class="['status', 'statu'+status]">{{$store.state.user.unit[form.STATUS]|| '新建'}}</div>-->
	<Form :class="['common-form']" :model="form" :rules="ruleValidate"
	      :label-width="80" label-position="left" ref="form">
		<!--<FormItem label="门店名称">-->
			<!--<span class="line">{{TENANT_NAME}}</span>-->
		<!--</FormItem>-->
		<FormItem label="预约时间" prop="dateTime">
			<span class="ivu-input select" readonly @click="dateTimeOpen">{{form.dateTime|| '请选择来店时间'}}</span>
		</FormItem>
		<FormItem label="预约服务" prop="REPAIR_TYPE">
			<ul class="service-type">
				<li v-for="(item , key) in typeList" :key="key" :class="{on: item.checked}"
				@click="checkType(key)">{{item.label}}</li>
			</ul>
		</FormItem>
		<FormItem label="车牌号码" prop="plateNum">
			<Input v-model.trim="form.plateNum" placeholder="请选择或填写" :readonly="!!fixPlate" style="padding-right: 15px"></Input>
			<div class="next" v-show="!fixPlate" @click="showCarList= true"></div>
		</FormItem>
		<FormItem label="车型车系" prop="vehicleModel">
			<!--<Input v-model.trim="form.vehicleModel" placeholder="请选择" :readonly="true" style="padding-right: 15px"></Input>-->
			<!--<div class="next" @click="$refs.vehicle.open()"></div>-->
			<span class="ivu-input select" @click="$refs.vehicle.open()">{{form.vehicleModel|| '请选择'}}</span>
		</FormItem>
		<!--<FormItem label="当前里程" prop="MILEAGE">-->
			<!--<Input v-model.trim="form.MILEAGE" type="number" style="padding-right: 30px"></Input>-->
			<!--<p style="position: absolute;top: 50%;right: 5px;transform: translateY(-50%);width: auto;margin: 0">公里</p>-->
		<!--</FormItem>-->
		<FormItem label="联系电话" prop="TELPHONE">
			<Input v-model.trim="form.TELPHONE" type="tel" :maxlength="11"></Input>
		</FormItem>
		<FormItem label="预约人" prop="ORDER_PERSON">
			<Input v-model.trim="form.ORDER_PERSON" ></Input>
		</FormItem>


		<FormItem label="使用机油" v-show="oil.name">
			<span class="text">{{oil.name}}</span>
		</FormItem>
		<FormItem label="机油用量" v-show="oil.total">
			<span class="text">{{oil.total}}升</span>
		</FormItem>
		<p style="color: red;" v-show="oil.total_fee">使用量超过5升，需额外购买{{oil.number}}升，需支付{{oil.total_fee}}元</p>
		<!--<FormItem label="维修类型" prop="REPAIR_TYPE">-->
			<!--<select-radio class="ivu-input select" v-model="form.REPAIR_TYPE" :options="typeList"></select-radio>-->
		<!--</FormItem>-->
		<!--<FormItem label="故障描述" prop="FAULT_DESC">-->
			<!--<Input v-model.trim="form.FAULT_DESC"></Input>-->
		<!--</FormItem>-->
	</Form>
	<!--<div class="common-submit" @click="submit" v-show="!orderId"><a>提交预约</a></div>-->

	<div class="common-submit">
		<submit-button :rules="ruleValidate" :datas="form" :feedback="false" @click="submit"
		>{{oil.total_fee? '支付并预约': '提交预约'}}</submit-button>
	</div>
	<!--<mt-datetime-picker-->
			<!--v-model="pickerVisible"-->
			<!--type="datetime"-->
			<!--ref="picker"-->
			<!--:startDate="new Date()"-->
			<!--@confirm="confirmTime"-->
			<!--hour-format="{value}时"-->
			<!--minute-format="{value}分">-->
	<!--</mt-datetime-picker>-->

	<vehicle-model ref="vehicle" @ok="form.vehicleModel= $event.MODEL_NAME;form.VEHICLE_ID= $event.MODEL_ID;form.tid = $event.TID;"></vehicle-model>

	<!--<my-car-list style="position: fixed;top: 0;left: 0" v-if="qixiutoken" v-show="showCarList" :isPage="false" :showButton="false"-->
		<!--@select="form.PLATE_NUM=$event.vehicleplatenumber;form.VIN_NO=$event.vin;showCarList=false"></my-car-list>-->

	<mt-popup
			v-model="showCarList"
			position="right"
			popup-transition="popup-fade">
		<car-list ref="carlist" style="width: 90vw" :show-button="false"
		          @select="form.plateNum=$event.vehiclePlateNumber;form.VIN_NO=$event.vin;showCarList=false"></car-list>
	</mt-popup>

	<select-picker :slots="datetimeSlot" @change="changeDatetime" ref="picker" @ok="sureDatetime"></select-picker>
</div>
</template>

<script>
// import SelectRadio from '@/components/select-radio.vue'
import VehicleModel from '@/components/vehicle-model.vue'
import CarList from '@/views/car-record/car-list.vue'
import SelectPicker from '@/components/select-picker.vue'
import SubmitButton from '@/components/submit-button.vue'
import { deepClone, reg, wxPay} from '@/util'
export default {
	name: "reservation",
	components: {
		// SelectRadio,
		VehicleModel, CarList, SelectPicker, SubmitButton},
	data(){
		let rule= { required: true, message:'必填项不能为空'}
		return{
			form: {
				dateTime: '',
				REPAIR_TYPE: '',
				plateNum: '',
				vehicleModel: '',
				MILEAGE: '',
				TELPHONE: '',
				ORDER_PERSON: '',
				ORDER_DATE: '',
				ORDER_TIME: '',
				vin: '',
				tid: '',
			},
			ruleValidate : {
				dateTime: [rule],
				REPAIR_TYPE: [rule],
				plateNum: [rule],
				vehicleModel: [rule],
				// MILEAGE: [rule],
				TELPHONE: [rule],
			},
			typeList:[],
			showCarList: false,
			dateTime: null,
			couponInfo: {},
			oil: {},
		}
	},
	computed:{
		// status(){
		// 	return this.form.status? this.form.status.toString(): ''
		// },
		// qixiutoken(){
		// 	return this.$store.state.user.qixiutoken
		// },
		// orderId(){
		// 	return this.$route.query.id
		// },
		coupon(){
			return this.$route.query.coupon
		},
		serverType(){
			let type= this.couponInfo.db_codeId
			return type? type.toString(): ''
		},
		fixPlate(){
			return this.couponInfo.license
		},
		startDate(){
			let now= new Date(), start= null
			if(now.getHours()<12){
				start= new Date(now.setDate(now.getDate()+1));
			}else{
				start= new Date(now.setDate(now.getDate()+2));
			}
			return start
		},
		plateNum(){
			return this.form.plateNum
		},
		tid(){
			return this.form.tid
		},
		isKeep(){
			let type= this.form.REPAIR_TYPE
			return type? type== '10191001': false
		},
		datetimeSlot(){
			let startYear= this.startDate.getFullYear(),years= [startYear+'年', startYear+1+'年'], hours= []
			for(let i =9; i<18; i++){
				hours.push(i+ '时')
			}
			return [
				{
					flex: 1.3,
					values: years,
					className: 'slot1',
					textAlign: 'center'
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					flex: 1,
					values: this.months(this.startDate),
					className: 'slot3',
					textAlign: 'center'
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					flex: 1,
					values: this.days(this.startDate),
					className: 'slot3',
					textAlign: 'center'
				}, {
					divider: true,
					content: ' ',
					className: 'slot2'
				}, {
					flex: 1,
					values: hours,
					className: 'slot3',
					textAlign: 'center'
				}, {
					divider: true,
					content: ':',
					className: 'slot2'
				},{
					flex: 1,
					values: ['00分', '30分'],
					className: 'slot3',
					textAlign: 'center'
				},
			]
		}
	},
	watch:{
		plateNum(val){
			this.axiosHxx.post('/operate/appoint/binding', {
				plateNum: val
			},{keepLoading: true}).then(res => {
				if(res.data.success){
					let vin= res.data.data.vin
					this.form.vin= vin
					if(vin){
						this.axiosHxx.post('/operate/appoint/matchVehicle', {
							vin
						}, {keepLoading: false}).then(res2 => {
							if(res2.data.success){
								this.form.vehicleModel= res2.data.data.vehicleModel
								this.form.tid= res2.data.data.tid
							}
						})
					}else{
						this.$messagebox({title: '您未绑定车辆：'+val ,message: '是否前往绑定', closeOnClickModal: false,
							confirmButtonText: '去绑定', cancelButtonText: '取消', showCancelButton: true}).then(action => {
							// console.log('action', action)
							switch (action){
								case 'confirm':{
									this.$router.push('/bind-car?back=true')
									break
								}
								case 'cancel':{}
							}
						})
					}
				}
			})

			// if(reg.vehicle.test(val) && !this.form.vehicleModel){
			// 	this.axiosHxx.post('/operate/appoint/matchVehicle', {
			// 		license: this.$route.query.license,
			// 		plateNum: val
			// 	}).then(res => {
			// 		if(res.data.success){
			// 			this.form.vehicleModel= res.data.data.vehicleModel || ''
			// 			this.form.vin = res.data.data.vin || ''
			// 		}
			// 	})
			// }
		},
		isKeep(bol){
			if(bol && this.tid){
				this.getOil(this.tid)
			}
		},
		tid(val){
			if(this.isKeep){
				this.getOil(val)
			}
		}
	},
	mounted(){
		this.getCoupon()
		this.form.TELPHONE= this.$store.state.user.userinfo.telphone
	},
    methods:{
	    getOil(val){
		    this.axiosHxx.post('/operate/appoint/getOil', {
			    tid: val
		    }).then(res => {
			    if(res.data.success){
				    this.oil= res.data.data
			    }
		    })
	    },
		dateTimeOpen(){
			this.$refs.picker.open()
		},
		getDaysNum(date){
			let tdate= new Date(date)
			return new Date(tdate.getFullYear(), tdate.getMonth()+1, 0).getDate()
		},
	    months(date){
		    let startYear= this.startDate.getFullYear(),
			    startMonth= this.startDate.getMonth(),
			    year= new Date(date).getFullYear(),
			    months= []
		    for(let i=(startYear==year?startMonth: 0); i<12; i++){
			    months.push(i+1+ '月')
		    }
		    return months
	    },
	    days(date){
		    let startYear= this.startDate.getFullYear(),
			    startMonth= this.startDate.getMonth(),
			    startDay= this.startDate.getDate(),
			    year= new Date(date).getFullYear(),
			    month= new Date(date).getMonth(),
			    sameDay= startYear==year && startMonth== month,
			    dayNum= this.getDaysNum(date),
			    days= []
		    // coxnsole.log('sameDay, startDay, dayNum, date', sameDay, startDay, dayNum, date)
		    for(let i=(sameDay?startDay: 1); i<=dayNum; i++){
			    days.push(i+ '日')
		    }
		    return days
	    },
	    changeDatetime(inst, valArr){
			let year= valArr[0].split('年')[0], yearmonth= `${year}/${valArr[1].split('月')[0]}/1`,
				months= this.months(year), days= this.days(yearmonth)
			// console.log('days', days)
		    if(!this.dateTime){
			    this.dateTime= deepClone(valArr)
		    } else{
				if(this.dateTime[0]==valArr[0]){
					if(this.dateTime[1]==valArr[1]){

					}else{
						// console.log(this.days(yearmonth))
						inst.setSlotValues(2, days)
						inst.setSlotValue(2, days[0])
					}
				}else{
					// console.log(this.months(year))
					inst.setSlotValues(1, months)
					inst.setSlotValues(2, days)
					inst.setSlotValue(1, months[0])
					inst.setSlotValue(2, days[0])
				}
		    }
		    this.dateTime= deepClone(valArr)
	    },
	    sureDatetime(val){
			console.log(val)
		    if(val){
			    this.form.ORDER_DATE= `${this.zeroize(val[0])}-${this.zeroize(val[1])}-${this.zeroize(val[2])}`
			    this.form.ORDER_TIME= `${this.zeroize(val[3])}:${this.zeroize(val[4])}`
			    this.form.dateTime= val.join('')
		    }else{
			    this.form.ORDER_DATE= ''
			    this.form.ORDER_TIME= ''
			    this.form.dateTime= ''
		    }
	    },
	    zeroize(val){
			let res= val.substring(0, val.length-1)
			return res.length<2? ('0'+res): res
	    },
	    getCoupon(){
		    this.axiosHxx.post('/operate/coupon/returncouponmsg', {
			    code: this.coupon,
			    BUSINESS_TYPE: 1
		    }).then(res => {
			    if(res.data.success){
				    this.couponInfo= res.data.data
				    this.getType()
				    if(this.fixPlate){
					    this.form.plateNum= this.fixPlate
				    }
			    }
		    })
	    },
		getType(){
			let list= this.$store.state.user.unit
			for(let key in list){
				if(key.substring(0,4)=='1019'){
					if(this.couponInfo.db_codeId=='-1'){
						this.typeList.push({
							value: key,
							label: list[key],
							checked: false
						})
					}else if(this.couponInfo.db_codeId== key){
						this.typeList.push({
							value: key,
							label: list[key],
							checked: true
						})
						this.form.REPAIR_TYPE= key
					}
				}
			}
		},
	    checkType(index){
		    if(this.serverType=='-1'){
			    // this.typeList[index].checked= !this.typeList[index].checked
			    // let arr= []
			    // for(let i in this.typeList){
				 //    if(this.typeList[i].checked){
					//     arr.push(this.typeList[i].value)
				 //    }
				 //    this.form.REPAIR_TYPE= arr.join(',')
			    // }

			    for(let i in this.typeList){
				    this.typeList[i].checked= false
			    }
			    this.typeList[index].checked= true
			    this.form.REPAIR_TYPE= this.typeList[index].value
		    }
	    },
        submit(){
	        this.$messagebox.confirm('确定预约此次服务?').then(action => {
		        // console.log('action', action)
		        this.axiosHxx.post('/operate/appoint/saveSlip', {
		        	data: {
				        ORDER_DATE: this.form.ORDER_DATE,
				        ORDER_TIME: this.form.ORDER_TIME,
				        REPAIR_TYPE: this.form.REPAIR_TYPE,
				        TELPHONE: this.form.TELPHONE,
				        ORDER_PERSON: this.form.ORDER_PERSON,
			        },
			        plateNum: this.form.plateNum,
			        vehicleModel: this.form.vehicleModel,
			        vin: this.form.vin,
			        tid: this.form.tid,
			        license: this.$route.query.license,
			        couponid: this.couponInfo.id
		        }).then(res => {
			        if(res.data.success){
				        if(res.data.data.repairSuccess){
					        this.$toast('提交成功')
					        this.$router.replace('/my-reservation')
				        }else{
							this.pay(res.data.data.out_trade_no)
				        }
			        }
		        })
	        });

        },
	    pay(orderNo){
		    this.axiosHxx.post('/operate/appoint/payOrder', {
			    orderNo,
			    deviceType: 2,
			    couponId: this.couponInfo.id
		    }).then(res => {
			    if(res.data.success){
				    let data= res.data.data
				    wxPay(data, (res2)=>{
				    	if(res2=='ok'){
						    this.$toast('支付成功')
					    }
					    this.$router.replace('/my-reservation')
				    })
			    }
		    })
	    },
    },
}
</script>

<style scoped lang="less">
.reservation{
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
	.service-type{
		li{
			color: #333333;
			line-height: 22px;
			padding: 0 15px;
			display: inline-block;
			margin: 3px 0 5px 5px;
			float: left;
			border: 1px solid #EEEEEE;
			border-radius: 15px;
			&.on{
				color: #FF9738;
				border-color: #FF9738;
			}
		}
	}
}
</style>
