import router from './router'
import {Toast, Indicator} from 'mint-ui'

router.beforeEach((to, from, next) => {
	Indicator.close()
	document.title = to.meta.title|| '好修修车生活'

	if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem("ACCESSTOKEN")) {
      Toast('请登录')
      console.log(to.fullPath)
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
