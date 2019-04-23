<template>
<div class="my-reservation">
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
		<ul class="list">
			<li v-for="item in list" tag="a" @click="to(item.ORDER_ID)">
				<div class="head"><label>预约时间：</label>
					{{item.ORDER_DATE.substr(0,10) + " " + item.ORDER_TIME}}
					<!--<span class="status">{{$store.state.user.unit[item.ORDER_TYPE]}}</span>-->
				</div>
				<p><label>指派公司：</label>{{item.TENANT_NAME}}</p>
				<p><label>服务内容：</label>{{$store.state.user.unit[item.REPAIR_TYPE]}}</p>
			</li>
		</ul>
	</mt-loadmore>
</div>
</template>

<script>
export default {
	name: "my-reservation",
	data(){
		return{
			list:[],
			page: 1,
			total: 0,
			allLoaded: false,
		}
	},
	mounted(){
		this.getList(false)
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
			this.axiosHxx.post('/operate/order/list ',params).then(res=>{
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
	}
}
</script>

<style scoped lang="less">
.my-reservation{
	height: 100vh;
	overflow: auto;
	background-color: #F3F3F3;
	.list{
		li{
			margin-top: 10px;
			padding: 0 15px 10px;
			background-color: white;
			.head{
				height: 41px;
				line-height: 40px;
				font-size: 14px;
				border-bottom: 1px solid #D9D9D9;
				color: #333333;
				margin-bottom: 10px;
				label{
					color: #666666;
				}
				.status{
					float: right;
					color: #FF9738;
				}
			}
			p{
				font-size: 12px;
				line-height: 22px;
				color: #333333;
				label{
					color: #999999;
				}
			}
		}
	}
}
</style>
