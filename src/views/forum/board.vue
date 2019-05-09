<template>
<div class="boardList">
    <div class='search'>
		<div class="z-search">
			<form action="javascript:;" class="common-search ">
				<i class="fa fa-search icon"></i>
				<input type="search" ref="input" v-model="search" placeholder="搜索话题"/>
				<i class="fa fa-times-circle close" v-show="search" @click="close"></i>
			</form>
		</div>

		<div class="title">
			<span :class="{active: active=='1'}" @click="active='1',getHotTopic(),hotComments.page=1">热聊话题</span>
			<span :class="{active: active=='2'}" @click="active='2',getNewTopic(),newComments.page=1">最新话题</span>
		</div>

    </div>
	<div class="content">
		<mt-tab-container v-model="active" :swipeable=true>
			<mt-tab-container-item id="1">
					<mt-loadmore :bottom-method="hotLoadBottom" :bottom-all-loaded="hotComments.allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="hotLoadmore">
						<ul class="commonList">
							<li v-for="item in hotComments.list">
								<div class="common-header">
									<img src="/img/head.png" alt="">
									<span>{{item.nickname}}</span>
								</div>
								<p>{{item.content}}</p>
								<div class="imgGroup" v-if="item.paths.length>0">
									<div v-for="img in item.paths" class="imgBox" :style="{backgroundImage:'url(' + img + ')'}"></div>
								</div>
								<div class="listFooter">
									<span class="center" :style="{ color: item.colour}">{{item.topicContent}}</span>
									<span>{{item.pastTime}}</span>
									<span class="left">{{item.number}}个评论</span>
									<span class="right">去参与</span>
								</div>
							</li>
						</ul>
				</mt-loadmore>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<mt-loadmore :bottom-method="newLoadBottom" :bottom-all-loaded="newComments.allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="newLoadmore">
						<ul class="commonList">
							<li v-for="item in newComments.list">
								<div class="common-header">
									<img src="/img/head.png" alt="">
									<span>{{item.nickname}}</span>
								</div>
								<p>{{item.content}}</p>
								<div class="imgGroup" v-if="item.paths.length>0">
									<div v-for="img in item.paths" class="imgBox" :style="{backgroundImage:'url(' + img + ')'}"></div>
								</div>
								<div class="listFooter">
									<span class="center" :style="{ color: item.colour}">{{item.topicContent}}</span>
									<span>{{item.pastTime}}</span>
									<span class="left">{{item.number}}个评论</span>
									<span class="right">去参与</span>
								</div>
							</li>
						</ul>
						</mt-loadmore>
			</mt-tab-container-item>

		</mt-tab-container>
		
	</div>
	<div class="add-button"></div>
</div>
</template>

<script>
import { TabContainer, TabContainerItem, Navbar, TabItem } from 'mint-ui';
export default {
	name: "board",
	data(){
		return{
			search:'',
			active:'1',
			hotComments:{
				list: [],
				page: 1,
				total: 0,
				allLoaded: false
			},
			newComments:{
				list: [],
				page: 1,
				total: 0,
				allLoaded: false
			},
		}
	},
	mounted(){
		this.getHotTopic()
	},
	methods:{
		getNewTopic(flag){
			this.axiosHxx.post('/cartalk/plate/selectTopicContentByTime', {
				page: this.newComments.page,
				limit:1,
			},{baseURL: '/qixiu-proxy'}).then( (res) => {
				if(flag) this.$refs.newLoadmore.onBottomLoaded()
					else this.newComments.list=[]
					this.newComments.total= res.data.total
					if(res.data.data&&res.data.data.length){
						for(let i in res.data.data){
							if(res.data.data[i]['path']){
								res.data.data[i]['paths']=res.data.data[i]['path'].split(',');
							}else{
								res.data.data[i]['paths']=[];
							}
						}
						let arr= res.data.data
						this.newComments.list=this.newComments.list.concat(arr)

						if(this.newComments.list.length>=res.data.total){
							this.newComments.allLoaded=true
						}else{
							this.newComments.allLoaded=false
						}

					}else{
						this.newComments.allLoaded=true
					}
				
			})
		},
		newLoadBottom() {
			this.newComments.page++
			this.getNewTopic(true)
		},
		getHotTopic(flag){
			this.axiosHxx.post('/cartalk/plate/selectTopicContentByHot', {
				page: this.hotComments.page,
				limit:1,
			},{baseURL: '/qixiu-proxy'}).then( (res) => {
				if(flag) this.$refs.hotLoadmore.onBottomLoaded()
					else this.hotComments.list=[]
					this.hotComments.total= res.data.total
					if(res.data.data&&res.data.data.length){
						for(let i in res.data.data){
							if(res.data.data[i]['path']){
								res.data.data[i]['paths']=res.data.data[i]['path'].split(',');
							}else{
								res.data.data[i]['paths']=[];
							}
						}
						let arr= res.data.data
						this.hotComments.list=this.hotComments.list.concat(arr)

						if(this.hotComments.list.length>=res.data.total){
							this.hotComments.allLoaded=true
						}else{
							this.hotComments.allLoaded=false
						}

					}else{
						this.hotComments.allLoaded=true
					}
				})
		},
		hotLoadBottom() {
			this.hotComments.page++
			this.getHotTopic(true)
		},
		close(){

		}
	}
}
</script>

<style scoped lang='less'>
	@import './forum.less';
.boardList {
  background-color: #fff;
  height: 100vh;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  .search {
    width: 100%;
    background: #fff;
	position: fixed;
	top:0px;
	left:0px;
	box-sizing: border-box;
	z-index:20;
    .z-search{
		padding: 5px 15px;
	}
	.title {
		box-sizing: border-box;
		padding:12px 0 5px 15px;
		width: 100%;
		line-height: 20px;
		color: #666;
		font-size:14px;
		font-weight:500;
		overflow: hidden;
		border-top: 8px #F3F3F3 solid;
		span{
			padding-right: 20px;
		}
		.active{
			color: #FF6D0E;
		}
	}
  .button{
		padding:7px 0 0 7px;
    overflow: auto;
    white-space:nowrap;
		li{
			padding: 0 8px;
			display: inline-block;
			text-align: center;
      overflow: hidden;
			margin-bottom: 14px;
			img{
				width: 100%;
				max-width: 38px;
			}
			p{
				color: #333333;
        padding-top: 6px;
				font-size: 12px;
        line-height: 17px;
			}
		}
	}

  }
  .content{
	  background: #fff;
	  box-sizing: border-box;
	  padding-top: 85px;

}
}
</style>
