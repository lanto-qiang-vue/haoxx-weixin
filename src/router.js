import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
routes: [
	{
		path: '/',
		name: 'index',
		meta:{
			footer: true
		},
		component: () => import('@/views/index.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login.vue')
	},
	{
		path: '/my',
		name: 'my',
		meta: {
			keepAlive: true,
			footer: true
		},
		component: () => import('@/views/my.vue')
	},
	{
		path: '/setting',
		name: 'setting',
		component: () => import('@/views/setting.vue')
	},
	{
		path: '/accredit',
		name: 'accredit',
		component: () => import('@/views/accredit.vue')
	},
	{
		path: '/my-reservation',
		name: 'my-reservation',
		component: () => import('@/views/my-reservation.vue')
	},
	{
		path: '/maintain',
		name: 'maintain',
		component: () => import('@/views/service-map/maintain.vue')
	},
]})
