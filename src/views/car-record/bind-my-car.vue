<template>
  <div id="personUpload">
	  <div :class="['status', 'statu'+status]" v-show="statusText">{{statusText}}</div>
	  <div class="err-info" v-show="status==3">不通过原因：{{auditFailInfo}}</div>
	  <div class="upBlock drive">
		  <div class="title"><i></i>行驶证正面照片<i></i></div>

		  <div class="imgBlock">
			  <div :class="['img',{nobg: drivePic}]" @click="clickImg('upTravelLicense',drivePic)">
				  <img v-img v-show="drivePic" :src="drivePic">
			  </div>
			  <p @click.stop.prevent="$refs.upTravelLicense.clickBox()" v-show="editable">拍摄正面</p>
		  </div>
		  <upload operate='base64' @done="upTravelLicense" ref="upTravelLicense"></upload>
	  </div>

	<div class="upBlock id" v-if="isPerson" v-show="needOthers || idCard.id">
		<div class="title"><i></i>身份证正面照片<i></i></div>
		<p>若您上传了非本人的身份证, 您将无法绑定您名下的车辆</p>

		<div class="imgBlock" >
			<div :class="['img',{nobg: idPic}]" @click="clickImg('upIdCard', idPic)">
				<img v-img v-show="idPic" :src="idPic">
			</div>
			<p @click.stop.prevent="$refs.upIdCard.clickBox()" v-show="editable &&!hasId">拍摄正面</p>
		</div>
		<upload operate='base64' @done="upIdCard" ref="upIdCard"></upload>
	</div>

	  <div class="upBlock business" v-if="!isPerson" v-show="needOthers || business.id">
		  <div class="title"><i></i>营业执照正面照片<i></i></div>

		  <div class="imgBlock">
			  <div :class="['img',{nobg: businessPic}]" @click="clickImg('upBusiness', businessPic)">
				  <img v-img v-show="businessPic" :src="businessPic">
			  </div>
			  <p @click.stop.prevent="$refs.upBusiness.clickBox()" v-show="editable">拍摄正面</p>
		  </div>
		  <upload operate='base64' @done="upBusiness" ref="upBusiness"></upload>
	  </div>

	  <!--<div class="info" v-show="showDriveLicenseInfo">-->
	  <div class="info" v-show="travelLicense.id">
		  <div class="head">
			  <p>行驶证识别信息</p>
			  <span @click="showPopover('travelLicense')" v-show="editable">修改</span>
		  </div>
		  <ul>
			  <li>
				  <label>所有人</label>
				  <span>{{travelLicense.ownerName}}</span>
				  <p v-show="showChangeCar('ownerName')">{{showChangeCar('ownerName')}}</p>
			  </li>
			  <li>
				  <label>车牌号</label>
				  <span>{{travelLicense.vehiclePlateNumber}}</span>
				  <p v-show="showChangeCar('vehiclePlateNumber')">{{showChangeCar('vehiclePlateNumber')}}</p>
			  </li>
			  <li>
				  <label>车架号(VIN)</label>
				  <span>{{travelLicense.vin}}</span>
				  <p v-show="showChangeCar('vin')">{{showChangeCar('vin')}}</p>
			  </li>
			  <li>
				  <label>发证日期</label>
				  <span>{{travelLicense.issueDate}}</span>
				  <p v-show="showChangeCar('issueDate')">{{showChangeCar('issueDate')}}</p>
			  </li>
			  <li>
				  <label>发动机号</label>
				  <span>{{travelLicense.engineNo}}</span>
				  <p v-show="showChangeCar('engineNo')">{{showChangeCar('engineNo')}}</p>
			  </li>
			  <!--<li>-->
				  <!--<label>地址</label>-->
				  <!--<span>{{travelLicense.address}}</span>-->
				  <!--<p v-show="showChangeCar('address')">{{showChangeCar('address')}}</p>-->
			  <!--</li>-->
			  <!--<li>-->
				  <!--<label>车辆品牌</label>-->
				  <!--<span>{{travelLicense.brandModel}}</span>-->
				  <!--<p v-show="showChangeCar('brandModel')">{{showChangeCar('brandModel')}}</p>-->
			  <!--</li>-->
			  <!--<li>-->
				  <!--<label>注册日期</label>-->
				  <!--<span>{{travelLicense.registerDate}}</span>-->
				  <!--<p v-show="showChangeCar('registerDate')">{{showChangeCar('registerDate')}}</p>-->
			  <!--</li>-->
			  <!--<li>-->
				  <!--<label>使用性质</label>-->
				  <!--<span>{{travelLicense.useNature}}</span>-->
				  <!--<p v-show="showChangeCar('useNature')">{{showChangeCar('useNature')}}</p>-->
			  <!--</li>-->
			  <!--<li>-->
				  <!--<label>车辆类型</label>-->
				  <!--<span>{{travelLicense.vehicleType}}</span>-->
				  <!--<p v-show="showChangeCar('vehicleType')">{{showChangeCar('vehicleType')}}</p>-->
			  <!--</li>-->
		  </ul>
	  </div>

	  <!--<div class="info" v-show="showIDCardUpInfo">-->
	  <div class="info" v-show="idCard.creditId || idCard.id">
		  <div class="head">
			  <p>身份证正面识别信息</p>
			  <span @click="showPopover('idCard')" v-show="editable &&!hasId">修改</span>
		  </div>
		  <ul>
			  <li>
				  <label>姓名</label>
				  <span>{{idCard.ownerName}}</span>
				  <p v-show="showChangeId('ownerName')">{{showChangeId('ownerName')}}</p>
			  </li>
			  <li>
				  <label>身份证号</label>
				  <span>{{idCard.idCardNo}}</span>
				  <p v-show="showChangeId('idCardNo')">{{showChangeId('idCardNo')}}</p>
			  </li>
		  </ul>
	  </div>

	  <div class="info" v-show="business.businessId || business.id">
		  <div class="head">
			  <p>营业执照识别信息</p>
			  <span @click="showPopover('business')" v-show="editable">修改</span>
		  </div>
		  <ul>
			  <li>
				  <label>企业名称</label>
				  <span>{{business.corpName}}</span>
				  <p v-show="showChangeBus('corpName')">{{showChangeBus('corpName')}}</p>
			  </li>
			  <li>
				  <label>法定代表人</label>
				  <span>{{business.legalPerson}}</span>
				  <p v-show="showChangeBus('legalPerson')">{{showChangeBus('legalPerson')}}</p>
			  </li>
		  </ul>
	  </div>

	  <div class="upBlock">
		  <div class="title"><i></i>拍摄证件要求<i></i></div>
		  <div class="rule">
			  <p>拍摄时确保证件<span style="color: #fc0;">边框完整，字体清晰，亮度均匀</span></p>
			  <li>
				  <img src="/static/img/carOwner-centre/身份证_标准@3x.png">
				  <p>标准</p>
			  </li>
			  <li>
				  <img src="/static/img/carOwner-centre/身份证_边框缺失@3x.png">
				  <p>边框缺失</p>
			  </li>
			  <li>
				  <img src="/static/img/carOwner-centre/身份证_照片模糊@3x.png">
				  <p>照片模糊</p>
			  </li>
			  <li>
				  <img src="/static/img/carOwner-centre/身份证_闪光强烈@3x.png">
				  <p>闪光强烈</p>
			  </li>
		  </div>
	  </div>

	<div class="submit" @click="Bind" v-show="editable">提交绑定</div>

    <mt-popup v-model="popupShow" position="right" class="popup">
	    <Form :class="['common-form']" v-show="popType=='travelLicense'" :model="travelLicenseRevise"
	          :label-width="100" label-position="left" ref="travelLicense" :rules="travelLicenseReviseRule">
		    <FormItem label="所有人" prop="ownerName">
			    <Input v-model.trim="travelLicenseRevise.ownerName" placeholder="更改所有人"></Input>
		    </FormItem>
		    <FormItem label="车牌号" prop="vehiclePlateNumber">
			    <Input v-model.trim="travelLicenseReviseVehiclePlateNumber" placeholder="更改车牌号"></Input>
		    </FormItem>
		    <FormItem label="车架号(VIN)" prop="vin">
			    <Input v-model.trim="travelLicenseReviseVin" placeholder="更改车架号(VIN)"></Input>
		    </FormItem>
		    <FormItem label="发证日期" prop="issueDate">
			    <span class="ivu-input select" @click="showDate('issueDate')">{{travelLicenseRevise.issueDate}}</span>
			    <!--<Input v-model.trim="travelLicenseRevise.issueDate" @on-focus="showDate('issueDate')"></Input>-->
		    </FormItem>
		    <FormItem label="发动机号" prop="engineNo">
			    <Input v-model.trim="travelLicenseRevise.engineNo"></Input>
		    </FormItem>
		    <!--<FormItem label="地址" prop="address">-->
			    <!--<Input v-model.trim="travelLicenseRevise.address"></Input>-->
		    <!--</FormItem>-->
		    <!--<FormItem label="车辆品牌" prop="brandModel">-->
			    <!--<Input v-model.trim="travelLicenseRevise.brandModel"></Input>-->
		    <!--</FormItem>-->
		    <!--<FormItem label="注册日期" prop="registerDate">-->
			    <!--<span class="ivu-input select" @click="showDate('registerDate')">{{travelLicenseRevise.registerDate}}</span>-->
		    <!--</FormItem>-->
		    <!--<FormItem label="使用性质" prop="useNature">-->
			    <!--<Input v-model.trim="travelLicenseRevise.useNature"></Input>-->
		    <!--</FormItem>-->
		    <!--<FormItem label="车辆类型" prop="vehicleType">-->
			    <!--<Input v-model.trim="travelLicenseRevise.vehicleType"></Input>-->
		    <!--</FormItem>-->
	    </Form>

	    <Form :class="['common-form']" v-show="popType=='idCard'" :model="idCardRevise"
	          :label-width="100" label-position="left" ref="idCard" :rules="idCardReviseRule">
		    <FormItem label="姓名" prop="ownerName">
			    <Input v-model.trim="idCardRevise.ownerName" placeholder="更改姓名"></Input>
		    </FormItem>
		    <FormItem label="身份证号码" prop="idCardNo">
			    <Input v-model.trim="idCardRevise.idCardNo" placeholder="更改身份证号码"></Input>
		    </FormItem>
	    </Form>

	    <Form :class="['common-form']" v-show="popType=='business'" :model="businessRevise"
	          :label-width="100" label-position="left" ref="business" :rules="businessReviseRule">
		    <FormItem label="企业名称" prop="corpName">
			    <Input v-model.trim="businessRevise.corpName" placeholder="更改企业名称"></Input>
		    </FormItem>
		    <FormItem label="企业法人" prop="legalPerson">
			    <Input v-model.trim="businessRevise.legalPerson" placeholder="更改企业法人"></Input>
		    </FormItem>
	    </Form>

          <div class="button-block">
            <mt-button @click="modifyCancel" type="danger" size="large"
                       class="button">取消</mt-button>
            <mt-button @click="modify" type="primary" size="large"
                       class="button">确定</mt-button>
          </div>
    </mt-popup>

	  <mt-datetime-picker
			  v-model="dateVal"
			  ref="picker"
			  type="date"
			  :startDate="new Date('1990/01/01')"
			  :endDate="new Date('2050/01/01')"
			  year-format="{value} 年"
			  month-format="{value} 月"
			  date-format="{value} 日"
			  @confirm="dateSelect">
	  </mt-datetime-picker>
  </div>
