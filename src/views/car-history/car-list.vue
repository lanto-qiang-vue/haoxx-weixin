<template>
<div class="car-list">
	<div class='search'>
		<search placeholder="搜索车牌号码" @enter="enter" v-model="vehicle" ref="search"></search>
	</div>
	<div class="load-more">
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"
		             bottomPullText="加载更多"   ref="loadmore">
			<ul class="list">
				<li>
					<p><label>车牌号：</label>沪A12345</p>
					<p><label>车架号：</label>LGS37123456HG8876</p>
					<!--<div class="unbind">解绑</div>-->
					<!--<div class="my">设为本人车辆</div>-->
				</li>
			</ul>
		</mt-loadmore>
	</div>
	<div class="common-submit"><router-link class="on" to="/bind-car">新增绑定车辆</router-link></div>
</div>
</template>

<script>
import Search from '@/components/common-search.vue'
export default {
	name: "car-list",
	components: { Search},
	data(){
		return{
			vehicle: '',
			list: [
			],
			page: 1,
			total: 0,
			allLoaded: false
		}
	},
	methods:{
		getList(flag){
			this.axiosHxx.post( '/hxxdc/vehicle/bind/list', {
				page: this.page,
				offset: 10,
			},{baseURL: '/hxx-gateway-proxy'}).then( (res) => {
				if(flag) this.$refs.loadmore.onBottomLoaded()
				else this.list=[]
				this.total= res.data.total
				if(res.data.data&&res.data.data.length){
					let arr= res.data.data
					this.list= this.list.concat(arr)
					if(this.list.length>=res.data.total){
						this.allLoaded=true
					}else{
						this.allLoaded=false
					}
				}else{
					this.allLoaded=true
				}
			})
		},
		enter(){
			this.page= 1
			this.getList()
		},
		loadBottom() {
			this.page++
			this.getList(true)
		},
	}
}
</script>

<style scoped lang="less">
.car-list{
	background-color: #fff;
	height: 100vh;
	overflow: auto;
	width: 100%;
	box-sizing: border-box;
	.search {
		width: 100%;
		background: #fff;
		position: fixed;
		z-index:20;
		top: 0;
		left: 0;
		box-sizing: border-box;
		padding: 5px 15px;
		/*border-bottom: 10px #F3F3F3 solid;*/
	}
	.load-more{
		height: 100vh;
		padding-top: 40px;
		padding-bottom: 60px;
		overflow: auto;
		.list{
			border-top: 10px solid #F3F3F3;
			li{
				border-bottom: 10px solid #F3F3F3;
				padding: 10px;
				>p{
					font-size: 14px;
					color: #333333;
					label{
						color: #999999;
					}
				}
			}
		}
	}
}
</style>
