import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
routes: [
	{
		path: '/',
		name: 'home',
		redirect: '/my'
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue')
	},
	{
		path: '/my',
		name: 'my',
		meta: { keepAlive: true},
		component: () => import('@/views/my.vue')
	},
	{
		path: '/setting',
		name: 'setting',
		component: () => import('@/views/setting.vue')
	},
]})
