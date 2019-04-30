<template>
<div class="queryList">
    <div class='search'>
			<div class="z-search">
				<form action="javascript:;" class="common-search ">
					<i class="fa fa-search icon"></i>
					<input type="search" ref="input" v-model="search" placeholder="搜索话题"/>
					<i class="fa fa-times-circle close" v-show="search" @click="close"></i>
				</form>
			</div>
			
    </div>
	<div class="content">
		<div class="title">
			热聊话题
		</div>
		<ul class="themeList">
			<li>
				今日头条新闻
			</li>
			<li>
				今日头条新闻
			</li>
			<li>
				今日头条新闻
			</li>
		</ul>
		<div class="title z-title">
			搜索记录
			<div class="clear">清空</div>
		</div>
		<ul class="themeList">
			<li>
				今日头条新闻
				<i class="fa fa-times z-fa"></i>
			</li>

		</ul>
	</div>

</div>
</template>

<script>
export default {
	name: "query",
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
