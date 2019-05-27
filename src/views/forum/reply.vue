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
					<thumb-up class="support" :num="item.praise" :self="!!item.ispraise"
					          :id="item.id" type="1"></thumb-up>·
					<span @click="reply(item, true)">回复</span>·
					<span>{{item.createDate | TimeAgo}}</span>
				</div>
				<reply-item :data="item.replys" :num="item.number" :id="item.id" @onreply="reply"
					:ref="`replyitem${item.id}`" :class="'replyitem'+item.id"></reply-item>
			</div>
		</li>
	</ul>

	<reply-input :init-show="initShowInput" ref="reply" @reply="setComment"></reply-input>
</div>
</template>

<script>
import ThumbUp from './part/ThumbUp.vue'
import ReplyItem from './part/ReplyItem.vue'
import ReplyInput from './part/ReplyInput.vue'
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
				contentId: this.id || this.$route.query.id,
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
		reList(){
			this.page= 1
			this.total= 0
			this.list=[]
			this.getList()
		},
		loadMore(){
			this.page++
			this.getList(true)
		},
		reply(item, toComment){
			this.$refs.reply.open(toComment?item.nickname: item.replytousername).then((val)=>{
				this.axiosHxx.post('/cartalk/topic/reply',{ reply: {
						replyId: item.id,
						content: val,
						businessflag: toComment?4 :3
					}}, {baseURL: '/hxx-gateway-proxy'}).then(res=>{
					if(res.data.success){
						this.$toast('回复成功')
						this.$refs.reply.close()
						console.log('this.$refs.replyitem', this.$refs)
						console.log('res', res)
						console.log('this.$refs[`replyitem${res.data.data.commentId}`]',
							this.$refs[`replyitem${res.data.data.commentId}`])
						this.$refs[`replyitem${res.data.data.commentId}`][0].pushList(res.data.data)
					}
				})
			})
		},
		setComment( val){
			this.axiosHxx.post('/cartalk/topic/comment',{ comment: {
					contentId: this.$route.query.id,
					content: val,
				}}, {baseURL: '/hxx-gateway-proxy'}).then(res=>{
				if(res.data.success){
					this.$toast('评论成功')
					this.$refs.reply.close()
					this.list.push(res.data.data)
				}
			})
		}
	},
}
</script>

<style scoped lang="less">
@import './part/forum.less';
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
