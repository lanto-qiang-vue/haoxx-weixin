<template>
<div class="queryList">
    <div class='search'>
		<search placeholder="搜索话题" @enter="enter" v-model="search" ref="search"></search>
    </div>
	<div class="content">
		<div class="title">热聊话题</div>
		<ul class="list">
			<li v-for="item in comments">{{item.title}}</li>
		</ul>
		<div class="title">
			搜索记录<div class="clear">清空</div>
		</div>
		<ul class="list">
			<li>今日头条新闻<i class="fa fa-times z-fa"></i></li>
		</ul>
	</div>
</div>
</template>

<script>
import Search from '@/components/common-search.vue'
export default {
	name: "query",
	components: { Search},
	data(){
		return{
			search:'',
			comments:[]
		}
	},
	mounted(){
		this.getHotTopic();
		this.$refs.search.focus()
	},
	methods:{
		getHotTopic(){
			this.axiosHxx.post('/cartalk/plate/selectTopicContentByHot', {
				page: 1,
				limit:5,
			},{baseURL: '/qixiu-proxy'}).then( (res) => {
				if(res.data.data&&res.data.data.length){
					this.comments=res.data.data;
				}
			})
		},
		enter(val){
			console.log('enter(val)', val)
			console.log('search', this.search)
		}
	}
}
</script>
<style lang='less'>
</style>
<style scoped lang='less'>
.queryList {
	background-color: #fff;
	height: 100vh;
	overflow: auto;
	width: 100%;
	box-sizing: border-box;
	.search {
		width: 100%;
		background: #fff;
		position: fixed;
		z-index:20;
		top: 0;
		left: 0;
		box-sizing: border-box;
		padding: 5px 15px;
		border-bottom: 10px #F3F3F3 solid;
	}
	.content{
		background: #fff;
		box-sizing: border-box;
		padding: 50px 0 0 15px;
		.title {
			margin-top: 10px;
			box-sizing: border-box;
			width: 100%;
			line-height: 20px;
			color: #333;
			font-size:14px;
			font-weight:500;
			position: relative;
			.clear{
				width:40px;
				background:rgba(242,242,242,1);
				border-radius:11px;
				font-size:12px;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height: 22px;
				text-align: center;
				position: absolute;
				right: 10px;
				top: 0;
			}
		}
		.list {
			margin-bottom: 10px;
			li {
				box-sizing: border-box;
				border-bottom: 1px solid #D9D9D9;
				height: 44px;
				line-height: 44px;
				font-size: 14px;
				width: 100%;
				color:#666666;
				position: relative;
				.z-fa{
					position: absolute;
					right: 15px;
					top: 14px;
				}
			}
		}
	}
}
</style>
