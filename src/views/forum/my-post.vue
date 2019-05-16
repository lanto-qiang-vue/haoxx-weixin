<template>
<div class="my-post">
	<ul class="tab">
		<li :class="{on: active=='1'}" @click="active='1'"><span>我发布的</span></li>
		<li :class="{on: active=='2'}" @click="active='2'"><span>我评论的</span></li>
	</ul>
	<mt-tab-container v-model="active" :swipeable=true>
		<mt-tab-container-item id="1">
			<div class="load-more">
				<mt-loadmore :bottom-method="postLoadBottom" :bottom-all-loaded="post.allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="postLoadmore">
				<ul class="list">
					<router-link tag="li" v-for="(item,index) in post.list" :key="index"
						:to="'/topic?id='+ item.bbsTopicId">
						<p class="head">{{item.title}}</p>
						<div class="content" :style="{ color: item.colour}">{{item.bbsTopicName}}</div>
						<div class="foot">
							<span>发布于：{{item.createDate | TimeAgo}}</span>
							<span class="right">{{item.number}}个评论</span>
						</div>
					</router-link>
				</ul>
				</mt-loadmore>
			</div>
		</mt-tab-container-item>
		<mt-tab-container-item id="2">
			<div class="load-more">
			<mt-loadmore :bottom-method="replyLoadBottom" :bottom-all-loaded="reply.allLoaded" :autoFill="false"
			             bottomPullText="加载更多"   ref="replyLoadmore">
			<ul class="list">
				<li tag="li" v-for="(item,index) in reply.list" :key="index">
					<p class="head">{{item.title}}</p>
					<div class="content" :style="{ color: item.colour}">{{item.topicName}}</div>
					<div class="foot">
						<span>评论于：{{item.createDate | TimeAgo}}</span>
					</div>
				</li>
			</ul>
			</mt-loadmore>
			</div>
		</mt-tab-container-item>

	</mt-tab-container>
</div>
</template>

<script>
import { TabContainer, TabContainerItem, Navbar, TabItem } from 'mint-ui';
import TopicsItem from './part/TopicsItem.vue'
export default {
	name: "my-post",
	components: {TopicsItem },
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
	watch:{
		active(val){
			if(val=='2' && !this.reply.list.length){
				this.getPostList('reply')
			}
		}
	},
	mounted() {
		this.getPostList('post')
	},
	methods:{
		getPostList(type ,flag){
			let url= '', thisList= this[type]
			switch (type){
				case 'post':{
					url= '/cartalk/topic/myrelease'
					break
				}
				case 'reply':{
					url= '/cartalk/topic/mycommentlist'
					break
				}
			}
			this.axiosHxx.post( url, {
				page: thisList.page,
				limit:10,
			},{baseURL: '/hxx-gateway-proxy'}).then( (res) => {
				if(flag) this.$refs[type+ 'Loadmore'].onBottomLoaded()
				else thisList.list=[]
				thisList.total= res.data.total
				if(res.data.data&&res.data.data.length){
					let arr= res.data.data
					thisList.list= thisList.list.concat(arr)
					if(thisList.list.length>=res.data.total){
						thisList.allLoaded=true
					}else{
						thisList.allLoaded=false
					}
				}else{
					thisList.allLoaded=true
				}
			})
		},
		postLoadBottom() {
			this.post.page++
			this.getPostList('post', true)
		},
		replyLoadBottom() {
			this.reply.page++
			this.getPostList('reply', true)
		},
	}
}
</script>
<style scoped lang='less'>
.my-post{
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
			width: 120px;
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
	.load-more{
		height: 100vh;
		padding-top: 50px;
		overflow: auto;
	}
	.list{
		padding-left: 15px;
		font-size: 14px;
		li{
			border-bottom: 1px solid #D9D9D9;
			padding: 10px 0;
			.head{
				padding-bottom: 10px;
				/*line-height:18px;*/
				img{
					width:18px;
					height:18px;
					border-radius: 100%;
					overflow: hidden;
					vertical-align: middle;
				}
				span{
					padding-left: 10px;
					font-size:12px;
					color: #666666;
					/*line-height:17px;*/
				}
			}
			.content{
				line-height: 20px;
				word-break: break-all;
				color: #FE8636;
				margin-bottom:5px;
			}
			.img-group{
				overflow: auto;
				padding: 5px 0;
				white-space:nowrap;
				img{
					width:60px;
					height:60px;
					border-radius:3px;
					margin-right:5px;
					display:inline-block;
					object-fit: cover;
				}
			}
			.foot{
				position: relative;
				margin-top: 5px;
				height: 20px;
				line-height: 20px;
				span{
					font-size:12px;
					color:#999999;
				}
				.center{
					/*line-height: 17px;*/
					color: #FE8636;
					padding-right: 10px;
				}
				.right{
					height: 20px;
					line-height: 20px;
					position: absolute;
					top: 0;
					right: 10px;
					color: #666;
				}
			}
		}
	}
}
</style>
