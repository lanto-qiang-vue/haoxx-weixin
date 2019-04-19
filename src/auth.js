import router from './router'
import {Toast, Indicator} from 'mint-ui'
import store from './store'
import {getwxticket} from '@/util.js'
getwxticket(['onMenuShareTimeline', 'onMenuShareAppMessage'])

router.beforeEach((to, from, next) => {
	Indicator.close()
	let title= to.meta.title|| '好修修车生活'
	document.title = title

	console.log('to', to)
	if (!to.meta.tourist) {
		if (!store.state.user.hxxtoken) {
			Toast('请登录')
			// console.log(to.fullPath)
			next({path: '/login', query: { redirect: to.fullPath }})
		} else {
			if (to.meta.requiresQixiu){
				if (!store.state.user.qixiutoken) {
					Toast('请绑定汽修平台账号')
					// console.log(to.fullPath)
					next({path: '/accredit-bind', query: { redirect: to.fullPath }})
				} else {
					next()
				}
			} else next()
		}
	} else {
		next() // 确保一定要调用 next()
	}
})

router.afterEach((to, from) => {
	let title= document.title
	let img= 'https://weixin.shanghaiqixiu.org/static/img/shqxw.jpg'
	let link= window.location.href
	wx.ready(function(){
		wx.onMenuShareTimeline({
			title: title, // 分享标题
			link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: img, // 分享图标
			success: function () {
				// 用户点击了分享后执行的回调函数
			}
		})
		wx.onMenuShareAppMessage({
			title: title, // 分享标题
			desc: title, // 分享描述
			link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl:  img, // 分享图标
			type: '',
			dataUrl: '',
			success: function () {
			}
		});
	})
})
