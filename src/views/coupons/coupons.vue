<template>
<div class="coupons">
	<p class="num">共10张，可用10张</p>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="coupons-list">
		<li v-for="item in list">
			<div class="content">
				<div class="left">
					<p>{{item.name}}</p>
					<span>有效期：{{item.startDate}}-{{item.endDate}}</span>
				</div>
				<i></i>
				<div class="right">
					<router-link tag="div" :to="'/coupons-detail?code='+item.code+'&use='+item.isuse" class="button">查看详情</router-link>
					<!--<div class="tag">-->
					<!--<p>已领取</p>-->
					<!--</div>-->
					<!--<div class="times">-->
						<!--<p>已核销数</p>-->
						<!--<span>1690</span>-->
					<!--</div>-->
				</div>
			</div>
		</li>
	</ul>
	</mt-loadmore>
</div>
</template>

<script>
export default {
	name: "coupons",
	data(){
		return{
			list:[
				{name: '优惠券', type: 1},
				{name: '优惠券', type: 2},
			],
			page: 1,
			total: 0,
			allLoaded: false,
		}
	},
	watch:{

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
.coupons{
	height: 100vh;
	overflow: auto;
	background-color: white;
	.num{
		color: #666666;
		font-size: 12px;
		margin-top: 10px;
		padding: 0 10px;
	}
}
@import "./coupons.less";
</style>
