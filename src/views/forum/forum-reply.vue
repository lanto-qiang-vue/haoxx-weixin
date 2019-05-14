<template>
<div class="all-reply">
	<ul class="forum-comments"
		v-infinite-scroll="loadMore"
		infinite-scroll-disabled="allLoaded"
		infinite-scroll-distance="30">
		<li v-for="(item, index) in list" :key="index">
			<img class="head" src="/img/head.png">
			<div class="body">
				<p class="name">{{item.nickname}}</p>
				<div class="content" v-html="item.commentContent.replace(/\n/g,'<br/>')"></div>
				<div class="info">
					<!--<span class="support"><i class="fa fa-thumbs-o-up"></i>{{item.praise}}</span>·-->
					<thumb-up class="support" :num="item.praise"></thumb-up>·
					<span @click="reply(item)">回复</span>·
					<span>{{item.createDate | TimeAgo}}</span>
				</div>
				<reply-item :data="item.replys" :num="item.number" :id="item.id" @onreply="reply"></reply-item>
			</div>
		</li>
	</ul>

	<reply-input :init-show="initShowInput" ref="reply" @reply="replySubmit"></reply-input>
</div>
</template>

<script>
import ThumbUp from './ThumbUp.vue'
import ReplyItem from './ReplyItem.vue'
import ReplyInput from './ReplyInput.vue'
export default {
	name: "forum-reply",
	components: {ReplyItem, ReplyInput, ThumbUp},
	props: {
		'initShowInput': {
			default: true
		},
		'id': {
			default: ''
		},
		'userid': {
			default: ''
		},
		isIndex: {
			default: false
		},
		limit: {
			default: 10
		},
	},
	data(){
		return{
			list:[],
			page: 0,
			total: 0,
			allLoaded: false
		}
	},
	mounted(){
		// this.getList()
	},
	methods: {
		getList(flag){
			this.axiosHxx.post('/topic/carcircles/comment', {
				contentId: this.id,
				page: this.page,
				limit: this.limit,
			},{baseURL: '/hxx-gateway-proxy', noIndicator: true}).then( (res) => {
				if(res.data.success){
					let datas= res.data.data
					if(!flag) this.list=[]
					this.total= res.data.total
					if(datas && datas.length){
						this.list=this.list.concat(datas)
						if(this.list.length>=res.data.total  || this.isIndex){
							this.allLoaded= true
						}else{
							this.allLoaded= false
						}
					}else{
						this.allLoaded= true
					}
				}
			})
		},
		loadMore(){
			this.page++
			this.getList(true)
		},
		reply(item){
			this.$refs.reply.open(2, item)
		},
		replySubmit(type, item, content){
			console.log('type, item, content', type, item, content)
			let data= {
				content: content,
				businessId: type,
				commentUserId: this.$store.state.user.userinfo.userId,
			}
			switch(type){
				case 1:{
					data.contentId= this.id|| this.$route.query.id
					data.receiveUserId= this.userid || this.$route.query.userid
					break
				}
				case 2:{
					data.commentId= item.id
					data.receiveUserId= item.replyid || item.userId
					break
				}
			}
			this.axiosHxx.post('/cartalk/topic/comment',{data: data}, {baseURL: '/hxx-gateway-proxy'}).then(res=>{
				if(res.data.success){
					this.$toast('评论成功')
					this.$refs.reply.close()
				}
			})

		}
	},
}
</script>

<style scoped lang="less">
@import './forum.less';
.all-reply{
	padding: 0 0 50px 15px;
	position: relative;
}
</style>
<style lang="less">
.all-reply{
	.support i{
		margin-right: 2px;
	}
}
</style>
