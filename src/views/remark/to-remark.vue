<template>
<div class="to-remark">
	<div class="load-more">
		<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"
		             bottomPullText="加载更多" ref="loadmore">
			<ul class="list">
				<li v-for="(item, key) in list" :key="key" @click="goto(item)">
					<div class="head">
						{{item.name}}
					</div>
					<p>
						<label>车牌号：</label>{{item.card}}
					</p>
					<p>
						<label>结算时间：</label>{{item.time}}
						<a class="button" >去点评</a>
					</p>
				</li>
			</ul>
		</mt-loadmore>
	</div>
</div>
</template>

<script>
export default {
	name: "to-remark",
	data(){
		return{
			vehicle: '',
			list: [{name: '上海申海汽车修理有限公司', card: '沪AJ2238 ', time: '2019-06-06 10:00:00'}],
			page: 1,
			total: 0,
			allLoaded: false
		}
	},
	mounted(){
		// this.getList()
	},
	methods: {
		getList(flag) {
			this.axiosQixiu.post('/hxxdc/vehicle/bind/list', {
				vehiclePlateNumber: this.vehicle,
				pageNo: this.page,
				pageSize: 10,
			}, {hxxtoken: true}).then((res) => {
				if (res.data.code == '0') {
					if (flag) this.$refs.loadmore.onBottomLoaded()
					else this.list = []
					this.total = res.data.total
					if (res.data.items && res.data.items.length) {
						let arr = res.data.items
						this.list = this.list.concat(arr)
						if (this.list.length >= res.data.total) {
							this.allLoaded = true
						} else {
							this.allLoaded = false
						}
					} else {
						this.allLoaded = true
					}
				}
			})
		},
		loadBottom() {
			this.page++
			this.getList(true)
		},
		goto(item){

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
		padding-bottom: 60px;
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