</template>

<script>
import { Field, Button, Toast, MessageBox, Popup } from 'mint-ui'
import Upload from '@/page/components/compress-upload.vue'
import {deepClone, formatDate, reg} from '@/util.js'
let travelLicense= {
	ownerName: '',
	vehiclePlateNumber: '',
	vin: '',
	engineNo: '',
	address: '',
	brandModel: '',
	issueDate: '',
	registerDate: '',
	useNature: '',
	vehicleType: '',
}
let idCard={
	ownerName: '',
	idCardNo: '',
}
let business={
	corpName: '',
	legalPerson: ''
}
export default{
    name: "personUpload",
    components: {Upload},
    data(){
	    let rule= { required: true, message:'必填项不能为空'}
	    let travelLicenseReviseRule={}, idCardReviseRule={}, businessReviseRule={}
	    for(let key in travelLicense){
		    travelLicenseReviseRule[key]= [rule]
	    }
	    for(let key in idCard){
		    idCardReviseRule[key]= [rule]
	    }
	    for(let key in business){
		    businessReviseRule[key]= [rule]
	    }
	    return {
		    status: '4',
		    auditFailInfo: '',
	        popType: 'travelLicense',
		    popupShow: false,

		    travelLicense: {},
		    travelLicenseAfter: {},
		    travelLicenseRevise: deepClone(travelLicense),
		    idCard: {},
		    idCardAfter: {},
		    idCardRevise: deepClone(idCard),
		    business: {},
		    businessAfter: {},
		    businessRevise: deepClone(business),

		    travelLicenseReviseRule: {
			    ownerName: [rule],
			    issueDate: [rule],
			    engineNo: [rule],
			    vehiclePlateNumber:[rule, {
				    validator: (rules, value, callback) => {
					    if (!reg.vehicle.test(value)) {
						    callback(new Error('车牌格式不正确'));
					    } else {
						    callback();
					    }
				    }
			    }],
			    vin:[rule, {
				    validator: (rules, value, callback) => {
					    if (!reg.vin.test(value)) {
						    callback(new Error('请输入17位VIN'));
					    } else {
						    callback();
					    }
				    }
			    }],
		    },
		    idCardReviseRule: {
			    ownerName: [rule],
			    idCardNo: [rule, {
				    validator: (rules, value, callback) => {
					    if (!reg.idcard.test(value)) {
						    callback(new Error('身份证格式不正确'));
					    } else {
						    callback();
					    }
				    }
			    }],
		    },
		    businessReviseRule: businessReviseRule,

		    drivePic:'',
		    idPic:'',
		    businessPic:'',

		    travelLicenseChange: false,
		    idCardChange: false,
		    businessChange: false,

		    needOthers: false,
		    hasId: false,

		    dateVal: new Date(),
		    dateField: ''
		}
    },
	computed:{
    	isPerson(){
    		return this.$route.path=='/bind-my-car'
	    },
		editable(){
			return this.status!='1' && this.status!='2'
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
					text= '新增';break
				}
			}
			return text
		},
		showChangeCar(){
    		return (field)=>{
    			return this.travelLicenseAfter[field]!= this.travelLicense[field]? this.travelLicenseAfter[field]: false
		    }
		},
		showChangeId(){
    		return (field)=>{
    			return this.idCardAfter[field]!= this.idCard[field]? this.idCardAfter[field]: false
		    }
		},
		showChangeBus(){
    		return (field)=>{
    			return this.businessAfter[field]!= this.business[field]? this.businessAfter[field]: false
		    }
		},
		pageId(){
    		return this.$route.query&& this.$route.query.id? this.$route.query.id: null
		},
		travelLicenseReviseVehiclePlateNumber:{
			get(){
				return this.travelLicenseRevise.vehiclePlateNumber;
			},
			set(val){
				this.travelLicenseRevise.vehiclePlateNumber = val.toUpperCase();
			}
		},
		travelLicenseReviseVin:{
			get(){
				return this.travelLicenseRevise.vin;
			},
			set(val){
				this.travelLicenseRevise.vin = val.toUpperCase();
			}
		}
	},
	mounted(){
		if(this.isPerson){
			this.getId()
		}

		if(this.pageId){
			this.getInfo(this.pageId)
		}
	},
	methods: {
    	getInfo(id){
		    this.axios.get('/scan/auditDetail/'+ id).then(res=>{
			    if(res.data.code==='0'){
			    	let item= res.data.item
			    	this.status= item.status.toString()
			    	this.auditFailInfo= item.auditFailInfo

					this.travelLicense= item.travelLicense
					this.travelLicenseRevise= item.travelLicenseRevise

				    this.travelLicense.issueDate= item.travelLicense.issueDateStr
				    this.travelLicense.registerDate= item.travelLicense.registerDateStr
				    this.travelLicenseRevise.issueDate= item.travelLicenseRevise.issueDateStr
				    this.travelLicenseRevise.registerDate= item.travelLicenseRevise.registerDateStr
				    this.travelLicenseAfter= deepClone(this.travelLicenseRevise)

				    this.travelLicenseChange= true
				    this.drivePic= item.travelLicense.frontImageUrl
				    if(item.ownerType==1 && item.idCard){
					    this.idCard= item.idCard
					    this.idCardRevise= item.idCardRevise
					    this.idPic=  item.idCard.frontImageUrl

					    this.idCardChange= true
					    this.idCardAfter= deepClone(this.idCardRevise)
				    }
				    if(item.ownerType==2 && item.business){
					    this.business= item.business
					    this.businessRevise= item.businessRevise
					    this.businessPic= item.business.frontImageUrl

					    this.businessChange= true
					    this.businessAfter= deepClone(this.businessRevise)
				    }
			    }
		    })
	    },
    	getId(){
			this.axios.get('/scan/getCard').then(res=>{
				if(res.data.code==='0' && res.data.item){
					this.hasId= true
					let item= res.data.item
					this.idCard= item
					this.idCard.id= this.idCard.creditId= this.idCardRevise.id= this.idCardRevise.creditId= item.creditId
					this.idCardRevise.ownerName= item.reviseOwnerName
					this.idCardRevise.idCardNo= item.reviseIdCardNo

					this.idCardAfter.ownerName= item.reviseOwnerName
					this.idCardAfter.idCardNo= item.reviseIdCardNo
					this.idPic=item.frontImageUrl
				}
			})
	    },
		clickImg(ref, img){
    		if(!img){
			    this.$refs[ref].clickBox()
		    }
		},
		upTravelLicense(base64){
			this.identifyDriveLicense(base64)
		},

		upIdCard(base64){
			// this.idPic= base64
			this.identifyCard(base64, 1)
		},

		upBusiness(base64){
			// this.businessPic= base64
			this.identifyCard(base64, 3)
		},

		identifyCard(base64, type){
			this.axios({
			url: '/scan/newUpload',
			method: 'post',
			data: {
				"accuracy": "normal",
				"detect_direction": true,
				"detect_risk": "true",
				"id_card_side": "front",
				"image": base64.split(',')[1],
				"property": type
			}}).then(res => {
				if(res.data.code==='0'){
					let item= res.data.item
					switch (type){
						case 1:{
							this.idPic= base64
							item.id= item.creditId
							this.idCard= item
							this.idCardRevise= deepClone(item)
							break
						}
						case 3:{
							this.businessPic= base64
							item.id= item.businessId
							this.business= item
							this.businessRevise= deepClone(item)
							break
						}
					}
				} else {
					Toast(res.data.status)
				}
			})
		},

		identifyDriveLicense(base64){
			this.axios({
				url: '/scan/newDriverLicense',
				method: 'post',
				data: {
				accuracy: '',
				detect_direction: true,
				image: base64.split(',')[1],
			}}).then(res=>{
				if(res.data.code==='0'){
					this.drivePic= base64
					this.travelLicense= res.data.item
					this.travelLicenseRevise= deepClone(res.data.item)
				} else {
					Toast(res.data.status)
				}
			})
		},

		showPopover(type){
			MessageBox.confirm('修改后需要审核通过才能查看汽车档案').then(action => {
				this.popType= type
				this.popupShow= true


			})
		},
		showDate(field){
    		let data= this.travelLicenseRevise[field]
			this.dateField= field
    		if(data) this.dateVal= new Date(this.travelLicenseRevise[field].replace(/-/g,'/'))
			else this.dateVal= new Date()
			this.$refs.picker.open();
		},
		dateSelect(val){
			console.log(val)
			this.travelLicenseRevise[this.dateField]= formatDate(val, 'yyyy-MM-dd')
		},
		modifyCancel(){
			switch (this.popType){
				case 'travelLicense':{
					if(this.travelLicenseAfter.id)
						this.travelLicenseRevise= deepClone(this.travelLicenseAfter)
					else this.travelLicenseRevise= deepClone(this.travelLicense)
					break
				}
				case 'idCard':{
					if(this.idCardAfter.id || this.idCardAfter.creditId)
						this.idCardRevise= deepClone(this.idCardAfter)
					else this.idCardRevise= deepClone(this.idCard)
					break
				}
				case 'business':{
					if(this.businessAfter.id || this.businessAfter.businessId)
						this.businessRevise= deepClone(this.businessAfter)
					else this.businessRevise= deepClone(this.business)
					break
				}
			}
			this.popupShow= false
		},
		modify(){
			let url= '', data= null
			this.$refs[this.popType].validate((valid) => {
				if(valid){
					switch (this.popType){
						case 'travelLicense':{
							url= '/travellicense/update'
							data= this.travelLicenseRevise
							break
						}
						case 'idCard':{
							url= '/idcard/update'
							data= this.idCardRevise
							if(this.idCardRevise.creditId) data.id= this.idCardRevise.creditId
							break
						}
						case 'business':{
							url= '/businesslicense/update'
							data= this.businessRevise
							if(this.businessRevise.businessId) data.id= this.businessRevise.businessId
							break
						}
					}
				this.axios.post(url, data).then(res=>{
				if(res.data.code==='0'){
					Toast('修改成功')
					this.popupShow= false

					switch (this.popType){
						case 'travelLicense':{
							this.travelLicenseChange= true

							this.travelLicenseAfter = deepClone(this.travelLicenseRevise)
							break
						}
						case 'idCard':{
							this.idCardChange= true

							this.idCardAfter = deepClone(this.idCardRevise)
							break
						}
						case 'business':{
							this.businessChange= true

							this.businessAfter = deepClone(this.businessRevise)
							break
						}
					}
				}
				})
			}})
		},

		Bind(){
			if(!this.travelLicense.id) return Toast('请上传行驶证')
			if(!this.travelLicenseChange){
				for(let key in this.travelLicense){
					let val= this.travelLicense[key]
					switch (key){
						case 'vehiclePlateNumber': {
							if(!reg.vehicle.test(val)){
								return Toast('车牌号格式不正确，请修改')
							}
							break
						}
						case 'vin': {
							if(!reg.vin.test(val)){
								return Toast('vin格式不正确，请修改')
							}
							break
						}
						case 'ownerName':
						case 'issueDate':
						case 'engineNo':{
							if(!val) return Toast('行驶证有空值，请修改')
						}
					}
				}
			}
			let data={
				licenseId: this.travelLicense.id,
			}
			if(this.isPerson){
				data.ownerType= 1
				if(this.needOthers){
					if(!this.idCard.creditId && !this.idCard.id){
						return Toast('请上传身份证正面')
					}
					if(!this.idCardChange){
						if(!this.idCard.ownerName || !this.idCard.idCardNo) return Toast('身份证有空值，请修改')
						if(!reg.idcard.test(this.idCard.idCardNo)){
							return Toast('身份证格式不正确，请修改')
						}
					}
				}
				if(this.idCard.creditId|| this.idCard.id) data.idCardId= this.idCard.creditId|| this.idCard.id
			}else{
				data.ownerType= 2
				if(this.needOthers){
					if(!this.business.id && !this.business.businessId){
						return Toast('请上传营业执照')
					}else{
						data.businessId= this.business.id
					}
					if(!this.businessChange){
						if(!this.business.corpName || !this.business.legalPerson) return Toast('营业执照有空值，请修改')
					}
				}
				if(this.business.businessId|| this.business.id) data.businessId= this.business.businessId|| this.business.id
			}
			if(this.pageId) data.vehicleId= this.pageId





			this.axios({
				url: '/scan/newBind',
				method: 'post',
				data: data}).then(res=>{
				if(res.data.code==='0'){
					Toast('绑定成功')
					this.$router.go(-1)
				}else if(res.data.code==='10002'){
					if(this.isPerson){
						Toast('此行驶证已被绑定，请上传身份证')
						this.needOthers= true
					}else{
						Toast('此行驶证已被绑定，请上传营业执照')
						this.needOthers= true
					}
					document.body.scrollTop = document.documentElement.scrollTop = 0
				}
			})
		},
	}
}
</script>

