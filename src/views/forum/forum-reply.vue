<template>
<div class="all-reply">
	<ul class="forum-comments">
		<li>
			<img class="head" src="/img/head.png">
			<div class="body">
				<p class="name">186****5567</p>
				<div class="content">给小姨子的车去保养，矿物油卖全合成的价，车子是1.4L发动机，一般情况下只要加3L油就够了</div>
				<div class="info">
					<span class="support"><i class="fa fa-thumbs-o-up"></i>13</span>·
					<span>回复</span>·
					<span>04/19</span>
				</div>
				<reply-item></reply-item>
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

		}
	},
	mounted(){

	},
	methods: {

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

