<template>
	<div id="infoDetail">
		<div class="title">{{infoDetail.title}}</div>
		<!--<a class="shqx" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxMjI3OTU1OA==#wechat_redirect">上海汽修平台</a>-->
		<div v-html="infoDetail.content" class="detail"></div>
		<!--<img class="ercode_img" src="../assets/img/home/ercode_img.jpeg"/>-->

	</div>
</template>

<script>
import {getwxticket} from '@/util.js'
export default {
	name: 'info',
	data () {
		return {
			selected: 0,
			infoDetail: {}
		}
	},
	created() {
		getwxticket(['onMenuShareTimeline', 'onMenuShareAppMessage'])
		this.axiosQixiu({
			method: 'post',
			url: '/infopublic/detail/' + this.$route.query.infoId,
		}).then(res => {
			this.infoDetail = res.data.item;
			this.share()
		}).catch(function (error) {
		})

	},
	methods: {
		goBack(){this.$router.go(-1)},
		share(){
			let self=this
			let link= window.location.href
			let titles= this.infoDetail.title

			console.log(titles)
			let imgarr= this.infoDetail.content.match( /<img\b.*?(?:\>|\/>)/gi)
			// console.log(news[j].content)
			let shareImg= imgarr? imgarr[0].match(/\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i )[1]: ''
			// console.log(news[j].headimg)



			// console.log()

			wx.ready(function(){
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: titles, // 分享标题
					link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg|| 'https://weixin.shanghaiqixiu.org/static/img/shqxw.jpg', // 分享图标
					success: function () {
						// 用户点击了分享后执行的回调函数
					}
				})
				//分享给朋友
				wx.onMenuShareAppMessage({
					title: titles, // 分享标题
					desc: titles, // 分享描述
					// link: 'https://weixin.shanghaiqixiu.org/#/remarkDetail?id='+self.$route.query.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: shareImg|| 'https://weixin.shanghaiqixiu.org/static/img/shqxw.jpg', // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function () {
// 用户点击了分享后执行的回调函数
					}
				});
			})
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
	#infoDetail {
		.title{
			padding: 10px 15px;
			/*margin-top: 40px;*/
			font-size: 22px;
			line-height: 25px;
			text-align: center;
		}
		.shqx{
			color: #576b95;
			font-size: 15px;
			padding: 0 15px;
		}
		.detail {
			width: 100%;
			padding: 10px 15px;
			overflow: hidden;
			position: relative;
			>p {
				margin-left: 0 !important;
			}
			img {
				max-width: 100%!important;
				height: auto!important;
			}
			/*img[src="http://ueditor.baidu.com/ueditor/dialogs/attachment/fileTypeImages/icon_doc.gif"] {*/
			/*width: 16px;*/
			/*}*/
		}
		.ercode_img{
			width: 100%;
			padding: 0 10%;
			margin-bottom: 40px;
		}
	}
	.article-title {
		color: #000;
		font-size: 22px;
		line-height: 1.45;
		font-weight: 600;
		text-align: center;
	}
</style>

