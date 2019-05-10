<template>
<ul class="forum-reply forum-comments">
	<li v-for="(item, index) in showList" :key="index">
		<img class="head" src="/img/head.png">
		<div class="body">
			<p class="name">{{item.replyname}} <i class="fa fa-angle-right"></i> {{item.replytousername}}</p>
			<div class="content" v-html="item.content.replace(/\n/g,'</br>')"></div>
			<div class="info">
				<span class="support"><i class="fa fa-thumbs-o-up"></i>{{item.praise}}</span>·
				<span>回复</span>·
				<span>{{item.createDate}}</span>
			</div>
		</div>
	</li>
	<p class="more">展开其他10条回复</p>
</ul>
</template>

<script>
export default {
	name: "forum-reply",
	props: {
		'data': {
			default: ()=> []
		},
		'total': {
			default: 0
		},
	},
	data(){
		return{
			list: []
		}
	},
	computed:{
		showList(){
			return this.data.concat(this.list)
		}
	}
}
</script>

<style scoped lang="less">
@import './forum.less';
.forum-reply{
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
