<template>
<ul class="reply-item forum-comments">
	<li v-for="(item, index) in showList" :key="index">
		<img class="head" :src="item.pic || '/img/head.png'">
		<div class="body">
			<p class="name">{{item.replyname}} <i class="fa fa-angle-right"></i> {{item.replytousername}}</p>
			<div class="content" v-html="item.content.replace(/\n/g,'<br/>')"></div>
			<div class="info">
				<thumb-up class="support" :num="item.praise" :self="!!item.ispraise"
				          :id="item.id" type="2"></thumb-up>·
				<span @click="toReply(item)">回复</span>·
				<span>{{item.createDate | TimeAgo}}</span>
			</div>
		</div>
	</li>
	<p class="more" v-show="leftNum> 0" @click="open">展开其他{{leftNum}}条回复</p>
</ul>
</template>

<script>
import ThumbUp from './ThumbUp.vue'

export default {
	name: "reply-item",
	components: { ThumbUp},
	props: {
		'data': {
			default: ()=> []
		},
		'num': {
			default: 0
		},
		'id': {
			default: 0
		},
	},
	data(){
		return{
			list: [],
			addList: [],
			page: 0,
			total: 0
		}
	},
	computed:{
		showList(){
			return this.list.length? this.list: this.addList.concat(this.data)
			// return this.data.concat(this.list)
		},
		leftNum(){
			return this.total- this.showList.length
		}
	},
	mounted(){
		this.total= this.num
	},
	methods:{
		toReply(item){
			this.$emit('onreply', item);
		},
		open(){
			this.page++
			this.getList()
		},
		pushList(item){
			this.total++
			if(this.list.length){
				this.list.push(item)
			}else{
				this.addList.push(item)
			}

		},
		getList(){
			this.axiosHxx.post('/topic/carcircles/allreply', {
				page: this.page,
				commentId: this.id,
				limit:10,
			},{baseURL: '/hxx-gateway-proxy'}).then( (res) => {
				if(res.data.success && res.data.data&&res.data.data.length){
					this.total= res.data.total
					let arr= res.data.data
					this.list=this.list.concat(arr)
				}
			})

		}
	}
}
</script>

<style scoped lang="less">
@import './forum.less';
.reply-item{
	overflow: hidden;
	li{
		border-top: 1px solid #D9D9D9;
		border-bottom: 0;
		padding-left: 30px;
		.head{
			width: 24px;
			height: 24px;
		}
	}
	.more{
		line-height: 30px;
		font-size: 13px;
		color: #FF6D0E;
		border-top: 1px solid #D9D9D9;
	}
}
</style>
<style lang="less">
.reply-item{
	.support i{
		margin-right: 2px;
	}
}
</style>
