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
.boardList {
  background-color: #fff;
  height: 100vh;
  overflow: auto;
  width: 100%;
  box-sizing: border-box;
  .search {
    width: 100%;
    background: #fff;
	position: fixed;
	top:0px;
	left:0px;
	box-sizing: border-box;
	z-index:20;
    .z-search{
		padding: 5px 15px;
	}
	.title {
		box-sizing: border-box;
		padding:12px 0 5px 15px;
		width: 100%;
		line-height: 20px;
		color: #666;
		font-size:14px;
		font-weight:500;
		overflow: hidden;
		border-top: 8px #F3F3F3 solid;
		span{
			padding-right: 20px; 
		}
		.active{
			color: #FF6D0E;
		}
	}

  }
  .content{
	  background: #fff;
	  box-sizing: border-box;
	  padding-top: 85px;
	.themeList {
		box-sizing: border-box;
		padding-left:15px;
		li {
			box-sizing: border-box;
			border-bottom: 1px solid #D9D9D9;
			padding: 10px 0;
			font-size: 14px;
			width: 100%;
			p{
				color:#333;
				line-height: 20px;
				font-weight: 500px;
				padding-bottom:5px;
			}
			.listClear{
				font-size: 12px;
				float: right;
				padding-right: 20px;
			}
			.imgGroup{
				overflow: auto;
				padding: 5px 0;
				white-space:nowrap;
				li{
					width:60px;
					height:60px;
					border-radius:3px;
					border-bottom: none;
					padding:0;
					margin-right:5px;
					
					
					overflow:hidden;
					display:inline-block;
					img{
						opacity: 0;
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
					right: 85px;
					color: #666;
					
				}
				.right{
					width:56px;
					height:22px;
					background:rgba(242,242,242,1);
					border-radius:11px;
					display: inline-block;
					position: absolute;
					right: 15px;
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
