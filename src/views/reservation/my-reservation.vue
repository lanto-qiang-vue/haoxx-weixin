<template>
<div class="my-reservation">
	<ul class="select">
		<li @click="clickDatetime">预约时间<i class="fa fa-caret-down"></i></li>
		<li>预约类型<i class="fa fa-caret-down"></i></li>
	</ul>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
		<ul class="list">
			<li v-for="item in list" tag="a" @click="to(item.ORDER_ID)">
				<div class="head">
					<label>{{item.name}}</label>
					<span class="status">{{item.status}}</span>
				</div>
				<p><label>预约时间：</label>{{item.time}}</p>
				<p><label>车牌号：</label>{{item.card}}</p>
			</li>
		</ul>
	</mt-loadmore>

	<mt-datetime-picker
			ref="datetime"
			v-model="date"
			type="date"
			year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日">
	</mt-datetime-picker>
</div>
</template>

<script>
export default {
	name: "my-reservation",
	data(){
		return{
			list:[
				{
					name: '洗车',
					time: '2019-05-23 11:38',
					card: '沪AL59A1',
					status: '待处理'
				}
			],
			date: '',
			type:'',
			page: 1,
			total: 0,
			allLoaded: false,

		}
	},
	mounted(){
		// this.getList(false)
	},
	methods:{
	    to(id){
	      this.$router.push({path:'/reservation-detail',query:{id:id}});
		},
		getList(flag){
			let params={
				page: this.page,
				limit: 10,
			}
			// if(this.selected) params.hasRead= this.selected
			this.axiosHxx.post('/operate/order/list',params).then(res=>{
				this.total= res.data.total
				if(res.data.data&&res.data.data.length){
					this.list=this.list.concat(res.data.data)
					// this.list=res.data.comments
					if(this.list.length>=res.data.total){
						this.allLoaded=true
					}else{
						this.allLoaded=false
					}
					if(flag) this.$refs.loadmore.onBottomLoaded()
				}else{
					this.$toast('暂无数据')
					this.allLoaded=true
				}
			})
		},
		loadMore(){
			this.page++
			this.getList(true)
		},
		clickDatetime(){
	    	this.$refs.datetime.open()
		}
	}
}
</script>

<style scoped lang="less">
.my-reservation{
	height: 100vh;
	overflow: auto;
	/*background-color: #F3F3F3;*/
	.select{
		position: fixed;
		top: 0;
		left: 0;
		border-bottom: 1px solid #EDEDED;
		width: 100%;
		padding: 0 10px;
		background-color: white;
		li{
			color: #666666;
			margin-right: 10px;
			line-height: 40px;
			float: left;
			position: relative;
			font-size: 14px;
			i{
				margin-left: 5px;
			}
		}
	}
	.list{
		margin-top: 40px;
		padding-left: 15px;
		li{
			background-color: white;
			border-bottom: 1px solid #EDEDED;
			padding: 10px 0;
			.head{
				line-height: 30px;
				font-size: 14px;
				font-weight: 600;
				color: #333333;
				label{
					color: #666666;
				}
				.status{
					float: right;
					color: #FF9738;
					margin-right: 15px;
					padding-right: 10px;
					position: relative;
					&:after{
						content: '';
						position: absolute;
						right: 0;
						top: 50%;
						border-right: 1px solid;
						border-bottom: 1px solid;
						width: 8px;
						height: 8px;
						color: #999;
						transform: translateY(-50%) rotate(-45deg);
					}
				}
			}
			p{
				font-size: 13px;
				line-height: 22px;
				color: #666666;
				label{
					/*color: #999999;*/
				}
			}
		}
	}
}
</style>
