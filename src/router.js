import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
routes: [
	{
		path: '/',
		name: 'index',
		meta:{
			footer: true,
			tourist: true
		},
		component: () => import('@/views/index.vue')
	},
	{
		path: '/login',
		name: 'login',
		meta:{
			tourist: true
		},
		component: () => import('@/views/login.vue')
	},
	{
		path: '/my',
		name: 'my',
		meta: {
			footer: true,
		},
		component: () => import('@/views/my.vue')
	},
	{
		path: '/setting',
		name: 'setting',
		meta: {
		},
		component: () => import('@/views/setting.vue')
	},
	{
		path: '/accredit-bind',
		name: 'accredit-bind',
		meta: {
		},
		component: () => import('@/views/accredit-bind.vue')
	},
	{
		path: '/my-reservation',
		name: 'my-reservation',
		meta: {
		},
		component: () => import('@/views/reservation/my-reservation.vue')
	},
	{
		path: '/reservation',
		name: 'reservation',
		meta: {
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
			requiresQixiu: true,
		},
		component: () => import('@/views/car-record/my-car-list.vue')
	},
	{
		path: '/bind-my-car',
		name: 'bind-my-car',
		meta: {
			requiresQixiu: true,
		},
		component: () => import('@/views/car-record/bind-my-car.vue')
	},
	{
		path: '/bind-other-car',
		name: 'bind-other-car',
		meta: {
			requiresQixiu: true,
		},
		component: () => import('@/views/car-record/bind-other-car.vue')
	},
	{
		path: '/record-list',
		name: 'record-list',
		meta: {
			requiresQixiu: true,
		},
		component: () => import('@/views/car-record/record-list.vue')
	},
	{
		path: '/record-detail',
		name: 'record-detail',
		meta: {
			requiresQixiu: true,
		},
		component: () => import('@/views/car-record/record-detail.vue')
	},
	{
		path: '/my-reservation',
		name: 'my-reservation',
		meta: {
			requiresQixiu: true,
		},
		component: () => import('@/views/reservation/my-reservation.vue')
	},
	{
		path: '/reservation-detail',
		name: 'reservation-detail',
		meta: {
			requiresQixiu: true,
		},
		component: () => import('@/views/reservation/reservation-detail.vue')
	},
	{
		path: '/my-remark',
		name: 'my-remark',
		meta: {
			requiresQixiu: true,
		},
		component: () => import('@/views/remark/my-remark.vue')
	},
	{
		path: '/remark-detail',
		name: 'remark-detail',
		meta: {
			requiresQixiu: true,
		},
		component: () => import('@/views/remark/remark-detail.vue')
	},
	{
		path: '/remark-match',
		name: 'remark-match',
		meta: {
			requiresQixiu: true,
		},
		component: () => import('@/views/remark/match.vue')
	},
]})
