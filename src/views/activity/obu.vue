<template>
<div class="obu" v-show="isFollow">
	<div class="above">
		<!--<div class="msg">-->
			<!--2019年底前<span>基本取消高速省界人工收费站！</span>-->
			<!--<div>替换为ETC通道</div>-->
		<!--</div>-->
		<div class="msg"><img src="~@/assets/img/obu/msg.png"/></div>
		<img src="~@/assets/img/obu/main.png"/>

		<ul v-show="isWeixn">
			<li>
				<div @click="share">邀请好友</div>
			</li>
			<li>
				<div @click="deal">免费申领</div>
			</li>
		</ul>
		<p @click="lookMore" :class="{on}">更多优惠详情<img src="~@/assets/img/obu/arrow.png"/></p>
		<!--<div class="rule" @click="showRule=true">使用规则</div>-->
	</div>
	<div class="detail" v-show="on">
		<div class="head">OBU设备免费送</div>
		<div class="content">
			<label>活动时间：</label>
			<p>2019年1月1日至2019年12月31日</p>
			<label>活动内容： </label>
			<p>客户申办沪通ETC信用卡，首次绑定，可免费赠价值390元OBU设备一台。</p>
		</div>
		<div class="head">全国高速通行费最低4.75折</div>
		<div class="content">
			<!--<label>活动时间：</label>-->
			<!--<p>2019年1月1日至2019年12月31日</p>-->
			<!--<label>活动内容： </label>-->
			<p>8月1日起，客户注册农行掌上银行，登录掌上银行"信用卡""乐游天下"栏目，选择ETC通行费月票，使用绑定ETC业务并进行通行费扣款的ETC信用卡（需激活），每月可使用1000积分领取ETC通行费月票，自领取之时起享受当月ETC通行费折上折，在原95折优惠基础上额外享5折优惠（5折部分每月最高优惠30元）。月票数量有限，先到先得。领取月票所需的积分数将在掌银活动页面显示。月票领取后如未使用，扣除的积分不予退回。</p>
		</div>
		<!--<div class="head">上海地区高速通行最低8.55折</div>-->
		<!--<div class="content">-->
			<!--<label>活动时间：</label>-->
			<!--<p>2019年1月1日至2019年12月31日</p>-->
			<!--<label>活动内容： </label>-->
			<!--<p>客户可在领券享道路通行费9折基础上，额外享上海境内高速公路通行费9.5折优惠，优惠叠加后，上海地区高速通行费最低8.55折。9.5折部分优惠于每次通行时自动实现。</p>-->
		<!--</div>-->
		<div class="tel">以上活动详询农行客服热线：4006695599</div>
		<img src="~@/assets/img/obu/title.png"/>
		<div class="more">
			<div>
			<p><label>停车：</label>1元虹桥机场停车、1元百联商场停车 </p>
			<p><label>贵宾：</label>1元虹桥机场贵宾、1元1人全国机场贵宾、1元上海站高铁贵宾、1元1人全国高铁贵宾、6.2元3人全国机场贵宾、6.2元3人全国高铁贵宾 </p>
			<p><label>更多1元权益：</label>1元代驾、1元运动、1元私人医生 </p>
			<p><label>更多星级礼遇：</label>酒店餐饮5折礼遇、滑冰礼遇、酒店甄选礼遇、星级酒店游泳健身、奕欧来购物礼遇、剧院礼遇、瑞尔齿科礼遇、境外退税礼遇、全球精选礼遇。</p>
			<a>更多活动详情请询95516</a>
			</div>
		</div>
	</div>
	<div class="rules" v-show="showRule">
		<div class="mask"></div>
		<div class="body">
			<h3>使用规则</h3>
			<div class="content">
				<div class="up">
					<label>1.申领奖励</label>
					<p>成功申领并开通ETC，您将免费获得价值390元的ETC设备。</p>
					<label>2.邀请好友</label>
					<p>点击【邀请好友】按钮，好友通过您分享的链接，成功申领并开通ETC后，您将获得10元红包奖励。</p>
					<p><span>小贴士：</span>如果好友未成功申领开通ETC，您将无法获得邀请好友的红包了哦~</p>
					<label>2.查看奖励</label>
					<p>使用分享时的手机号登录好修修微信公众号，进入“我的”-“我的奖励”菜单，查看红包奖励。</p>
					<p><span>小贴士：</span>您的奖励是可以叠加的，每多一位好友通过您分享的链接成功申领并开通ETC，您即多获得一次10元红包奖励。累计邀请每满100位好友申领并开通ETC，即可得1000元红包。奖励无最高上限。</p>
				</div>
				<div class="down">
					<h4>以下问题要注意哦</h4>
					<p>* 分享者本人如果使用自己分享的链接成功申领并开通ETC，将无法获得10元的邀请奖励。</p>
					<p>* 您的好友申领ETC时填写的手机号必须与其登录好修修公众号时使用的手机号一致，否则您将无法获得红包奖励。</p>
					<p>* 您的好友通过您分享的链接，成功申领并开通ETC后的30天内，我们将给您发放奖励。</p>
					<p>* 您的好友是否成功申领并开通ETC，以平台确认结果为准。</p>
					<p>* 本活动最终解释权归“好修修”所有。</p>
				</div>
			</div>
			<a @click="showRule=false">知道了</a>
		</div>
	</div>
	<div class="rules share" v-show="showShare" @click="showShare= false">
		<div class="mask"></div>
		<div>
			<img src="~@/assets/img/obu/share.png" class="arrow"/>
		</div>
		<div class="text">点击右上角<br/>邀请好友参与活动</div>
		<div>
			<img class="qrcode" :src="qrimg" v-show="qrimg"/>
			<p v-show="qrimg">扫码分享给好友</p>
		</div>
	</div>
