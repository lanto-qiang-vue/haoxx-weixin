import router from './router'
import {Toast, Indicator} from 'mint-ui'
import store from './store'
import {getwxticket, cityIsSupport, getCityToken} from '@/util.js'
getwxticket(['onMenuShareTimeline', 'onMenuShareAppMessage'])

router.beforeEach((to, from, next) => {
	Indicator.close()
	let title= to.meta.title|| '好修修'
	document.title = title
	// console.log('from, to',  from, to)
	let hasCity= store.state.app.city.regionId

	/*
	* 1判断是否需要登录
	* 2判断是否需要区域
	* 3判断是否是指定区域
	* 4判断是否绑定汽修平台
	* */
	let needArea= to.meta.needArea|| to.meta.needQixiu
	if (!to.meta.tourist) {
		if (!store.state.user.hxxtoken) {
			Toast('请登录')
			next({path: '/login', query: { redirect: to.fullPath }})
		} else {
			if(needArea){
				if(hasCity){
					if(cityIsSupport()){
						if (to.meta.needQixiu){
							if (!getCityToken()) {
								Toast('请绑定汽修平台账号')
								next({path: '/accredit-bind', query: { redirect: to.fullPath}})
							} else {
								next()
							}
						}else next()
					}else{
						next(false)
						Toast('暂不支持您的区域')
					}
				}else{
					Toast('请选择您的城市')
					next({path: '/city-select', query: { redirect: to.fullPath}})
				}
			}else next()
		}
	} else {
		next()
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
