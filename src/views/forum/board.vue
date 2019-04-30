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
			<span class="active">热聊话题</span>
			<span>最新话题</span>
		</div>

    </div>
	<div class="content">
		<ul class="themeList">
			<li>
				<p>今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li style="background: url(/img/bank-01.png) no-repeat center center;background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/bank-01.png) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/bank-01.png) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/bank-01.png) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
					<li style="background: url(/img/bank-01.png) no-repeat center center; background-size:cover;"><img src="/img/bank-01.png"></li>
				</ul>
				<div class="listFooter">
					<span>186****5567 · 5分钟前</span>
					<span class="left">50个评论</span>
					<span class="right">去参与</span>
				</div>
			</li>
			<li>
				<p>今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li><img src="/img/bank-01.png" alt=""></li>
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>
				</ul>
				<div class="listFooter">
					<span>186****5567 · 5分钟前</span>
					<span class="left">50个评论</span>
					<span class="right">去参与</span>
				</div>
			</li>
			<li>
				<p>今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li><img src="/img/bank-01.png" alt=""></li>
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>
				</ul>
				<div class="listFooter">
					<span>186****5567 · 5分钟前</span>
					<span class="left">50个评论</span>
					<span class="right">去参与</span>
				</div>
			</li>
			
		</ul>
	</div>
	
</div>
</template>

<script>
export default {
	name: "board",
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

</style>
