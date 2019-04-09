import router from './router'
import {Toast, Indicator} from 'mint-ui'
import store from './store'

router.beforeEach((to, from, next) => {
	Indicator.close()
	document.title = to.meta.title|| '好修修车生活'

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!store.state.user.hxxtoken) {
			Toast('请登录')
			// console.log(to.fullPath)
			next({path: '/login', query: { redirect: to.fullPath }})
		} else {
			next()
		}
	} else if (to.matched.some(record => record.meta.requiresQixiu)){
		if (!store.state.user.qixiutoken) {
			Toast('请绑定汽修平台账号')
			// console.log(to.fullPath)
			next({path: '/accredit', query: { redirect: to.fullPath }})
		} else {
			next()
		}
	}else {
		next() // 确保一定要调用 next()
	}
})
