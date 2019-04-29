<template>
<div id="queryList">
    <div class='search'>
      <form action="javascript:;">
        <input type="search" placeholder="话题搜索" class="mui-input-clear" v-model="searchValue">
      </form>
    </div>
	<div class="content">
		<div class="title">
			<span>热聊话题</span>
		</div>
		<ul class="themeList">
			<li>
				<span >今日头条新闻</span>
			</li>
			<li>
				<span >今日头条新闻</span>
			</li>
			<li>
				<span >今日头条新闻</span>
			</li>

			</li>
		</ul>
		<div class="title">
			<span>搜索记录</span>
			<div class="cleargroup">
				<div class="clearAll">清空全部</div>
				<div class="clear">清空</div>
			</div>
			
		</div>
		<ul class="themeList">
			<li>
				<span>今日头条新闻</span>
				<span class="listClear">X</span>
			</li>
			<li>
				<span >今日头条新闻</span>
				<span class="listClear">X</span>
			</li>
			<li>
				<span >今日头条新闻</span>
				<span class="listClear">X</span>
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
			searchValue:'',
		}
	}
}
</script>

<style scoped lang='less'>
#queryList {
  background-color: #fff;
  height: 100vh;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  .search {
    padding: 5px 15px;
    width: 100%;
    background: #fff;
	position: fixed;
	top:0px;
	left:0px;
	box-sizing: border-box;
    form {
      input {
        background: url(/img/car-record/search.png) no-repeat 5px 5px;
        font-size: 12px;
		background-color:rgba(238,238,238,1);
        background-size: 18px 18px;
        text-indent: 0;
		padding-left: 35px;
        border-radius: 15px;
        outline: none;
        border: none;
		color:#A9A9A9;
        width: 100%;
        height: 26px;
        position: relative;
        text-align: left;
        margin-bottom: 0;
		box-sizing: border-box;
      }
    }
  }
  .content{
	  background: #fff;
	  box-sizing: border-box;
	  margin-top: 44px;
	  .title {
		  box-sizing: border-box;
		  padding-left:15px;
			width: 100%;
			
			height: 35px;
			line-height: 35px;
			color: #333;
			font-size:14px;
			font-weight:500;
			overflow: hidden;
			.cleargroup{
				    float: right;
					margin-top: 10px;
					margin-right: 15px;
				.clear{
					width:40px;
					height:22px;
					background:rgba(242,242,242,1);
					border-radius:11px;
					font-size:12px;
					font-weight:400;
					color:rgba(102,102,102,1);
					line-height: 22px;
					text-align: center;
					float: left;
					margin-left: 4px;
					margin-right:10px;
				}
				.clearAll{
					width:64px;
					height:22px;
					background:rgba(242,242,242,1);
					border-radius:11px;
					font-size:12px;
					font-weight:400;
					color:rgba(102,102,102,1);
					line-height: 22px;
					text-align: center;
					float: left;
				}
			}
			

	}
	.title:first-child{
			border-top: 8px #F3F3F3 solid;
	}
		.themeList {
			box-sizing: border-box;
			padding-left:15px;
			li {
				box-sizing: border-box;
				border-bottom: 1px solid #D9D9D9;
				/*height: 40px;*/
				line-height: 30px;
				padding: 10px 0;
				font-size: 14px;
				width: 100%;
				color:#666666;
				.listClear{
					font-size: 12px;
					float: right;
					padding-right: 20px;
				}
			}
		}
	}
  


}
</style>
