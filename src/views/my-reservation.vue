<template>
<div class="my-reservation">
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
		<ul class="list">
			<li>
				<div class="head"><label>预约时间：</label>
					2019-03-27 10:00
					<span class="status">待处理</span>
				</div>
				<p><label>指派公司：</label>上海申海汽车修理有限公司</p>
				<p><label>服务内容：</label>洗车</p>
			</li>
			<li>
				<div class="head"><label>预约时间：</label>
					2019-03-27 10:00
					<span class="status">待处理</span>
				</div>
				<p><label>指派公司：</label>上海申海汽车修理有限公司</p>
				<p><label>服务内容：</label>洗车</p>
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
		// this.getList(false)
	},
	methods:{
		getList(flag){
			let params={
				page: this.page-1,
				size: 10,
				status:parseInt(this.selected[this.selected.length - 1])
			}
			// if(this.selected) params.hasRead= this.selected
			this.axiosQixiu.get('/promotion/user_coupon/query',{params: params}).then(res=>{
				this.total= res.data.totalElements
				if(res.data.content&&res.data.content.length){
					this.list=this.list.concat(res.data.content)
					// this.list=res.data.comments
					if(this.list.length>=res.data.totalElements){
						this.allLoaded=true
					}else{
						this.allLoaded=false
					}
					if(flag) this.$refs.loadmore.onBottomLoaded()
				}else{
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
