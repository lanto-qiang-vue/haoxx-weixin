<template>
<div class="forum-detail">
	<div class="header">
		<h1>{{detail.title}}</h1>
		<div class="review">
			<p class="left" @click="gotoReply">
				查看全部{{detail.number}}个评论 <i class="fa fa-angle-right"></i></p>
			<div class="right"  @click="clickComment">
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
		<div class="content" v-html="detail.content && detail.content.replace(/\n/g,'<br/>')"></div>
		<ul class="imgs">
			<li v-for="(item, index) in detail.items" :key="index"><img :src="item.path" v-img="{group: 'img'}"/></li>
		</ul>
	</div>
	<div class="comments">
		<h1>评论</h1>
		<forum-reply :init-show-input="false" :id="$route.query.id" ref="reply" :userid="detail.userId"
		:isIndex="true" :limit="3"></forum-reply>
	</div>

	<div class="bottom">
		<thumb-up :num="detail.praise" :self="!!detail.ispraise" :id="detail.contentId" type="0"></thumb-up>
		<div class="right" @click="gotoReply">
			<i class="zmdi zmdi-comment-alt-text"></i>
			<!--<i class="fa fa-commenting-o "></i>-->
			<span >{{detail.number}}</span>
		</div>
	</div>

	<mt-popup :value="showComment" position="bottom" class="popup">
		<Input v-model.trim="content" placeholder="填写评论内容" type="textarea" class="comment-input"
		       :autosize="{ minRows: 10}" wrap="hard" ref="input"></Input>
		<div class="common-submit">
			<submit-button :rules="{content: { required: true}}" :datas="{content}" @click="submit">发布</submit-button>
		</div>
	</mt-popup>
</div>
</template>

<script>
import ForumReply from './reply.vue'
import ThumbUp from './part/ThumbUp.vue'
import SubmitButton from '@/components/submit-button.vue'
export default {
	name: "forum-detail",
	components: {ForumReply, SubmitButton, ThumbUp},
	data(){
		return{
			detail: {},
			showComment: false,
			content: '',
		}
	},
	watch:{
		'$route'(to){
			this.showBlock()
		},
	},
	mounted(){
		this.getNewTopic()
		this.showBlock()
	},
	methods:{
		showBlock(){
			this.showComment= !!this.$route.query.showComment
		},
		clickComment(){
			let route= this.$route
			this.$router.push({path: route.path, query: {...route.query, showComment: true}})
			setTimeout(()=>{
				this.$refs.input.focus()
			},500)
		},
		getNewTopic(){
			this.axiosHxx.post('/topic/carcircles/releasedetail', {
				contentId: this.$route.query.id
			},{baseURL: '/hxx-gateway-proxy'}).then( (res) => {
				console.log(res);
				this.detail=res.data.data;
			})
		},
		submit(){
			this.axiosHxx.post('/cartalk/topic/comment',{ comment: {
					contentId: this.$route.query.id,
					content: this.content,
			}}, {baseURL: '/hxx-gateway-proxy'}).then(res=>{
				if(res.data.success){
					this.$toast('发布成功')
					this.$refs.reply.getList()
					this.$router.go(-1)
				}
			})
		},
		gotoReply(){
			this.$router.push({path: '/forum-reply', query:{id: this.$route.query.id}})
		}
	}
}
</script>

<style scoped lang="less">
/*@import './forum.less';*/
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
			word-break: break-all;
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
				border-width: 6px 6px 0 0;
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

		.right{
			float: right;
			display: inline-block;
			text-align: right;
			padding-right: 12px;
			span{
				font-size:10px;
				line-height: 10px;
				vertical-align: text-top;
				margin-left: 5px;
			}
		}
	}
	.popup{
		height: 100vh;
		width: 100%;
		overflow: auto;
	}
}
</style>
<style lang="less">
.forum-detail{
	.bottom{
		.thumb-up{
			display: inline-block;
			padding-left: 15px;
			span{
				font-size:10px;
				line-height: 10px;
				vertical-align: text-top;
			}
		}
	}
	.popup{
		.comment-input textarea{
			max-height: 100vh!important;
			overflow-y: auto!important;
			border: 0;
			box-shadow: none;
			padding: 15px 15px 60px;
		}
	}
}
</style>
