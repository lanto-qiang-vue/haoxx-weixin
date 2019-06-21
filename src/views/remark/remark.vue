<template>
<div class="remark">
	<img class="compImg" :src="company.pic||'/img/maintain/shqxwbig.png'">
	<div class="content" >
		<div class="row">
			<p>{{company.name}}</p>
			<span><i class="fa fa-map-marker"></i>门店地址：{{company.addr}}</span>
		</div>
		<div class="row">
			<label>车牌号</label>

		</div>
	</div>

	<div class="remarkblock">
	<div class="remarkhead">
		<h1>您对该门店服务满意吗？</h1>
		<p>以下反馈是匿名的，便于我们记录并沟通改进</p>
		<img src="/img/remark/chartico.png"/>
	</div>
	<div class="remarkbody">
		<div class="head">{{company.name|| $route.query.compName}}<em @click="$router.go(-2)">修改</em></div>
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
			<i class="fa fa-frown-o"></i>
			<i class="fa fa-smile-o"></i>
			<!--<img class="good" @click="remark('good')" src="/img/remark/goodon.png"/>-->
			<!--<img class="bad" @click="remark('bad')" src="/img/remark/bad.png"/>-->
		</div>
		<ul class="tag">
			<!--<li v-for="(item, index) in tags" @click="clicktag(index)" :class="{on: item.checked}">{{item.name}}</li>-->
		</ul>

		<!--<div id="submit" class="on button" @click="submit">提交点评</div>-->
	</div>
	</div>
</div>
</template>

<script>
export default {
	name: "remark",
	data(){
		return{
			remarkList: [
				{title: '履约情况', level: 3, field: 'promise'},
				{title: '服务态度', level: 3, field: 'serviceQuality'},
				{title: '维修质量', level: 3, field: 'repairQuality'},
				{title: '维修速度', level: 3, field: 'repairSpeed'},
				{title: '维修价格', level: 3, field: 'repairPrice'}
			],
			remarkText: ['极差', '失望', '一般', '满意', '惊喜'],
			tags: [
				{name: '价格实惠', checked: false},
				{name: '服务热情', checked: false},
				{name: '维修时间短', checked: false},
				{name: '有WIFI', checked: false},
				{name: '维修工位多', checked: false},
				{name: '客休区大', checked: false},
				{name: '客餐丰富可口', checked: false},
				{name: '索赔方便', checked: false},
				{name: '上门取车', checked: false},
			],
			remark:{
				promise: 3,
				serviceQuality: 3,
				repairQuality: 3,
				repairSpeed: 3,
				repairPrice: 3,
			},
			company: {

			}
		}
	},
	methods:{
		level(index, i){
			this.remarkList[index].level= i
		}
	}
}
</script>

<style scoped lang='less'>
.compImg{
	width: 100%;
	max-height: 200px;
	/*margin-top: 40px;*/
}
.content{
	width: 100%;
	padding: 15px;
	.add{
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
		}
		label{
			width: 100%;
			display: block;
			font-size: 13px;
		}
		.input{
			margin-top: 5px;
			padding-bottom: 5px;
			border-bottom: 1px solid #eeeeee;
			input{
				width: 100%;
				font-size: 16px;
			}
			input::-webkit-input-placeholder{
				color:#bdbdbd;
			}
			.readonly{
				color: #888;
			}
		}
	}
}
.button{
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 16px;
	color: white;
	background-color: #FFCB9C;
	border-radius: 5px
}
.button.on{
	background-color: #FF9738;
}
.remarkblock{
	width: 100%;
	overflow: auto;
	.remarkhead{
		/*margin-top: 40px;*/
		border-bottom: 10px solid #f8f8f8;
		padding: 10px 90px 10px 15px;
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
		padding: 15px;
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
			margin: 10px 0;
			font-size: 14px;
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
			/*margin-top: 30px;*/
			margin-bottom: 10px;
			font-size: 14px;
			i{
				
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
