import router from './router'
import {Toast, Indicator} from 'mint-ui'
import store from './store'

router.beforeEach((to, from, next) => {
	Indicator.close()
	document.title = to.meta.title|| '好修修车生活'

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
