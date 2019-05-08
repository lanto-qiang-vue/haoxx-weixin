<template>
	<div class="detail">
		<div style="height: 100%;overflow: auto;">
			<div class="detail-header">
			<h1>自家车到底要不要去汽车4S店保养？</h1>
			<div class="header-left">
				<p>查看全部163个评论<span>></span></p>
			</div>
			<div class="header-right">
				<i class="fa fa-pencil-square-o"></i>
				<span>评论</span>
			</div>
		</div>

		<div class="detail-menu">
			<div class="menu-header">
				<img src="/img/head.png" alt="">
				<span>186****5567</span>
			</div>
			<div class="menu-content">
				我就说几件4孙子店的事情吧。 1、被公交车撞了，去维修，因为我出差，是老婆拿回来的，不知道看一下，等我回来一看。钣金不到位，车漆有磨砂感，是清漆喷的不到位，然后过了一段时间，车漆居然起泡了，路边店都没有这么烂的水平。后来有人告诉我，4孙子店的修车工，基本都是实习生。 2、给小姨子的车去保养，矿物油卖全合成的价，车子是1.4L发动机，一般情况下只要加3L油就够了，4孙子店故意拿出4L装的，用多的一升不会主动给你，直到我反复催促，大声喝骂，才不情愿的给我。而我小姨子不懂车，从来不知道拿回来。另外，4孙子店居然2万公里就给她的车换刹车片，4万公里就要求换变速箱油，而且还是重力置换3L，要价2000.老子一样的变速箱，外面循环置换12L才1200.再补充一件事情，小姨子的车要换轮胎，4孙子店两个米其林开价2000，
			</div>
		</div>
		<div class="detail-comments">
			<h1>评论</h1>
			<div class="comments-header">
				<div class="comments-left">
					<img src="/img/head.png" alt="">
					<span>186****5567</span>
				</div>
				<div class="comments-right">
					<i class="fa fa-thumbs-o-up"></i>
					<span>186</span>
				</div>
				<div class="comments-center">
					给小姨子的车去保养，矿物油卖全合成的价，车子是1.4L发动机，一般情况下只要加3L油就够了
				</div>
				
			</div>
		</div>
		</div>
		
		
		<div class="footer">
			<div class="footer-left">
				<i class="fa fa-thumbs-o-up"></i>
				<span >123</span>
			</div>
			<div class="footer-right">
				<i class="fa fa-commenting-o "></i>
				<span >123</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "detail",
		data(){
			return{
				search:'',
				comments:[],
			}
		},
		mounted(){
			
			this.getNewTopic()
		},
		methods:{
			getNewTopic(){
				this.axiosHxx.post('/cartalk/mycarcircles/releasedetail', {
					access_token:'f7ff5ee7985d31ebde226c66ca4f17af5908f43cdba7997e46dfe202b48c8e810605f19147d09ea713638ced39f39649d07561542460a8bc5c3a0368ca3c068fccf7dabbc48e26da683404d1313fc6ec6ed99776e058bb8ba4c950abdbdbe948ff6e94736eee3728',
					contentId:'1'
				},{baseURL: '/hxx-api-proxy'}).then( (res) => {
					console.log(res);
					
				})
			},
		}
	}
</script>

<style scoped lang="less">

.detail{
	height: 100vh;
	padding-bottom: 44px;
	
	.detail-header{
		width: 100%;
		border-bottom: 8px solid #F3F3F3;
		padding-left:15px;
		h1{
			font-size:16px;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:22px;
			padding-top: 13px;
		}
		.header-left{
			padding: 10px 0;
			width: 50%;
			display: inline-block;
			p{
				display: inline-block;
				font-size:13px;
				font-family:PingFangTC-Regular;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:18px;
				span{
					padding-left: 5px;
				}
			}
		}
		.header-right{
			padding: 10px 0;
			width: 50%;
			display: inline-block;
			text-align: right;
			padding-right: 17px;
			i{
				font-size:14px;
				color:rgba(255,109,14,1);
			}
			span{
				font-size:12px;
				padding-left: 4px;
				font-family:PingFangTC-Regular;
				font-weight:400;
				color:rgba(255,109,14,1);
				line-height:17px;
			}
		}

	}

	.detail-menu{
		padding: 0 15px;
		.menu-header{
			padding:10px 0 7px 0;
			line-height:34px;
			img{
				width:34px;
				height:34px;
				border-radius: 34px;
			}
			span{
				padding-left: 11px;
				font-size:14px;
				font-family:PingFangTC-Medium;
				font-weight:500;
				color:rgba(0,0,0,1);
			}
		}
		.menu-content{
			font-size:14px;
			font-family:PingFangTC-Regular;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:24px;
			padding-bottom: 20px;
		}
	}
	.detail-comments{
		padding-left: 15px;
		
		h1{
			font-size:14px;
			font-family:PingFangTC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:20px;
			padding: 14px 0;
			border-top: 1px solid #D9D9D9;
		}
		.comments-header{
			padding-right: 15px;
			.comments-left{
				display: inline-block;
				width:50%;
				img{
					width:28px;
					height:28px;
					border-radius: 28px;
				}
				span{
					padding-left: 7px;
					font-size:14px;
					font-family:PingFangTC-Medium;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
			}
			.comments-right{
				display: inline-block;
				width:50%;
				text-align: right;
				i{
					font-size:12px;
					color:rgba(153,153,153,1);
				}
				span{
					font-size:12px;
					font-family:PingFangTC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:17px;
				}
			}
			.comments-center{
				
				font-size:14px;
				font-family:PingFangTC-Regular;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:21px;
				padding-left: 35px;
			}
			
		}
	}

	.footer{
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
		.footer-left{
			width: 50%;
			display: inline-block;
			padding-left: 20px;
			span{
				font-size:10px;
				line-height: 10px;
				vertical-align: text-top;
			}
		}
		.footer-right{
			width: 50%;
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
