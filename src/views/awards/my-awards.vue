<template>
<div class="my-awards">
	<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
		<ul class="list">
			<li v-for="(item, key) in list" :key="key">
				<img :src="`/img/turntable/${item.awardKey}.png`" />
				<div class="info">
					<h1>{{item.awardName}}</h1>
					<p>中奖时间：{{item.drawnTime}}</p>
					<p>有效期至：{{item.expiryTime}}</p>
					<a :class="{on: canGet(item)}" @click="toGet(item)"
					>{{canGet(item)? '立即领取': item.expired? '已过期': '已领取'}}</a>
				</div>
			</li>
		</ul>
	</mt-loadmore>
	<a class="tips">奖品有效期间未领取，过期将作废</a>


</div>
</template>

<script>
export default {
	name: "my-awards",
	data(){
		return{
			list: [],
			page: 1,
			total: 0,
			allLoaded: false
		}
	},
	mounted(){
		this.getList()
	},
	methods:{
		canGet({expired, status}){
			return !expired&& status==1
		},
		toGet(item){
			if(this.canGet(item)){
				this.$router.push('/get-awards?id='+ item.recordId)
			}
		},
		getList(flag){
			this.axiosQixiu.get( '/lucky-draw/getAwardsByUser', {
				baseURL: '/laozhao-api',
				hxxtoken: true,
				params:{
					pageIndex: this.page,
					pageSize: 10,
				}
			},{baseURL: '/hxx-gateway-proxy'}).then( (res) => {
				if(flag) this.$refs.loadmore.onBottomLoaded()
				else this.list=[]
				this.total= res.data.count
				if(res.data.rows&&res.data.rows.length){
					let arr= res.data.rows
					this.list= this.list.concat(arr)
					if(this.list.length>=res.data.count){
						this.allLoaded=true
					}else{
						this.allLoaded=false
					}
				}else{
					this.allLoaded=true
				}
			})
		},
		loadBottom() {
			this.page++
			this.getList( true)
		},
	}
}
</script>

<style scoped lang="less">
.my-awards{
	height: 100vh;
	overflow: auto;
	background-color: #F8F8F8;
	.list{
		li{
			margin-bottom: 10px;
			background-color: white;
			position: relative;
			overflow: hidden;
			padding: 15px;
			height: 110px;
			&:last-child{
				margin-bottom: 20px;
			}
			img{
				position: absolute;
				margin: 15px;
				width: 80px;
				height: 80px;
				border: 1px solid #cccccc;
				border-radius: 3px;
				overflow: hidden;
				left: 0;
				top: 0;
				object-fit: contain;
			}
			.info{
				padding-left: 90px;
				/*position: relative;*/
				h1{
					font-size: 16px;
					color: #333333;
					margin-bottom: 10px;
					font-weight: 400;
				}
				p{
					font-size: 13px;
					color: #666666;
					line-height: 22px;
				}
				a{
					position: absolute;
					top: 50%;
					right: 8px;
					transform: translateY(-50%);
					font-size: 12px;
					color: white;
					padding: 5px 10px;
					border-radius: 3px;
					background-color: #999999;
					&.on{
						background:linear-gradient(90deg,rgba(255,151,56,1),rgba(255,187,106,1));
					}
				}
			}
		}
	}
	.tips{
		display: block;
		line-height: 20px;
		text-align: center;
		width: 100%;
		color: #333333;
		font-size: 12px;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: white;
		opacity: .7;
	}
}
</style>
