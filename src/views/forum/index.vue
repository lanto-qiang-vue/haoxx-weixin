<template>
<div class="boardList" style="height: 100%;">
    <div class='search'>
		<div class="z-search">
			<form action="javascript:;" class="common-search ">
				<i class="fa fa-search icon"></i>
				<input type="search" ref="input" v-model="search" placeholder="搜索话题"/>
				<i class="fa fa-times-circle close" v-show="search" @click="close"></i>
			</form>
		</div>
		<ul class="button">
			<router-link tag="li" to="/forum-board"><img src="/img/forum/icon-everyday.png"/><p>查选维修</p></router-link>
			<li><img src="/img/forum/icon-beautify.png"/><p>爱车美容</p></li>
			<li><img src="/img/forum/icon-maintenance.png"/><p>车辆维修</p></li>
			<li><img src="/img/forum/icon-refit.png"/><p>汽车改装</p></li>
			<li><img src="/img/forum/icon-doctor.png"/><p>车大夫</p></li>
			<li><img src="/img/forum/icon-speak.png"/><p>汽车杂谈</p></li>
		</ul>

		<div class="title">
			<span>热聊话题</span>
		</div>

    </div>
	<div class="content" style="padding-top: 171px;">
		<mt-loadmore :bottom-method="hotLoadBottom" :bottom-all-loaded="comments.allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="hotLoadmore">
			<ul class="commonList">
				<li v-for="item in comments.list">
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
	</div>

	<router-link tag="div" to="/forum-post" class="add-button"></router-link>

</div>

</template>

<script>

	export default {
		name: "index",
		data(){
			return{
				search:'',
				comments:{
					list: [],
					page: 1,
					total: 0,
					allLoaded: false
				},
			}
		},
		mounted(){
			this.getCarTalk();
			this.getHotTopic();
		},
		methods:{
			getCarTalk(){
				this.axiosHxx.post('/cartalk/plate/selectTopicPlate', {

				},{baseURL: '/qixiu-proxy'}).then( (res) => {

				})
			},
			getHotTopic(flag){
				this.axiosHxx.post('/cartalk/plate/selectTopicContentByHot', {
					page: this.comments.page,
					limit:1,
				},{baseURL: '/qixiu-proxy'}).then( (res) => {
					if(flag) this.$refs.hotLoadmore.onBottomLoaded()
					else this.comments.list=[]
					this.comments.total= res.data.total
					if(res.data.data&&res.data.data.length){
						for(let i in res.data.data){
							if(res.data.data[i]['path']){
								res.data.data[i]['paths']=res.data.data[i]['path'].split(',');
							}else{
								res.data.data[i]['paths']=[];
							}
						}
						let arr= res.data.data
						this.comments.list=this.comments.list.concat(arr)

						if(this.comments.list.length>=res.data.total){
							this.comments.allLoaded=true
						}else{
							this.comments.allLoaded=false
						}

					}else{
						this.comments.allLoaded=true
					}
				})
			},
			hotLoadBottom() {
				this.comments.page++
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
