<template>
<div class="forum-detail">
	<div class="header">
		<h1>{{detail.title}}</h1>
		<div class="review">
			<router-link tag="p" to="/forum-reply" class="left">
				查看全部{{detail.number}}个评论 <i class="fa fa-angle-right"></i></router-link>
			<div class="right">
				<i class="fa fa-pencil-square-o"></i>
				<span>评论</span>
			</div>
		</div>
	</div>

	<div class="body">
		<div class="head">
			<img src="/img/head.png">
			<span>{{detail.nickname}}</span>
		</div>
		<div class="content" v-html="detail.content"></div>
		<ul class="imgs">
			<li v-for="(item, index) in detail.items" :key="index"><img :src="item.path" v-img="{group: 'img'}"/></li>
		</ul>
	</div>
	<div class="comments">
		<h1>评论</h1>
		<forum-reply :hide-input="true"></forum-reply>
	</div>

	<div class="bottom">
		<div class="left">
			<i class="fa fa-thumbs-o-up"></i>
			<span >{{detail.praise}}</span>
		</div>
		<div class="right">
			<i class="fa fa-commenting-o "></i>
			<span >{{detail.number}}</span>
		</div>
	</div>
</div>
</template>

<script>
import ForumReply from './forum-reply.vue'
export default {
	name: "forum-detail",
	components: {ForumReply },
	data(){
		return{
			detail: {},
			imgs: [
				"/img/head.png",
				"/img/head.png",
				"/img/head.png",
				"/img/head.png",
				"/img/head.png",
				"/img/head.png",
				"/img/head.png",
			]
		}
	},
	mounted(){

		this.getNewTopic()
	},
	methods:{
		getNewTopic(){
			this.axiosHxx.post('/cartalk/mycarcircles/releasedetail', {

				contentId:'1'
			},{baseURL: '/hxx-gateway-proxy'}).then( (res) => {
				console.log(res);
				this.detail=res.data.data;

			})
		},
	}
}
</script>

<style scoped lang="less">
@import './forum.less';
.forum-detail{
	/*padding-bottom: 45px;*/
	.header{
		width: 100%;
		border-bottom: 10px solid #F3F3F3;
		padding: 10px 15px;
		h1{
			font-size:16px;
			font-weight:500;
			color: #333333;
			line-height:22px;
		}
		.review{
			margin-top: 10px;
			height: 20px;
			&>*{
				display: inline-block;
				vertical-align: middle;
				line-height: 20px;
				i{
					font-size: 16px;
					margin: 0 3px;
					/*vertical-align: baseline;*/
					line-height: 20px;
				}
			}
			.left{
				font-size: 13px;
				color: #999999;
			}
			.right{
				font-size: 12px;
				float: right;
				color: #FF6D0E;
				i{
					vertical-align: middle;
					font-size: 14px;
				}
			}
		}

	}

	.body{
		padding: 10px 10px 10px 15px;
		.head{
			line-height:34px;
			img{
				width:34px;
				height:34px;
				border-radius: 100%;
			}
			span{
				padding-left: 10px;
				font-size:14px;
				font-weight:500;
				color: black;
			}
		}
		.content{
			padding-right: 5px;
			font-size:14px;
			font-weight:400;
			color: #333333;
			line-height:24px;
			word-break: break-all;
		}
		.imgs{
			overflow: hidden;
			li{
				width: 33%;
				border-style: solid;
				border-color: transparent;
				border-width: 0 6px 6px 0;
				float: left;
				position: relative;
				display: inline-block;
				overflow: hidden;
				border-radius: 3px;
				&:before{
					content: '';
					display: block;
					margin-top: 100%;
				}
				img{
					position: absolute;
					width: 100%;
					height: 100%;
					border-radius: 3px;
					overflow: hidden;
					left: 0;
					top: 0;
					object-fit: cover;
				}
			}
		}
	}
	.comments{
		overflow: hidden;
		h1{
			padding-left: 15px;
			font-size:14px;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:20px;
			padding-top: 10px;
			border-top: 1px solid #D9D9D9;
		}
	}

	.bottom{
		background: #fff;
		position: fixed;
		height: 44px;
		width: 100%;
		left: 0;
		bottom: 0;
		border-top: 1px solid #D9D9D9;
		font-size:20px;
		line-height: 44px;
		color: #999999;
		.left{
			display: inline-block;
			padding-left: 20px;
			span{
				font-size:10px;
				line-height: 10px;
				vertical-align: text-top;
			}
		}
		.right{
			float: right;
			display: inline-block;
			text-align: right;
			padding-right: 12px;
			span{
				font-size:10px;
				line-height: 10px;
				vertical-align: text-top;
			}
		}
	}
}
</style>
