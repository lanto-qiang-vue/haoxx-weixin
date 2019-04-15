<template>
<div class="coupons">
	<p class="num">共{{total}}张，可用{{canuse}}张</p>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="coupons-list">
		<li v-for="item in list">
			<div class="content">
				<div class="left">
					<p>{{item.name}}</p>
					<span>有效期：{{item.begin_time}}-{{item.end_time}}</span>
				</div>
				<i></i>
				<div class="right">
					<div class="tag">
					<p :class="[{orange:item.usetype == '可使用'}]">{{item.usetype}}</p>
					</div>
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

			],
			page: 1,
			total: 0,
            canuse:0,
			allLoaded: false,
			type:"",
		}
	},
	watch:{

	},
	mounted(){
	    this.type = this.$route.query.type;
		this.getList(false);
	},
	methods:{
		getList(flag){
			let params={
				page: this.page,
				limit: 10,
                USER_ID:this.$store.state.user.userinfo.userId,
				type:this.type,
			}
			// if(this.selected) params.hasRead= this.selected
			this.axiosHxx.post('/operate/coupon/mycoupondetail',params).then(res=>{
				this.total= res.data.total;
				this.canuse = res.data.canuse;
				if(res.data.data&&res.data.data.length){
					this.list=this.list.concat(res.data.data)
					// this.list=res.data.comments
					if(this.list.length>=this.total){
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
.coupons-list li .content .right .tag .orange{
	background-color:#ffaa6a;
}
</style>
