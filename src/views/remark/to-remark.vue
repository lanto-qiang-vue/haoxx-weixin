<template>
<div class="to-remark">
	<div class="load-more">
		<!--<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"-->
		             <!--bottomPullText="加载更多" ref="loadmore">-->
			<ul class="list">
				<li v-for="(item, key) in list" :key="key" @click="goto(item)">
					<div class="head">
						{{item.companyName}}
					</div>
					<p>
						<label>车牌号：</label>{{item.vpn}}
					</p>
					<p>
						<label>结算时间：</label>{{item.settleDate}}
						<a class="button" >去点评</a>
					</p>
				</li>
			</ul>
		<!--</mt-loadmore>-->
	</div>
</div>
</template>

<script>
export default {
	name: "to-remark",
	data(){
		return{
			list: [],
		}
	},
	mounted(){
		this.getList()
	},
	methods: {
		getList() {
			this.axiosQixiu.get('/hxxdc/vehicle/to/comment/list', {hxxtoken: true}).then((res) => {
				if (res.data.code == '0') {
					this.list = res.data.items
				}
			})
		},
		goto({corpId, uniqueId, companyCode, vpn}){
			this.$router.push({
				path: '/remark',
				query:{
					repairId: uniqueId,
					vehicleNum: vpn,
					corpId,
					companyCode,
				}
			})
		}
	}
}
</script>

<style scoped lang="less">
.to-remark {
	background-color: #fff;
	height: 100vh;
	overflow: auto;
	width: 100%;
	box-sizing: border-box;
	.load-more {
		height: 100vh;
		overflow: auto;
		.list {
			li {
				border-bottom: 10px solid #F3F3F3;
				font-size: 14px;
				padding-left: 15px;
				padding-bottom: 10px;
				.head{
					color: #333333;
					font-size: 14px;
					padding-right: 15px;
					border-bottom: 1px solid #D9D9D9;
					line-height: 40px;
					margin-bottom: 10px;
				}
				p {
					font-size: 12px;
					line-height: 30px;
					color: #666666;
					padding-right: 15px;
					overflow: hidden;
					label {
						color: #999999;
					}
					.button{
						color: #FF6D0E;
						background-color: #F2F2F2;
						font-size: 12px;
						display: inline-block;
						float: right;
						line-height: 22px;
						padding: 0 15px;
						border-radius: 18px;
						margin-top: 4px;
					}
				}
			}
		}
	}
}
</style>