<style lang='less' scoped>
#personUpload{
	padding-bottom: 40px;
	background-color: #f8f8f8;
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
	.err-info{
		min-height: 40px;
		line-height: 20px;
		padding: 10px 15px;
		color: #ed4014;
		font-size: 14px;
		border-bottom: 1px solid #E5E5E5
	}
	.drive .img{
		background: #f2f7fd url("/static/img/carOwner-centre/行驶证@3x.png") no-repeat center center;
	}
	.id .img{
		background: #f2f7fd url("/static/img/carOwner-centre/身份证_正面@3x.png") no-repeat center center;
	}
	.business .img{
		background: #f2f7fd url("/static/img/carOwner-centre/营业执照@3x.png") no-repeat center center;
	}
	.upBlock{
		padding: 20px 15px 15px;
		margin-bottom: 15px;
		background-color: white;
		.title{
			text-align: center;
			color: #666666;
			i{
				display: inline-block;
				width: 30px;
				height: 2px;
				background-color: #f1f2f4;
				padding: 0 5px;
				margin: 0 10px;
				position: relative;
				vertical-align: middle;
				&:first-child::after, &:last-child::before{
					content: '';
					width: 4px;
					height: 4px;
					display: block;
					background-color: #d1d6dc;
					position: absolute;
					top: -1px;
					border-radius: 100%;
					left: 0;
				}
				&:first-child::after{
					left: auto;
					right: 0;
				}
			}
		}
		>p{
			font-size: 13px;
		}
		.imgBlock{
			width: 220px;
			margin: 25px auto;
			overflow: hidden;
			border-radius: 5px;
			.img{
				height: 120px;
				text-align: center;
				background-size: 100px auto;
				position: relative;
				img{
					width: auto;
					height: auto;
					max-width: 100%;
					max-height: 100%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
			.img.nobg{
				background: #f2f7fd;
			}
			p{
				font-size: 15px;
				line-height: 30px;
				background-color: #5795FC;
				text-align: center;
				color: white;
			}
		}
		.rule{
			margin-top: 25px;
			overflow: hidden;
			p{
				color: #999999;
			}
			li{
				width: 50%;
				float: left;
				text-align: center;
				margin-top: 10px;
				img{
					width: 80%;
				}
				p{

				}
			}
		}
	}
	.info{
		background-color: white;
		.head{
			background: #5795FC;
			font-size: 16px;
			position: relative;
			p{
				font-size: 16px;
				line-height: 35px;
				color: white;
				margin-left: 15px;
			}
			span{
				border: 1px solid white;
				position: absolute;
				right: 15px;
				top: 50%;
				background: rgba(0, 0, 0, 0.2);
				transform: translateY(-50%);
				color: white;
				padding: 1px 15px;
				border-radius: 3px;
			}
		}
		ul{
			padding-left: 15px;
			font-size: 15px;
			li{
				min-height: 41px;
				overflow: hidden;
				border-bottom: 1px solid #c8c7cc;
				position: relative;
				label{
					display: inline-block;
					width: 100px;
					line-height: 40px;
					position: absolute;
					left: 0;
					top: 0;
				}
				span{
					display: inline-block;
					width: 100%;
					padding-left: 110px;
					/*white-space: nowrap;*/
					/*overflow: hidden;*/
					text-overflow: ellipsis;
					line-height: 20px;
					height: 20px;
					margin-top: 10px;
				}
				p{
					height: auto;
					padding-left: 110px;
					position: relative;
					line-height: 20px;
					color: orange;
					font-size: 15px;
					margin-bottom: 5px;
					&:before{
						content: '修改后';
						position: absolute;
						left: 0;
						line-height: 20px;
						height: 20px;
						color: orange;
						margin-bottom: 5px;
					}
				}
			}
		}
	}
	.submit{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: white;
		background-color: #26a2ff;
		font-size: 18px;
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.popup{
		width: 100%;
		height: 100vh;
		/*position: relative;*/
		/*padding-bottom: 40px;*/
		overflow: auto;
		.button-block{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			overflow: hidden;
			.button{
				float: left;
				width: 50%;
				border-radius: 0;
			}
		}
	}
}
</style>
