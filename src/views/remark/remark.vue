<template>
<div class="remark">
	<div class="content">
		<div style="float:left;padding-right:6px;">
			<img class="compImg" :src="company.pic|| showImg">
		</div>
		<div class="row" style="float:left;width: calc((100% - 80px))">
			<p>{{company.name}}</p>
			<span>
				<!--<i class="fa fa-map-marker"></i>-->
				门店地址：{{company.addr}}</span>
			 <div style="float:right;padding-top:8px;">0.3km</div>
		</div>
		<!---->
		<div style="clear: both;"></div>
		<div class="row" style="margin-bottom: 0;">
			<!--<p v-show="carList.length && !repairId">选择车辆</p>-->
			<router-link to="/bind-car?back=true" class="add-car" v-show="!carList.length">请先添加爱车</router-link>
			<Form :class="['common-form']" v-show="carList.length"
			      :label-width="80" label-position="left" ref="form" style="padding-left:0px;">
				<FormItem label="车牌号" class="noborder">
					<span class="ivu-input select" @click="showCarList= true" v-show="!repairId" style="color:black;">{{vehicleNum}}</span>
					<span class="ivu-input text" v-show="repairId">{{vehicleNum}}</span>
				</FormItem>
			</Form>
		</div>
	</div>

	<div class="remarkblock">
	<div class="remarkhead">
		<h1>您对该门店服务满意吗？</h1>
		<p>以下反馈是匿名的，便于我们记录并沟通改进</p>
		<!--<img src="/img/remark/chartico.png"/>-->
	</div>
	<div class="remarkbody">
		<!--<div class="head">{{company.name|| $route.query.compName}}-->
			<!--&lt;!&ndash;<em @click="$router.go(-2)">修改</em>&ndash;&gt;-->
		<!--</div>-->
		<ul class="remarkstar">
			<li :data-index='index' v-for='(item, index) in remarkList' :key='index'>
				<div class="left">{{ item.title }}</div>
				<div class="center">
					<img v-for="i in 5" :src="i<=item.level?'/img/remark/yellow.png':'/img/remark/gray.png'"
					     @click='level(index, i)'>
				</div>
				<div class="right">{{remarkText[item.level-1]}}</div>
			</li>
		</ul>
		<div class="saymore">
			<span>还想再说点什么吗？</span>
			<!--<input v-model="saymore" placeholder="还想再说点什么吗？" readonly="readonly"/>-->
			<i :class="`fa fa-frown-o ${!approve? 'on': ''}`" @click="cltag(false)"><span style="float-size:12px;">好评</span></i>
			<i :class="`fa fa-smile-o ${approve? 'on': ''}`" @click="cltag(true)"><span style="float-size:12px;">差评</span></i>
		</div>
		<ul class="tag">
			<li v-for="(item, index) in tags" :key="index"
			    @click="clicktag(index)" :class="{on: item.checked}">{{item.name}}</li>
		</ul>

		<div id="submit" class="on button" @click="submit">提交点评</div>
	</div>
	</div>

	<mt-popup
			v-model="showCarList"
			position="right"
			popup-transition="popup-fade">
		<car-list ref="carlist" style="width: 90vw" @select="getCar" @done="getCarList" :show-button="false"></car-list>
	</mt-popup>
</div>
</template>

<script>
import CarList from '@/views/car-record/car-list.vue'
import { showAreaImg} from '@/util.js'
export default {
	name: "remark",
	components: { CarList},
	data(){
		return{
			remarkList: [
				{title: '履约情况', level: 3, field: 'keepAppointment'},
				{title: '服务态度', level: 3, field: 'attitude'},
				{title: '维修质量', level: 3, field: 'quality'},
				{title: '维修速度', level: 3, field: 'speed'},
				{title: '维修价格', level: 3, field: 'price'}
			],
			remarkText: ['极差', '失望', '一般', '满意', '惊喜'],
			company: {},
			showCarList: false,
			approve: true,
			tags: [],
			vehicleNum: '',
			carList: [{}]
		}
	},
	computed:{
		repairId(){
			return this.$route.query.repairId
		},
		queryVehicleNum(){
			return this.$route.query.vehicleNum
		},
		showImg(){
			return showAreaImg(this.company.licenseNo|| '', '/img/maintain/shqxwbig.png')
		},
		corpId(){
			return this.$route.query.corpId
		}
	},
	watch:{
		approve(val){
			this.changeTag()
		}
	},
	mounted(){
		this.vehicleNum= this.queryVehicleNum|| ''
		this.changeTag()
		this.axiosQixiu.get( '/micro/search/shop/repair/'+ this.$route.query.scode ,
			{baseURL: '/repair-proxy',}).then(res => {
			this.company = res.data
		})
	},
	methods:{
		level(index, i){
			this.remarkList[index].level= i
		},
		getCar(item){
			this.vehicleNum = item.vehiclePlateNumber
			this.showCarList= false
		},
		getCarList(list){
			this.carList= list
			if(list.length && !this.queryVehicleNum){
				this.vehicleNum = list[0].vehiclePlateNumber
			}
		},
		cltag(flag){
			this.approve= flag
		},
		changeTag(){
			this.tags= this.approve?
				[
					{name: '价格实惠', checked: false},
					{name: '服务热情', checked: false},
					{name: '维修时间短', checked: false},
					{name: '有WIFI', checked: false},
					{name: '维修工位多', checked: false},
					{name: '客休区大', checked: false},
					{name: '客餐丰富可口', checked: false},
					{name: '索赔方便', checked: false},
					{name: '上门取车', checked: false},
				] :
				[
					{name: '乱收费', checked: false},
					{name: '维修时间长', checked: false},
					{name: '态度差', checked: false},
					{name: '不专业', checked: false},
					{name: '维修区杂乱', checked: false},
					{name: '需要返工', checked: false},
				]
		},
		clicktag(index){
			this.tags[index].checked= !this.tags[index].checked
		},
		submit(){
			if(!this.vehicleNum){
				this.$toast('请选择车牌号');
				return
			}
			let data={
				level: this.approve? 1: 0,
				openId: localStorage.getItem("OPENID"),
				vehicleNum: this.vehicleNum,
				tags: [],
				userId: this.$store.state.user.userinfo.userId,
				companyId: this.corpId? parseInt(this.corpId) :null
			}
			for (let i in this.tags){
				if(this.tags[i].checked) data.tags.push(this.tags[i].name)
			}
			for (let i in this.remarkList){
				data[this.remarkList[i].field]= this.remarkList[i].level
			}
			if(this.repairId){
				data.repairUid= this.repairId
			}else{
				data.companyCode= this.$route.query.scode
			}
			this.axiosQixiu.post('/review/shop/cartalk_hxx', data ,{hxxtoken: true}).then(res=>{
				if (res.data.code == '0') {
					this.$toast('点评成功');
					this.$router.replace({
						path: '/my-remark',
					})
				}
			})
		}
	}
}
</script>

