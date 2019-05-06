<template>
<div class="my-post">
	<ul class="tab">
		<li :class="{on: active=='1'}" @click="active='1'"><span>我发布的</span></li>
		<li :class="{on: active=='2'}" @click="active='2'"><span>我评论的</span></li>
	</ul>
	<mt-tab-container v-model="active" :swipeable=true>
		<mt-tab-container-item id="1">

				<ul class="commonList">
				<li>
					<p>今日头条新闻今日头条新闻今日头条新闻???</p>
					<div class="list-content">
						日常养护
					</div>
					<div class="listFooter">
						<span>186****5567 · 5分钟前</span>
						<span class="left z-left">50个评论</span>
					</div>
				</li>
				<li>
					<p>今日头条新闻今日头条新闻今日头条新闻???</p>
					<div class="list-content">
						日常养护
					</div>
					<div class="listFooter">
						<span>186****5567 · 5分钟前</span>
						<span class="left z-left">50个评论</span>
					</div>
				</li>
				<li>
					<p>今日头条新闻今日头条新闻今日头条新闻???</p>
					<div class="list-content">
						日常养护
					</div>
					<div class="listFooter">
						<span>186****5567 · 5分钟前</span>
						<span class="left z-left">50个评论</span>
					</div>
				</li>
			</ul>

		</mt-tab-container-item>
		<mt-tab-container-item id="2">
			<ul class="commonList">
				<li>
					<p>今日头条新闻今日头条新闻今日头条新闻???</p>
					<div class="list-content">
						日常养护
					</div>
					<div class="listFooter">
						<span>186****5567 · 5分钟前</span>
						<span class="left z-left">50个评论</span>
					</div>
				</li>
			</ul>
		</mt-tab-container-item>

	</mt-tab-container>
</div>
</template>

<script>
import { TabContainer, TabContainerItem, Navbar, TabItem } from 'mint-ui';
export default {
	name: "my-post",
	data(){
		return{
			active:'1',
			post:{
				list: [],
				page: 1,
				total: 0,
				allLoaded: false
			},
			reply:{
				list: [],
				page: 1,
				total: 0,
				allLoaded: false
			},

		}
	},
	mounted() {
		this.getPostList()
	},
	methods:{
		getPostList(flag){
			this.axiosHxx.post('', {

			}).then( (res) => {
				if(flag) this.$refs.postLoadmore.onBottomLoaded()
				else this.post.list=[]
				this.post.total= res.data.total
				if(res.data.items&&res.data.items.length){
					let arr= res.data.items
					this.post.list=this.post.list.concat(arr)

					if(this.post.list.length>=res.data.total){
						this.post.allLoaded=true
					}else{
						this.post.allLoaded=false
					}

				}else{
					this.post.allLoaded=true
				}
			})
		},

		postLoadBottom() {
			this.post.page++
			this.getList(true)
		},
	}
}
</script>
<style scoped lang='less'>
@import './forum.less';
.commonList li .listFooter .z-left{
right: 15px;
}
.my-post{
	.tab{
		padding: 0 10px;
		overflow: hidden;
		border-bottom:5px #D9D9D9 solid;
		li{
			width: 50%;
			float: left;
			text-align: center;
			font-size: 16px;
			color: #333333;

			span{
				width:70px;
				display: inline-block;
				margin: 0 auto;
				padding: 10px 0;
			}
		}

		li.on span{
			color: #FF6D0E;
			border-bottom: 2px #FF6D0E solid;
		}
	}
}
</style>
