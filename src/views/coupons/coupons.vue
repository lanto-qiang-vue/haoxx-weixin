<template>
<div class="coupons">
	<ul class="tab">
		<li :class="{on: status=='1'}" @click="clickTab(1)"><span>可使用</span></li>
		<li :class="{on: status=='2'}" @click="clickTab(2)"><span>已使用</span></li>
		<li :class="{on: status=='3'}" @click="clickTab(3)"><span>已过期</span></li>
	</ul>
	<p class="num">共{{total}}张</p>
	<!--<p class="num">共{{total}}张，可用{{query.canuse}}张</p>-->
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="coupons-list">
		<li v-for="(item, key) in list" @click="goto(item)"
		             :class="`status${item.isuse}`" :key="key">
			<div class="content">
				<div class="left">
					<p>{{item.name}}</p>
					<span>有效期{{formatDate(item.begin_time)}}-{{formatDate(item.end_time)}}</span>
					<span style="margin: 0">限用车牌：{{item.license || '无'}}</span>
				</div>
				<i></i>
				<div class="right">
					<div class="type">
						<h3>{{item.coupontype}}</h3>
						<p>{{useList[parseInt(item.isuse)]}}</p>
					</div>
				</div>
			</div>
		</li>
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
			useList:['未领用','可使用','已使用','已过期'],
			status: 1
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
				useStatus: this.status,
                USER_ID:this.$store.state.user.userinfo.userId,
				type:this.query.type,
			}
			// if(this.selected) params.hasRead= this.selected
			this.axiosHxx.post('/operate/coupon/mycoupondetail',params).then(res=>{
				this.total= res.data.total;
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
		clickTab(status){
			this.list= []
			this.page= 1
			this.status= status
			this.getList(false);
		},
		formatDate: formatDate,
		loadMore(){
			this.page++
			this.getList(true)
		},
		goto(item){
			if(item.isuse!=3){
				this.$router.push(`/coupons-detail?code=${item.code}`)
			}
		}
	}
}
</script>

<style scoped lang="less">
.coupons{
	height: 100vh;
	overflow: auto;
	background-color: white;
	.tab{
		overflow: hidden;
		border-bottom: 10px #F7F7F7 solid;
		text-align: center;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: white;
		li{
			width: 80px;
			display: inline-block;
			text-align: center;
			font-size: 16px;
			color: #333333;
			span{
				display: inline-block;
				margin: 0 auto;
				line-height: 38px;
				border-bottom: 2px solid transparent;
			}
		}
		li.on span{
			color: #FF6D0E;
			border-bottom: 2px solid  #FF6D0E;
		}
	}
	.num{
		color: #666666;
		font-size: 12px;
		/* padding-top: 10px; */
		padding: 10px 10px 5px;
		position: fixed;
		top: 50px;
		background-color: white;
		z-index: 1;
		width: 100%;
	}
	.coupons-list{
		margin-top: 80px;
	}
}
@import "./coupons.less";
.coupons-list li .content .right .tag .orange{
	background-color:#ffaa6a;
}
</style>
