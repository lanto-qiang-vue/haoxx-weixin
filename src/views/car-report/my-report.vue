<template>
<div class="my-report">
	<div class='search'>
		<search placeholder="请输入车架号" @enter="enter" v-model="search" ref="search"></search>
	</div>
	<div class="load-more">
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"
		             bottomPullText="加载更多"   ref="loadmore">
			<ul class="list">
				<Form class="common-form" :label-width="60" label-position="left"
				v-for="(item, key) in list" :key="key">
					<FormItem label="车架号">
						<Input :value="item.vin" readonly></Input>
					</FormItem>
					<FormItem label="查询时间">
						<Input :value="item.vin" readonly></Input>
					</FormItem>
					<FormItem label="支付金额">
						<Input :value="item.vin" readonly></Input>
					</FormItem>
					<FormItem label="报告版本" class="noborder">
						<Input :value="item.vin" readonly></Input>
						<a class="look" @click="look(item)">查看详情</a>
					</FormItem>
				</Form>
			</ul>
		</mt-loadmore>
	</div>
</div>
</template>

<script>
import Search from '@/components/common-search.vue'
export default {
	name: "my-report",
	components: { Search},
	data(){
		return{
			search: '',
			list: [
				{vin: 'LSF12345678UHG123'}
			],
			page: 1,
			total: 0,
			allLoaded: false
		}
	},
	mounted(){
		// this.getList()
	},
	methods:{
		getList(flag){
			this.axiosHxx.post( '', {
				page: this.page,
				limit: 10,
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
		look(item){

		}
	}
}
</script>

<style scoped lang="less">
.my-report{
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
		overflow: auto;
		.list{
			border-top: 10px solid #F3F3F3;
			.common-form{
				border-bottom: 10px solid #F3F3F3;
				.look{
					width:80px;
					height:24px;
					line-height: 24px;
					text-align: center;
					background: #FE8636;
					color: white;
					border-radius: 12px;
					position: absolute;
					right: 15px;
					top: 50%;
					transform: translateY(-50%);
					margin: 0;
				}
			}
		}
	}
}
</style>
