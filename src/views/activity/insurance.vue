<template>
	<iframe v-show="isFollow" class="insurance" src="https://wx.cpic.com.cn/sxwxywhb/safetyBelt/index?openid=ox6yJju2tP9KBzAYsQDBVN-hdS1g&sceneId=&empno=SHH19996&empOpenid=ox6yJjpQxD3WgV01lDY3bvAlZ3_o"></iframe>
</template>

<script>
import { getWeixinId, openidGetInfo, getwxticket, isWeixn} from '@/util'
export default {
	name: "insurance",
	data(){
		return{
			isFollow: false
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
				this.isFollow= true
				if(this.isWeixn){
					getWeixinId((data)=>{
						this.funopenidGetInfo(data.openid)
					})
				}
			}
		})
	},
	methods:{
		funopenidGetInfo(openid){
			openidGetInfo(openid, (res)=>{
				// console.log('res.data', res.data)
				if(res.data.subscribe==0){
					window.location.href= 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyNDc5ODkyOQ==&scene=126&bizpsid=0#wechat_redirect'
				}else{
					this.shareConfig()

					// this.isFollow= true
					// if(this.isLogin){
					// 	wx.ready(()=>{
					// 		wx.showMenuItems({
					// 			menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
					// 		});
					// 	})
					//
					// }else{
					// 	wx.ready(()=>{
					// 		wx.hideMenuItems({
					// 			menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
					// 		});
					// 	})
					// }
				}
			})
		},
		shareConfig(){
			let link= window.location.href
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
	width: 100%;
	min-height: 100vh;
	overflow: auto;
}
</style>
