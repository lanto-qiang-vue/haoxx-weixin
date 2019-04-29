<template>
<div class="boardList">
    <div class='search'>
      <form action="javascript:;">
        <input type="search" placeholder="话题搜索" class="mui-input-clear" v-model="searchValue">
      </form>
    </div>
	<div class="content">
		<div class="title">
			<span class="active">热聊话题</span>
			<span>最新话题</span>
		</div>
		<ul class="themeList">
			<li>
				<p>今日头条新闻今日头条新闻今日头条新闻今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>

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
				<p>今日头条新闻今日头条新闻今日头条新闻今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>

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
				<p>今日头条新闻今日头条新闻今日头条新闻今日头条新闻今日头条新闻今日头条新闻???</p>
				<ul class="imgGroup">
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>
					<li><img src="/img/maintain/shqxw.jpg" alt=""></li>

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
			searchValue:'',
		}
	}
}
</script>

<style scoped lang='less'>
.boardList {
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
	  margin-top: 36px;
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
			span{
				padding-right: 20px; 
			}
			.active{
				color: #FF6D0E;
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
			padding: 10px 0;
			font-size: 14px;
			width: 100%;
			color:#333;
			p{
				line-height: 20px;
				font-weight: 500px;
			}
			.listClear{
				font-size: 12px;
				float: right;
				padding-right: 20px;
			}
			.imgGroup{
				overflow: hidden;
				padding: 4px 0;
				li{
					width:60px;
					height:60px;
					border-radius:3px;
					float: left;
					margin-right:4px;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
			.listFooter{
				position: relative;
				padding: 5px 0;
				span{
					font-size:12px;
					color:#999999;
				}
				.left{
					height: 22px;
					line-height: 22px;
					position: absolute;
					top: 5px;
					right: 75px;
					color: #666;
					
				}
				.right{
					width:56px;
					height:22px;
					background:rgba(242,242,242,1);
					border-radius:11px;
					display: inline-block;
					position: absolute;
					right: 10px;
					top: 5px;
					text-align: center;
					line-height: 22px;
					color: #FF6D0E;
				}
			}
		}
	}
}
  


}
</style>
