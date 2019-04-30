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
			<li><img src="/img/forum/icon-everyday.png"/><p>查选维修</p></li>
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
		<ul class="themeList">
			<li>
				<p>今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center;background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
				</ul>
				<div class="list-content">
					日常养护
				</div>
				<div class="listFooter">
					<span>186****5567 · 5分钟前</span>
					<span class="left">50个评论</span>
					<span class="right">去参与</span>
				</div>
			</li>
			<li>
				<p>今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center;background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
				</ul>
				<div class="list-content">
					日常养护
				</div>
				<div class="listFooter">
					<span>186****5567 · 5分钟前</span>
					<span class="left">50个评论</span>
					<span class="right">去参与</span>
				</div>
			</li>
			<li>
				<p>今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center;background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
				</ul>
				<div class="list-content">
					日常养护
				</div>
				<div class="listFooter">
					<span>186****5567 · 5分钟前</span>
					<span class="left">50个评论</span>
					<span class="right">去参与</span>
				</div>
			</li>
			<li>
				<p>今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center;background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/maintain/shqxw.jpg) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
				</ul>
				<div class="list-content">
					日常养护
				</div>
				<div class="listFooter">
					<span>186****5567 · 5分钟前</span>
					<span class="left">50个评论</span>
					<span class="right">去参与</span>
				</div>
			</li>
			
		</ul>
	</div>

	<div class="add-button">
		<i class="top"></i>
		<i class="bottom"></i>
	</div>
	
</div>

</template>

<script>
	export default {
		name: "index",
		data(){
			return{
				search:'',
			}
		},
		methods:{
			close(){

			}
		}
	}
</script>

<style scoped lang='less'>
.add-button{
	width:48px;
	height:48px;
	background:rgba(255,109,14,1);
	position: fixed;
	bottom:69px;
	right: 10px;
	border-radius: 48px;
	.top{
		width: 24px;
		border: 1px #fff solid;
		position:absolute;
		top:24px;
		left:12px;
	}
	.bottom{
		height: 24px;
		border: 1px #fff solid;
		position:absolute;
		top:12px;
		left:23px;
	}
}
</style>
