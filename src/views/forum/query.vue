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
<style lang='less'>
@import './forum.less';
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
	top:0px;
	left:0px;
	box-sizing: border-box;
	.z-search{
		padding: 5px 15px;
		border-bottom: 8px #F3F3F3 solid;
	}
  }
  .content{
	  background: #fff;
	  box-sizing: border-box;
	  padding-top: 48px;
	  
	  .title {
		box-sizing: border-box;
		padding:12px 0 3px 15px;
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
				top: 12px;
			}
		


	}
	.z-title{
		padding-top: 14px;
	}
	.themeList {
		box-sizing: border-box;
		padding-left:15px;
		li {
			box-sizing: border-box;
			border-bottom: 1px solid #D9D9D9;
			line-height: 20px;
			padding: 10px 0;
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