<style scoped lang='less'>
.compImg{
	width:66px;
	height:66px;
	border-radius:5px;
	/*width: 100%;*/
	/*max-height: 200px;*/
	/*margin-top: 40px;*/
}
.content{
	width: 100%;
	padding: 6px 15px;
	.row{
		margin-bottom: 20px;
		position: relative;
		p{
			font-size: 16px;
			color: black;
			margin-bottom: 0;
		}
		span{
			font-size: 12px;
			color: #b3b3b3;
			display:block;
			padding-top:8px;
			float:left;
			i{
				font-size: 14px;
				margin-right: 3px;
			}
		}
		label{
			width: 100%;
			display: block;
			font-size: 13px;
		}
		.add-car{
			display: block;
			line-height: 30px;
			width: 120px;
			font-size: 14px;
			color: white;
			background-color: #FF9738;
			text-align: center;
			margin: 0 auto;
			border-radius: 15px;
		}
	}
}
.button{
	height: 40px;
	line-height: 40px;
	border-radius: 20px;
	text-align: center;
	font-size: 16px;
	color: white;
	background-color: #FFCB9C;
}
.button.on{
	background-color: #FF9738;
}
.remarkblock{
	width: 100%;
	overflow: auto;
	.remarkhead{
		/*margin-top: 40px;*/
		border-top: 5px solid #f8f8f8;
		padding: 5px 90px 0px 15px;
		position: relative;
		h1{
			font-size: 20px;
			line-height: 30px;
			white-space: nowrap;
			font-weight: 400;
		}
		p{
			margin: 0;
			line-height: 30px;
			white-space: nowrap;
			letter-spacing: -1px;
			font-size: 12px;
			color:#999999;
		}
		img{
			width: 85px;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto 5px auto auto;
		}
	}
	.remarkbody{
		padding: 0px 15px 15px 15px;
		.head{
			font-size: 16px;
			position: relative;
			padding-right: 30px;
			em{
				position: absolute;
				right: 0;
				color: #666666;
				font-style: normal;
				font-size: 14px
			}
		}
		.remarkstar{
			margin:0;
			font-size: 14px;
			padding-bottom:10px;
			li {
				padding: 8px 0;
				.left {
					float: left;
					width: 80px;
					color: #666666;
				}
				.center {
					float: left;
					width: 140px;
					height: auto;
					padding: 0;
					img {
						width: 20px;
						height: auto;
						border: 0;
						border-radius: 0;
						margin-right: 3px;
					}
				}
				.right {
					text-align: center;
					color: #999999;
				}
			}
		}
		.saymore{
			position: relative;
			line-height: 32px;
			border-top: 5px solid #f8f8f8;
			padding-top:10px;
			margin-bottom: 10px;
			font-size: 14px;
			color: #999999;
			i{
				float: right;
				font-size: 32px;
				span{
					display:block;
					float:right;
					color: #999999;
					padding-left:5px;
					font-size: 14px;
					line-height:32px;
			    }
				margin-left: 10px;
				&.on{
					color: #FF9738;
				}
			}
		}
		.tag{
			margin-bottom: 10px;
			font-size: 14px;
			li{
				display: inline-block;
				padding: 5px 10px;
				background-color: #f4f4f4;
				color: #666666;
				border-radius: 5px;
				margin-right: 10px;
				margin-bottom: 10px;
			}
			li.on{
				background-color: #ff8327;
				color: white;
			}
		}
	}
}
</style>
