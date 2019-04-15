<template>
<div class="coupons-type">
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="coupons-list">
		<router-link tag="li" v-for="(item, key) in list" :key="key" :to="'/coupons?type='+item.type">
			<div class="content">
				<div class="left">
					<label>{{item.name}}</label>
				</div>
				<i></i>
				<div class="right">
					<div class="times"><span>可用{{item.count}}张</span></div>
				</div>
			</div>
		</router-link>
		<!--<div v-if="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">暂无更多数据...</div>-->
	</ul>
	</mt-loadmore>
</div>
</template>

<script>
import {MessageBox,Toast,} from 'mint-ui'
export default {
	name: "coupons-type",
	data(){
		return{
			list:[

			],
			page: 1,
			total: 0,
			allLoaded: false,
		}
	},
	watch:{

	},
	mounted(){
		this.getList();
	},
	methods:{
	    //接口没有分页
		getList(){
            this.axiosHxx.post('/operate/coupon/mycoupons', {USER_ID:this.$store.state.user.userinfo.userId}).then(res => {
                if(res.data.success){
                    //下一步操作
					this.list = res.data.data;
                }
            })
		}
	}
}
</script>

<style scoped lang="less">
.coupons-type{
	height: 100vh;
	overflow: auto;
	background-color: white;
	.coupons-list{
		padding-top: 20px;
	}
}
@import "./coupons.less";
</style>

