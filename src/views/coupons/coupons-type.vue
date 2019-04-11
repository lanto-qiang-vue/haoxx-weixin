<template>
<div class="coupons-type">
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="coupons-list">
		<router-link tag="li" v-for="(item, key) in list" :key="key" to="/coupons">
			<div class="content">
				<div class="left">
					<label>{{item.name}}</label>
				</div>
				<i></i>
				<div class="right">
					<div class="times"><span>可用{{item.type}}张</span></div>
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
		this.getList(false)
	},
	methods:{
        getCoupons(id){
            this.axiosQixiu.post('/promotion/user_coupon',{couponId:id}).then(res=>{
                switch(res.data.code){
					case "1000":
					    //重复领取
					    Toast(res.data.msg);
                        this.changeType(id,2);
					    break;
					case "0":
                        Toast("领取优惠券成功！ 请到“我的-我的优惠券”进行查看");
                        this.changeType(id,2);
                        break;
					case "1001":
                        //优惠券已领完
                        Toast(res.data.msg);
                        this.changeType(id,3);
					    break;
				}
			});
        },
		changeType(id,type){
            for(let i = 0;i<this.list.length;i++){
                if(this.list[i].id == id){
                    console.log('ok');
                    this.list[i].type = type;
                    break;
                }
            }
		},
		showRule(){
			MessageBox.alert('<p class="coupons-rules">1､ 优惠券有使用期限限制，过了有效期不能使用；</p><p class="coupons-rules">2､ 订单中包含特价商品时不能使用优惠券，优惠券不能与其他优惠（如促销活动）同时使用；</p><p class="coupons-rules"> 3､ 优惠券只能抵扣订单金额，优惠金额超出订单金额部分不能再次使用，不能兑换现金；</p><p class="coupons-rules"> 4､ 每个订单只能使用一张优惠券；</p>', '使用规则');
		},
		getList(flag){
			let params={
				page: this.page-1,
				size: 10,
			}
			if(this.selected) params.hasRead= this.selected
			this.axiosQixiu.get('/promotion/coupon/query',{params: params}).then(res=>{
				this.total= res.data.totalElements
                if(res.data.content&&res.data.content.length){
				    let data = res.data.content;
				    //添加状态type 1 可领取 2 已领取 3 领完了
				    for(let i =0;i<data.length;i++){
				        data[i]['type'] = 1;
					}
					this.list=this.list.concat(data)
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

