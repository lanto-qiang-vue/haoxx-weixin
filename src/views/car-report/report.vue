<template>
<div class="report-detail">
	<div class="block">
		<div class="title">车辆档案</div>
		<ul class="form-list">
			<li><label>车架号</label><p>{{detail.vin}}</p></li>
			<!--<li class="next"><label>排除重大事故</label>-->
				<!--<p>106项<i class="fa fa-check-circle-o"></i></p>-->
				<!--<p>5项<i class="zmdi zmdi-alert-circle-o"></i></p>-->
			<!--</li>-->
		</ul>
	</div>
	<div class="block">
		<div class="title">车史报告</div>
		<ul class="tags">
			<li :class="{err: detail.aa}">
				<img src="~@/assets/img/report/正常保养.png"/>
				<p>召回排查</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li :class="{err: detail.burned}">
				<img src="~@/assets/img/report/非火烧.png"/>
				<p>非火烧</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li :class="{err: detail.blistered}">
				<img src="~@/assets/img/report/非泡水.png"/>
				<p>非泡水</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li :class="{err: detail.mileage_anomaly}">
				<img src="~@/assets/img/report/里程数.png"/>
				<p>里程数</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li :class="{err: detail.airbag}">
				<img src="~@/assets/img/report/安全气囊无弹开.png"/>
				<p>安全气囊无弹开</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li :class="{err: detail.engine}">
				<img src="~@/assets/img/report/无发动机维修.png"/>
				<p>无发动机维修</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li :class="{err: detail.gearbox}">
				<img src="~@/assets/img/report/无变速箱维修.png"/>
				<p>无变速箱维修</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
		</ul>
	</div>

	<div class="block piece" v-show="showAll">
		<div class="title">车身损伤分析</div>
		<template v-if="detail.results && detail.results.length">
			<ul class="form-list" v-for="(item, key) in detail.results" :key="key">
				<div class="sub-title">{{item.name}}</div>
				<template v-if="item.items && item.items.length">
					<li class="next" v-for="(item2, key2) in item.items" :key="key2" @click="pop(item2)">
						<label>{{item2.name}}</label>
						<p>{{item2.total}}项<i class="fa fa-check-circle-o"></i></p>
						<p>{{item2.faults}}项<i class="zmdi zmdi-alert-circle-o"></i></p>
					</li>
				</template>
			</ul>
		</template>
	</div>

	<div class="block">
		<div class="title">车主爱惜度</div>
		<ul class="form-list">
			<!--<li><label>最后一次保养时间</label><p>{{detail.aa}}</p></li>-->
			<li><label>年平均保养次数</label><p>{{detail.repair_count_per_year}}次/年</p></li>
			<li><label>最后一次进店时间</label><p>{{detail.last_repair_date}}</p></li>
			<li><label>年平均行驶里程</label><p>{{detail.mileage_per_year}}公里/年</p></li>
		</ul>
	</div>

	<div class="block piece" v-show="showAll">
		<div class="title">维修保养记录明细</div>
		<ul class="timeline" v-if="detail.records && detail.records.length">
			<li v-for="(item, key) in detail.records" :key="key">
				<div class="head">
					<p>{{item.repair_date}}</p>
					{{item.repair_mileage}}公里
					<span>维修</span>
				</div>
				<p>细节：{{item.repair_projects}}</p>
				<p>门店：{{item.company_name}}</p>
			</li>
		</ul>
	</div>

	<div class="look-all" v-show="!showAll"><a @click="lookAll">查看详细报告</a></div>

	<mt-popup
			v-model="popupVisible"
			position="right"
			popup-transition="popup-fade">
		<div class="block popup-block">
			<ul class="form-list right10">
				<li class="weight">
					<label>{{popupItem.name}}</label>
					<p>{{popupItem.total}}项<i class="fa fa-check-circle-o"></i></p>
					<p>{{popupItem.faults}}项<i class="zmdi zmdi-alert-circle-o"></i></p>
				</li>
				<template v-if="popupItem.items && popupItem.items.length">
					<li v-for="(item, key) in popupItem.items" :key="key">
						<label>{{item.name}}</label>
						<p v-if="!item.fault"><i class="fa fa-check-circle-o"></i></p>
						<p v-if="item.fault"><i class="zmdi zmdi-alert-circle-o"></i>{{item.action}}</p>
					</li>
				</template>

			</ul>
		</div>
	</mt-popup>
</div>
</template>