</div>
</template>

<script>
import { getWeixinId, openidGetInfo, getwxticket, isWeixn} from '@/util'
import qrcode from '~/public/lib/qrcode.js'
export default {
	name: "obu",
	data(){
		return{
			on: false,
			isFollow: false,
			showRule: false,
			showShare: false,
			qrimg: ''
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
	created(){
		let openid= localStorage.getItem("OPENID");
		getwxticket(['hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'showMenuItems'], ()=>{
			wx.ready(()=>{
				wx.hideMenuItems({
					menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:facebook", "menuItem:share:QZone"]
				});
			})

			if(openid){
				this.funopenidGetInfo(openid)
			}else{
				if(this.isWeixn){
					getWeixinId((data)=>{
						this.funopenidGetInfo(data.openid)
					})
				}else{
					this.isFollow= true
				}
			}
		})
	},
	mounted(){
		document.body.addEventListener('touchmove', ()=>{
			this.on= true
		});
	},
	methods:{
		funopenidGetInfo(openid){
			openidGetInfo(openid, (res)=>{
				// console.log('res.data', res.data)
				let data= {
					superiorDid: this.$route.query.id
				}
				if(res.data.subscribe==0){
					this.etcPost(data, (res)=>{
						// window.location.href= 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyNDc5ODkyOQ==&scene=126&bizpsid=0#wechat_redirect'
						window.location.href= 'https://mp.weixin.qq.com/s/OgPQ3_rdEsVcJCaWLz8TTg'
					})
				}else{
					this.isFollow= true

					if(this.isLogin){
						data.userId= this.$store.state.user.userinfo.userId
						wx.ready(()=>{
							wx.showMenuItems({
								menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
							});
						})

					}else{
						wx.ready(()=>{
							wx.hideMenuItems({
								menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
							});
						})
					}
					this.etcPost(data, (res)=>{
						this.shareConfig(res.data.did)
					})
				}
			})
		},
		etcPost({userId, superiorDid}, callback){
			this.axiosHxx.post('/carlive/etc/apply', {
				userId: userId|| -1,
				open_id: localStorage.getItem("OPENID"),
				superiorDid: superiorDid || -1
			},{ baseURL: '/hxx-gateway-proxy/'}).then(res => {
				if(res.data.success){
					if(callback) callback(res.data)
				}
			})
		},
		share(){
			if(this.toLogin()){
				this.showShare= true
			}
		},
		deal(){
			if(this.toLogin()){
				this.$router.push('/etc')
			}
		},
		toLogin(){
			if(this.isLogin){
				return true
			}else{
				this.$router.push({path: '/login', query: { redirect: this.$route.fullPath }})
			}
		},
		shareConfig(id){
			let link= window.location.origin+ '/#/obu?id='+ id
			let titles= '价值390元ETC设备免费领！'
			let shareImg= window.location.origin+ '/img/obu/obu.png'
			// let self= this

			let qr = new qrcode({
				text: link
			})
			this.qrimg =  qr.toDataURL("image/png");

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
					desc: '分享最高可得千元红包',
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
		lookMore(){
			let top= document.body.scrollTop
			this.on= !this.on
			if(this.on){
				setTimeout(()=>{
					document.body.scrollTop= top+100
				},50)
			}
		}
	},
	beforeRouteLeave(to, from, next){
		wx.ready(function(){
			wx.showAllNonBaseMenuItem();
		})
		next()
	},
	beforeDestroy(){
		wx.ready(function(){
			wx.showAllNonBaseMenuItem();
		})
	}
}
</script>

<style scoped lang="less">
.obu{
	min-height: 100vh;
	background-color: #0298DD;
	.above{
		height: 100vh;
		position: relative;
		overflow: hidden;
		background:linear-gradient(180deg,rgba(72,205,248,1) 0%,rgba(2,152,221,1) 100%);
		>img{
			width: 100%;
			position: absolute;
			top: 40%;
			left: 0;
			transform: translateY(-46%);
		}
		.msg{
			position: absolute;
			width: 100%;
			min-width: 280px;
			text-align: center;
			left: 0;
			top: 15px;
			color: #066C9D;
			font-size: 14px;
			line-height: 20px;
			font-weight: 600;
			z-index: 1;
			img{
				width: 90%;
			}
		}
		>ul{
			width: 100%;
			overflow: hidden;
			position: absolute;
			left: 0;
			bottom: 6%;
			li{
				width: 50%;
				float: left;
				padding: 10px 0;
				text-align: center;
				div{
					display: inline-block;
					font-size: 18px;
					font-weight: 600;
					padding: 6px 35px;
					background:linear-gradient(180deg,rgba(255,189,124,1) 0%,rgba(255,132,24,1) 68%,rgba(238,89,4,1) 100%);
					box-shadow:0 5px 5px 0 rgba(142,58,4,0.43);
					border-radius:6px;
					/*border:1px solid rgba(151,151,151,0.49);*/
					color: white;
				}
			}
		}
		>p{
			position: absolute;
			bottom: 2%;
			left: 0;
			width: 100%;
			text-align: center;
			color: white;
			img{
				width: 16px;
				vertical-align: middle;
				margin: 0 5px;
				transition: all .2s;
			}
			&.on img{
				transform: rotate(180deg);
			}
		}
		.rule{
			border-radius: 12px 0 0 12px;
			position: absolute;
			font-size: 12px;
			color: #FFD266;
			opacity: .8;
			background-color: #23728D;
			line-height: 24px;
			padding: 0 6px 0 10px;
			right: 0;
			top: 50%;
		}
	}
	.detail{
		padding: 0 10px 20px;
		background-color: #75CAF3;
		.head{
			line-height: 40px;
			font-size:18px;
			font-weight:600;
			color:rgba(255,233,6,1);
			text-shadow:0 1px 0 rgba(0,0,0,0.5);
			border-bottom: 2px solid #FDF1D0;
			margin-bottom: 5px;
		}
		.content{
			padding: 10px;
			background-color: white;
			border-radius: 10px;
			margin-bottom: 10px;
			color: #333333;
			font-size: 14px;
			label{
				display: block;
				font-weight: 600;
			}
		}
		.tel{
			color: #666666;
			font-size: 12px;
			margin-bottom: 20px;
		}
		>img{
			width: 100%;
			padding: 0 10px;
			margin-bottom: 10px;
		}
		.more{
			padding: 10px;
			background-color: #FFE7C3;
			border-radius: 10px;
			div{
				padding: 10px;
				border-radius: 10px;
				border: 1px dashed #F9AC37;
				overflow: hidden;
				p{
					font-size: 12px;
					color: #E97157;
					line-height: 24px;
					label{
						font-size: 14px;
						font-weight: 600;
					}
				}
				a{
					display: block;
					text-align: center;
					color: #666666;
					font-size: 14px;
					margin: 20px 0;
				}
			}
		}
	}
	.rules{
		position: fixed;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		left: 0;
		top: 0;
		z-index: 10;
		.mask{
			width: 100%;
			height: 100%;
			background-color: #333333;
			opacity: .5;
		}
		.body{
			position: absolute;
			width: 90%;
			height: 80%;
			left: 50%;
			top: 50%;
			padding: 40px 0;
			transform: translate(-50%, -50%);
			background-color: white;
			border-radius: 5px;
			overflow: hidden;
			h3{
				color: #333333;
				font-size: 16px;
				line-height: 40px;
				background-color: white;
				text-align: center;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
			}
			.content{
				width: 100%;
				height: 100%;
				overflow: auto;
				.up{
					border-bottom: 1px solid #DCDEE3;
					padding: 0 20px 20px;
					label{
						font-size: 14px;
						color: black;
						line-height: 24px;
					}
					p{
						font-size: 12px;
						color: #666666;
						line-height: 22px;
						span{
							color: #F4333C;
						}
					}
				}
				.down{
					padding: 0 20px;
					h4{
						line-height: 30px;
						position: relative;
						text-align: center;
						color: #F4333C;
						font-size: 12px;
						font-weight: 400;
						display: block;
						margin: 0 auto;
						left: 0;
						right: 0;
						width: 200px;
						&:before, &:after{
							content: '';
							width: 40px;
							display: block;
							position: absolute;
							border-top: 1px dashed #F4333C;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
						}
						&:after{
							left: auto;
							right: 0;
						}
					}
					p{
						color: #666666;
						font-size: 12px;
						line-height: 22px;
					}
				}
			}
			>a{
				display: block;
				line-height: 39px;
				border-top: 1px solid #DCDEE3;
				text-align: center;
				color: #1890FF;
				font-size: 16px;
			}
		}
	}
	.share{
		text-align: center;
		.mask{
			position: absolute;
			left: 0;
			top: 0;
			background-color: black;
			opacity: .7;
			z-index: -1;
		}
		.arrow{
			width: 150px;
			margin-right: 5px;
			float: right;
			margin-bottom: 10px;
		}
		.text{
			font-size: 19px;
			font-weight:600;
			color: white;
			line-height:26px;
			text-shadow:0px 2px 1px rgba(174,18,18,0.5);
			padding: 10px 35px;
			border-radius: 40px;
			display: inline-block;
			background:linear-gradient(180deg,rgba(255,189,124,1) 0%,rgba(255,132,24,1) 68%,rgba(238,89,4,1) 100%);
			box-shadow:0px 5px 5px 0px rgba(142,58,4,0.43);
		}
		.qrcode{
			width: 150px;
			margin-top: 20px;
		}
		p{
			margin-top: 10px;
			color: white;
		}
		>div{
			overflow: hidden;
		}
	}
}
</style>
