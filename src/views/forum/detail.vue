<template>
	<div class="detail">
		<div style="height: 100%;overflow: auto;">
			<div class="detail-header">
			<h1>{{listDetail.title}}</h1>
			<div class="header-left">
				<p>查看全部{{listDetail.number}}个评论<span>></span></p>
			</div>
			<div class="header-right">
				<i class="fa fa-pencil-square-o"></i>
				<span>评论</span>
			</div>
		</div>

		<div class="detail-menu">
			<div class="menu-header">
				<img src="/img/head.png" alt="">
				<span>{{listDetail.nickname}}</span>
			</div>
			<div class="menu-content">
				{{listDetail.content}}
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
				<div class="stores-menu">
					<div class="stores-li">
						<div class="store-li-menu">
							<div class="stores-left-menu">
								<div class="menu-img">
									<img src="/img/head.png" alt="">
								</div>
							</div>
						</div>
					</div>
					<div class="stores-li">
						<div class="store-li-menu">
							<div class="stores-left-menu">
								<div class="menu-img">
									<img src="/img/head.png" alt="">
								</div>
							</div>
						</div>
					</div>
					<div class="stores-li">
						<div class="store-li-menu">
							<div class="stores-left-menu">
								<div class="menu-img">
									<img src="/img/head.png" alt="">
								</div>
							</div>
						</div>
					</div>
					<div class="stores-li">
						<div class="store-li-menu">
							<div class="stores-left-menu">
								<div class="menu-img">
									<img src="/img/head.png" alt="">
								</div>
							</div>
						</div>
					</div>
					<div class="stores-li">
						<div class="store-li-menu">
							<div class="stores-left-menu">
								<div class="menu-img">
									<img src="/img/head.png" alt="">
								</div>
							</div>
						</div>
					</div>
					<div class="stores-li">
						<div class="store-li-menu">
							<div class="stores-left-menu">
								<div class="menu-img">
									<img src="/img/head.png" alt="">
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		</div>
		
		
		<div class="footer">
			<div class="footer-left">
				<i class="fa fa-thumbs-o-up"></i>
				<span >{{listDetail.praise}}</span>
			</div>
			<div class="footer-right">
				<i class="fa fa-commenting-o "></i>
				<span >{{listDetail.number}}</span>
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
				listDetail:[],
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
					this.listDetail=res.data.data;
					
				})
			},
		}
	}
</script>

<style scoped lang="less">
.stores-menu{
            overflow: hidden;
            .stores-li{
                padding: 5px;
                width:33%;
                display:inline-block;
                /*float: left;*/
                .store-li-menu{
                    border:1px solid rgba(0,0,0,0.3);
                    position: relative;
                    overflow: hidden;
                    .stores-left-menu{
                        width: 100%;
                        position: absolute;
                        top: 50%;
                        left:50%;
                        -webkit-transform: translateX(-50%) translateY(-50%);
                        -webkit-transform: translateX(-50%) translateY(-50%);
                        -moz-transform: translateX(-50%) translateY(-50%);
                        -ms-transform: translateX(-50%) translateY(-50%);
                        transform: translateX(-50%) translateY(-50%);
                        .menu-img{
                            width: 100%;
                            height: 100%;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    &:before{
                        content: '';
                        width: 100%;
                        margin-top: 100%;
                        display: block;
                    }
                }
                
                
            }
            
        }
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
				    padding-top: 7px;
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