<script>
export default {
	name: "report-detail",
	data(){
		return{
			detail: {
				"code":"0",
				"status":"OK",
				"id":0,
				"order_id":"",
				"vin":"LSV**********3753",
				"create_time":"",
				"burned": false,
				"blistered":false,
				"mileage_anomaly": true,
				"airbag":false,
				"engine":false,
				"gearbox":false,
				"last_repair_date":"2019-01-01",
				"repair_count_per_year": 10,
				"mileage_per_year": 21718,
				"version":0,
				"results":[
					{
						"name":"事故维修排查",
						"items":[
							{
								"name":"排除重大事故",
								"total": 18,
								"faults": 0,
								"items":[
									{
										"name":"左前纵梁",
										"fault": false,
										"action":""
									},
									{
										"name":"右前纵梁",
										"fault": false,
										"action":""
									}
								]
							}
						]
					}
				],
				"records":[
					{
						"repair_date": "2019-03-23",
						"repair_mileage": 153035,
						"repair_projects":"A6 3.0 4F80VL机油机滤更换与全面检查",
						"company_name":"好修修汽车修理厂"
					},
					{
						"repair_date": "2018-08-18",
						"repair_mileage": 136782,
						"repair_projects":"照明检查",
						"company_name":"好修修汽车修理厂"
					},{
						"repair_date": "2018-03-17",
						"repair_mileage": 121800,
						"repair_projects":"换油保养；技术检查；车窗升降器开关拆卸和",
						"company_name":"好修修汽车修理厂"
					}
				],
				"detailVersion":false,
			},
			popupVisible: false,
			popupItem: {},
			detailVersion: false,
			showDetail: false
		}
	},
	computed:{
		showAll(){
			return this.detailVersion && this.showDetail
		}
	},
	mounted(){
		let det= this.$route.query.detailVersion
		if(det) this.detailVersion= JSON.parse(det)

		if(this.$route.query.id) this.getData()
	},
	methods:{
		getData(){
			this.axiosQixiu.get( '/hxxdc/order/detail/'+ this.$route.query.id, {hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					this.detail= res.data.item
					this.detailVersion =res.data.item.detailVersion
				}
			})
		},
		pop(item){
			this.popupItem= item
			this.popupVisible= true
		},
		lookAll(){

		}
	}
}
</script>

<style scoped lang="less">
@import "./report.less";
.report-detail{
	.tags{
		padding-top: 20px;
		padding-right: 15px;
		overflow: hidden;
		li{
			width: 25%;
			float: left;
			text-align: center;
			color: #666666;
			margin-bottom: 20px;
			position: relative;
			padding: 0 5px;
			img{
				width: 36px;
				height: 36px;
				object-fit: contain;
				margin-bottom: 10px;
			}
			p{
				font-size: 12px;
			}
			i{
				font-size: 18px;
				position: absolute;
				top: -5px;
				right: 5px;
				color: #52C41A;
				&.zmdi-alert-circle{
					display: none;
					color: #FE8636;
				}
			}
			&.err{
				i{
					display: none;
					&.zmdi-alert-circle{
						display: inline-block;
					}
				}
			}
		}
	}
	.timeline{
		margin: 10px 0;
		padding: 0 20px;
		position: relative;
		&:before{
			content: '';
			display: block;
			width: 2px;
			height: 100%;
			background-color: #FE8636;
			left: 18px;
			top: 0;
			position: absolute;
		}
		li{
			padding-left: 10px;
			margin-bottom: 20px;
			position: relative;
			&:before{
				content: '';
				display: block;
				width: 8px;
				height: 8px;
				background-color: white;
				border: 1px solid #FE8636;
				border-radius: 100%;
				position: absolute;
				left: -5px;
				top: 6px;
			}
			&:last-child{
				margin: 0;
			}
			.head{
				line-height: 20px;
				font-size: 14px;
				color: #333333;
				text-align: center;
				p{
					float: left;
				}
				span{
					float: right;
					color: #FE8636;
				}
			}
			>p{
				margin-top: 5px;
				line-height: 16px;
				color: #666666;
			}
		}
	}
	.look-all{
		padding: 15px;
		text-align: center;
		a{
			color: #FE8636;
			text-decoration: underline;
		}
	}
	.popup-block{
		height: 100vh;
		background-color: white;
		width: 80vw;
		overflow: auto;
		padding-top: 0;
		border: 0;
	}
}
</style>
