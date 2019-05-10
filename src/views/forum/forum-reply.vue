<template>
<div class="all-reply">
	<ul class="forum-comments">
		<li v-for="(item, index) in list" :key="index">
			<img class="head" src="/img/head.png">
			<div class="body">
				<p class="name">{{item.nickname}}</p>
				<div class="content" v-html="item.commentContent.replace(/\n/g,'</br>')"></div>
				<div class="info">
					<span class="support"><i class="fa fa-thumbs-o-up"></i>{{item.praise}}</span>·
					<span>回复</span>·
					<span>{{item.createDate}}</span>
				</div>
				<reply-item :data="item.replys" :total="item.number"></reply-item>
			</div>
		</li>
	</ul>

	<reply-input :hide-input="hideInput"></reply-input>
</div>
</template>

<script>
import ReplyItem from './ReplyItem.vue'
import ReplyInput from './ReplyInput.vue'
export default {
	name: "forum-reply",
	components: {ReplyItem, ReplyInput},
	props: {
		'hideInput': {
			default: false
		},
		'id': {
			default: ''
		},
	},
	data(){
		return{
			list:[],
			page: 1,
			total: 0
		}
	},
	mounted(){
		this.getList()
	},
	methods: {
		getList(){
			this.axiosHxx.post('/topic/carcircles/comment', {
				contentId: this.id,
				page: this.page,
				limit: 10,
			},{baseURL: '/hxx-gateway-proxy'}).then( (res) => {
				if(res.data.success){
					this.list= res.data.data
					this.total= res.data.total
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

