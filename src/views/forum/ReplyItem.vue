<template>
<ul class="forum-reply forum-comments">
	<li>
		<img class="head" src="/img/head.png">
		<div class="body">
			<p class="name">段军 <i class="fa fa-angle-right"></i> 186****5567</p>
			<div class="content">给小姨子的车去保养，矿物油卖全合成的价，车子是1.4L发动机，一般情况下只要加3L油就够了</div>
			<div class="info">
				<span class="support"><i class="fa fa-thumbs-o-up"></i>13</span>·
				<span>回复</span>·
				<span>04/19</span>
			</div>
		</div>
	</li>
	<p class="more">展开其他10条回复</p>
</ul>
</template>

<script>
export default {
	name: "forum-reply",

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
