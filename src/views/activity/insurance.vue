<template>
<div class="insurance" v-show="isFollow">
	<div class="top">
		<img class="m1" src="/img/insurance/1.png"/>
		<img class="m2" src="/img/insurance/2.png" @click="w1=true"/>
	</div>
	<div class="bot">
		<img src="/img/insurance/3.png"/>
		<img src="/img/insurance/4.png"/>
		<a class="but" @click="toGo">领取赠险</a>
	</div>
	<div class="foot">
		<p>承诺出行系好安全带，立即送10万保障</p>
		<a @click="w2=true">活动须知</a>
		<!--<p>业务员工号:SHH19996</p>-->
	</div>

	<div class="window" v-show="w1">
		<div class="mask"></div>
		<div class="box">
			<div class="head"><div class="close" @click="w1= false">✕</div></div>
			<div class="content">
				<img src="/img/insurance/f1.png"/>
				<img src="/img/insurance/f2.png"/>
			</div>
		</div>
	</div>

	<div class="window" v-show="w2">
		<div class="mask"></div>
		<div class="box">
			<div class="head"><div class="close" @click="w2= false">✕</div></div>
			<div class="content know">
				<a><i></i><span>活动须知内容</span><i></i></a>
				<p>1、活动时间：2019年7月1日至12月31日或额度赠完为止。</p>
				<p>2、承诺出行系好安全带即可赠送10万意外保障。</p>
				<p>3、活动期间同一身份证号码只能领取一次。</p>
				<p>4、领取客户必须年满18周岁。</p>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { getWeixinId, openidGetInfo, getwxticket, isWeixn} from '@/util'
export default {
	name: "insurance",
	data(){
		return{
			w1: false,
			w2: false,
			isFollow: true,
		}
	},
	computed:{
		isLogin(){
			return this.$store.state.user.hxxtoken
		},
		isWeixn(){
			return isWeixn()
		}
	},
	beforeCreate(){

	},
	// mounted(){
	// 	this.mount= true
	// 	this.isFollow= true
	// },
	mounted(){
		let openid= localStorage.getItem("OPENID");

		if(openid){
			this.replaceState()
			this.funopenidGetInfo(openid)
		}else{
			if(this.isWeixn){
				getWeixinId((data)=>{
					this.replaceState()
					this.funopenidGetInfo(data.openid)
				})
			}
		}
	},
	methods:{
		toGo(){
			window.location.href= "https://camspro.cpic.com.cn/cams/TaiBaoApp/dist/#/product/buyInfoSeatBeltProductCar?pid=0&pEnsure=0&mid=10208&userName=106964url="+ encodeURIComponent(window.location.href)
			// window.location.href= "https://camsdev.cpic.com.cn/cams/TaiBaoApp/dist/#/product/buyInfoSeatBeltProductCar?pid=0&pEnsure=0&mid=10301&userName=1002911&url="+ encodeURIComponent(window.location.href)
		},
		replaceState(){
			history.replaceState(null, null, window.location.origin + window.location.hash)
		},
		funopenidGetInfo(openid){
			openidGetInfo(openid, (res)=>{
				// console.log('res.data', res.data)
				if(res.data.subscribe==0){
					window.location.href= 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyNDc5ODkyOQ==&scene=126&bizpsid=0#wechat_redirect'
				}else{
					this.isFollow= true

					getwxticket(['hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'showMenuItems'], ()=>{
						wx.ready(()=>{
							wx.hideMenuItems({
								menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:facebook", "menuItem:share:QZone"]
							});
						})

						this.shareConfig()
					})
				}
			})
		},
		shareConfig(){
			let link= window.location.origin+ '/#/insurance'
			let titles= '交通部“安全带·生命带”，10万保额免费领！'
			let shareImg= window.location.origin+ '/img/obu/insurance.png'
			// let self= this

			wx.ready(function(){
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: titles,
					link: link,
					imgUrl: shareImg,
					success: function () {
						// self.$toast('分享成功')
					}
				})
				//分享给朋友
				wx.onMenuShareAppMessage({
					title: titles,
					desc: '',
					link: link,
					imgUrl: shareImg,
					type: '',
					dataUrl: '',
					success: function () {
						// self.$toast('分享成功')
					}
				});
			})
		},
	}
}
</script>

<style scoped lang="less">
.insurance{
	.top{
		background:linear-gradient(180deg, #56adeb 0%, #d8edf4 50%, #d8edf4 100%);
		img{
			width: 100%;
			padding: 10px;
		}
		.m1{
			padding-bottom: 0;
		}
		.m2{
			padding-top: 0;
		}
	}
	.bot{
		img{
			width: 100%;
			padding: 0 10px;
		}
		a{
			display: block;
			margin: 10px;
			line-height: 40px;
			border-radius: 6px;
			background:linear-gradient(180deg, #f8efb3 0%, #ecab24 100%);
			text-align: center;
			font-size: 16px;
			color: #d37816;
		}
	}
	.foot{
		text-align: center;
		margin: 20px 0;
		p{
			color: black;
			font-size: 12px;
		}
		a{
			display: inline-block;
			color: #22a2ec;
			margin-bottom: 20px;
			text-decoration: underline;
		}
	}
	.window{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.mask{
			width: 100%;
			height: 100%;
			background-color: black;
			opacity: .5;
		}
		.box{
			width: 80%;
			height: auto;
			overflow: auto;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			/*border-top: 20px solid #fbfbfb;*/
			padding-top: 20px;
			border-bottom: 20px solid #fbfbfb;
			border-radius: 6px;
			.head{
				width: 100%;
				height: 20px;
				background-color: #fbfbfb;
				position: absolute;
				top: 0;
				left: 0;
				.close{
					position: absolute;
					padding: 5px;
					font-size: 14px;
					top: 0;
					right: 0;
					height: 20px;
					width: 20px;
					line-height: 10px;
				}
			}
			.content{
				width: 100%;
				height: auto;
				max-height: 65vh;
				overflow: auto;
				background-color: white;
				*{
					max-width: 100%;
				}
			}
		}
	}
	.know{
		a{
			text-align: center;
			display: block;
			font-size: 16px;
			color: black;
			margin-bottom: 10px;
			line-height: 24px;
			i{
				display: inline-block;
				width: 70px;
				height: 24px;
				position: relative;
				vertical-align: middle;
				&:first-child{
					&:before{
						content: '';
						width: 4px;
						height: 4px;
						background-color: #22a2ec;
						position: absolute;
						top: 8px;
						right: 5px;
						transform: rotate(45deg);
					}
					&:after{
						content: '';
						width: 60px;
						height: 1px;
						background:linear-gradient(-45deg, #22a2ec 0%, #ffffff 100%);
						position: absolute;
						top: 10px;
						right: 12px;
					}
				}
				&:last-child{
					&:before{
						content: '';
						width: 4px;
						height: 4px;
						background-color: #22a2ec;
						position: absolute;
						top: 8px;
						left: 5px;
						transform: rotate(45deg);
					}
					&:after{
						content: '';
						width: 60px;
						height: 1px;
						background:linear-gradient(45deg, #22a2ec 0%, #ffffff 100%);
						position: absolute;
						top: 10px;
						left: 12px;
					}
				}
			}
		}
		p{
			font-size: 12px;
			padding: 0 15px;
			color: #666666;
		}
	}
}
</style>
