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
			footer: true,
			requiresAuth: true
		},
		component: () => import('@/views/my.vue')
	},
	{
		path: '/setting',
		name: 'setting',
		meta: {
			requiresAuth: true
		},
		component: () => import('@/views/setting.vue')
	},
	{
		path: '/accredit-bind',
		name: 'accredit-bind',
		meta: {
			requiresAuth: true
		},
		component: () => import('@/views/accredit-bind.vue')
	},
	{
		path: '/my-reservation',
		name: 'my-reservation',
		meta: {
			requiresAuth: true
		},
		component: () => import('@/views/reservation/my-reservation.vue')
	},
	{
		path: '/reservation',
		name: 'reservation',
		meta: {
			requiresAuth: true
		},
		component: () => import('@/views/reservation/reservation-detail.vue')
	},
	{
		path: '/maintain',
		name: 'maintain',
		component: () => import('@/views/service-map/maintain.vue')
	},
	{
		path: '/my-car-list',
		name: 'my-car-list',
		meta: {
			requiresAuth: true,
			requiresQixiu: true,
		},
		component: () => import('@/views/car-record/my-car-list.vue')
	},
	{
		path: '/bind-my-car',
		name: 'bind-my-car',
		meta: {
			requiresAuth: true,
			requiresQixiu: true,
		},
		component: () => import('@/views/car-record/bind-my-car.vue')
	},
]})
