import router from './router'
import {Toast, Indicator, MessageBox} from 'mint-ui'
import store from './store'
import {getwxticket, cityIsSupport, getCityToken} from '@/util.js'

router.beforeEach((to, from, next) => {
	Indicator.close()
	let title= to.meta.title|| '好修修'
	document.title = title
	// console.log('from, to',  from, to)
	let hasCity= store.state.app.city.regionId

	let imgs= document.querySelector('.fullscreen-v-img .buttons-v-img span')
	if(imgs) imgs.click()

	MessageBox.close()
	/*
	* 1判断是否需要区域
	* 2判断是否是指定区域
	* 3判断是否需要登录
	* 4判断是否绑定汽修平台
	* */
	let needArea= to.meta.needArea|| to.meta.needQixiu
	let urlredirect= to.query.redirect, redirect= to.fullPath
	if(urlredirect){
		redirect= urlredirect
		if(urlredirect.indexOf('redirect=')>=0){
			redirect= urlredirect.split('redirect=')[1]
		}
	}
	// console.log('redirect', redirect)

	if(needArea){
		if(hasCity){
			if(cityIsSupport()){
				auth()
			}else{
				next(false)
				Toast('暂不支持您的区域')
			}
		}else{
			Toast('请选择您的城市')
			next({path: '/city-select', query: { redirect: redirect}})
		}
	}else auth()

	function auth() {
		if (to.meta.tourist) {
			next()
		} else {
			if (store.state.user.hxxtoken) {
				if (to.meta.needQixiu){
					if (!getCityToken()) {
						Toast('请绑定汽修平台账号')
						next({path: '/accredit-bind', query: { redirect: redirect}})
					} else {
						next()
					}
				}else next()
			} else {
				Toast('请登录')
				next({path: '/login', query: { redirect: redirect }})
			}
		}
	}
})

router.afterEach((to, from) => {
	console.log('router.afterEach((to,', to)
	let title= document.title
	let img= 'https://weixin.shanghaiqixiu.org/static/img/shqxw.jpg'
	let link= window.location.href
	if(!to.meta.share){
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
	}
})
