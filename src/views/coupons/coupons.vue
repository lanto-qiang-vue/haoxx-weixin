<template>
<div class="coupons">
	<p class="num">共{{total}}张，可用{{query.canuse}}张</p>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="coupons-list">
		<router-link tag="li" v-for="item in list" :to="'/coupons-detail?code='+ item.code">
			<div class="content">
				<div class="left">
					<p>{{item.name}}</p>
					<span>有效期{{formatDate(item.begin_time)}}-{{formatDate(item.end_time)}}</span>
					<span style="margin: 0">限用车牌：{{item.license}}</span>
				</div>
				<i></i>
				<div class="right">
					<div class="tag">
					<p :class="[{orange:item.isuse == 1}]">{{item.usetype}}</p>
					</div>
				</div>
			</div>
		</router-link>
	</ul>
	</mt-loadmore>
</div>
</template>

<script>
import {formatDate} from '@/util.js'
export default {
	name: "coupons",
	data(){
		return{
			list:[],
			page: 1,
			total: 0,
			allLoaded: false,
			type:"",
		}
	},
	computed:{
		query(){
			return this.$route.query
		}
	},
	mounted(){
		this.getList(false);
	},
	methods:{
		getList(flag){
			let params={
				page: this.page,
				limit: 10,
                USER_ID:this.$store.state.user.userinfo.userId,
				type:this.query.type,
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
		formatDate: formatDate,
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
