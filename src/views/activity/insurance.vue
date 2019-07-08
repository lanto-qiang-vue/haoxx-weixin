<template>
	<iframe :style="{opacity: isFollow?1:0}" v-if="mount" class="insurance" src="https://wx.cpic.com.cn/sxwxywhb/safetyBelt/index?openid=ox6yJju2tP9KBzAYsQDBVN-hdS1g&sceneId=&empno=SHH19996&empOpenid=ox6yJjpQxD3WgV01lDY3bvAlZ3_o"></iframe>
</template>

<script>
import { getWeixinId, openidGetInfo, getwxticket, isWeixn} from '@/util'
export default {
	name: "insurance",
	data(){
		return{
			isFollow: true,
			mount: false
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
		this.mount= true
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
	width: 100vw;
	min-height: 100vh;
	overflow: auto;
}
</style>
