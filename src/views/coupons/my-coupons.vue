<template>
<div class="my-coupons">
	<mt-navbar v-model="selected" class="tab">
		<mt-tab-item id="can-1">可使用</mt-tab-item>
		<mt-tab-item id="yet-2">已使用</mt-tab-item>
		<mt-tab-item id="past-3">已过期</mt-tab-item>
		<mt-tab-item id="all-0">全部</mt-tab-item>
	</mt-navbar>
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
	name: "my-coupons",
	data(){
		return{
			selected: 'can-1',
			list:[],
			page: 1,
			total: 0,
			allLoaded: false,
		}
	},
	watch:{
		selected(val){
			// console.log(val)
			// this.allLoaded= false
			this.page=1
			this.list=[]
			this.getList()
		}
	},
	mounted(){
		this.getList(false)
	},
	methods:{
		getList(flag){
			let params={
				page: this.page-1,
				size: 10,
                status:parseInt(this.selected[this.selected.length - 1])
			}
			// if(this.selected) params.hasRead= this.selected
			this.axios.get('/promotion/user_coupon/query',{params: params}).then(res=>{
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

.my-coupons{
	height: 100vh;
	overflow: auto;
	background-color: white;
	.tab{
		background-color: white;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.coupons-list{margin-top: 35px;}
}
@import "./coupons.less";
</style>
