import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
routes: [
	// {
	// 	path: '/test',
	// 	name: 'test',
	// 	meta:{
	// 		tourist: true
	// 	},
	// 	component: () => import('@/views/test.vue')
	// },
	{
		path: '/',
		name: 'index',
		meta:{
			footer: true,
			tourist: true,
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
		component: () => import('@/views/setting/setting.vue')
	},
	{
		path: '/accredit-bind',
		name: 'accredit-bind',
		meta: {
		},
		component: () => import('@/views/setting/accredit-bind.vue')
	},
	{
		path: '/city-select',
		name: 'city-select',
		meta: {
			tourist: true
		},
		component: () => import('@/views/setting/city-select.vue')
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
		meta:{
			tourist: true,
			cache: true,
			needArea: true
		},
		component: () => import('@/views/service-map/maintain.vue')
	},
	{
		path: '/maintain-remark',
		name: 'maintain-remark',
		meta:{
			tourist: true,
		},
		component: () => import('@/views/service-map/maintain-remark.vue')
	},
	// {
	// 	path: '/my-car-list',
	// 	name: 'my-car-list',
	// 	meta: {
	// 		needAccredit: true,
	// 	},
	// 	component: () => import('@/views/car-record/my-car-list.vue')
	// },
	// {
	// 	path: '/bind-my-car',
	// 	name: 'bind-my-car',
	// 	meta: {
	// 		needAccredit: true,
	// 	},
	// 	component: () => import('@/views/car-record/bind-my-car.vue')
	// },
	// {
	// 	path: '/bind-my-car-com',
	// 	name: 'bind-my-car-com',
	// 	meta: {
	// 		needAccredit: true,
	// 	},
	// 	component: () => import('@/views/car-record/bind-my-car.vue')
	// },
	// {
	// 	path: '/bind-other-car',
	// 	name: 'bind-other-car',
	// 	meta: {
	// 		needAccredit: true,
	// 	},
	// 	component: () => import('@/views/car-record/bind-other-car.vue')
	// },
	// {
	// 	path: '/record-list',
	// 	name: 'record-list',
	// 	meta: {
	// 		needAccredit: true,
	// 	},
	// 	component: () => import('@/views/car-record/record-list.vue')
	// },
	// {
	// 	path: '/record-detail',
	// 	name: 'record-detail',
	// 	meta: {
	// 		needAccredit: true,
	// 	},
	// 	component: () => import('@/views/car-record/record-detail.vue')
	// },
	{
		path: '/car-list',
		name: 'car-list',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/car-record/car-list.vue')
	},
	{
		path: '/bind-car',
		name: 'bind-car',
		meta: {
			title: '添加爱车',
			needAccredit: true,
		},
		component: () => import('@/views/car-record/bind-car.vue')
	},
	{
		path: '/reservation-detail',
		name: 'reservation-detail',
		meta: {
			needAccredit: false,
		},
		component: () => import('@/views/reservation/reservation-detail.vue')
	},
	{
		path: '/remark-map',
		name: 'remark-map',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/remark/remark-map.vue')
	},
	{
		path: '/my-remark',
		name: 'my-remark',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/remark/my-remark.vue')
	},
	{
		path: '/remark-detail',
		name: 'remark-detail',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/remark/remark-detail.vue')
	},
	{
		path: '/remark-match',
		name: 'remark-match',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/remark/match.vue')
	},
	{
		path: '/coupons-type',
		name: 'coupons-type',
		meta: {

		},
		component: () => import('@/views/coupons/coupons-type.vue')
	},
	{
		path: '/coupons',
		name: 'coupons',
		meta: {

		},
		component: () => import('@/views/coupons/coupons.vue')
	},
	{
		path: '/coupons-detail',
		name: 'coupons-detail',
		meta: {

		},
		component: () => import('@/views/coupons/coupons-detail.vue')
	},
	{
		path: '/coupons-coms',
		name: 'coupons-coms',
		meta: {

		},
		component: () => import('@/views/coupons/coupons-coms.vue')
	},
	{
		path: '/article-detail',
		name: 'article-detail',
		meta: {
			tourist: true,
			share: true
		},
		component: () => import('@/views/article/article-detail.vue')
	},
	{
		path: '/forum-query',
		name: 'forum-query',
		meta: {
			tourist: true,
		},
		component: () => import('@/views/forum/query.vue')
	},
	{
		path: '/forum-board',
		name: 'forum-board',
		meta: {
			tourist: true,
		},
		component: () => import('@/views/forum/board.vue')
	},
	{
		path: '/forum',
		name: 'forum',
		meta: {
			tourist: true,
			footer: true,
		},
		component: () => import('@/views/forum/index.vue')
	},
	{
		path: '/forum-post',
		name: 'forum-post',
		meta: {
		},
		component: () => import('@/views/forum/post.vue')
	},
	{
		path: '/my-forum',
		name: 'my-forum',
		meta: {

		},
		component: () => import('@/views/forum/my-post.vue')
	},
	{
		path: '/topic',
		name: 'topic',
		meta: {
			tourist: true,
		},
		component: () => import('@/views/forum/topic.vue')
	},
	{
		path: '/forum-reply',
		name: 'forum-reply',
		meta: {
			tourist: true,
		},
		component: () => import('@/views/forum/reply.vue')
	},
	{
		path: '/report/query-vin',
		name: 'hreport-query-vin',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/car-report/query-vin.vue')
	},
	{
		path: '/report/pay',
		name: 'report-pay',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/car-report/pay.vue')
	},
	{
		path: '/my/car-report',
		name: 'my-car-report',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/car-report/my-report.vue')
	},
	{
		path: '/report/report',
		name: 'report-detail',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/car-report/report.vue')
	},
	{
		path: '/report/detail',
		name: 'report-detail',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/car-report/history-detail.vue')
	},
	{
		path: '/obu',
		name: 'obu',
		meta: {
			tourist: true,
			share: true,
			title: 'ETC设备免费领',
			notGetLocation: true,
			notGetWeixinId: true,
		},
		component: () => import('@/views/activity/obu.vue')
	},
	{
		path: '/etc',
		name: 'etc',
		meta: {
			title: '农行ETC',
		},
		component: () => import('@/views/activity/etc.vue')
	},
	{
		path: '/accredit',
		name: 'accredit',
		meta: {

		},
		component: () => import('@/views/setting/accredit.vue')
	},
	{
		path: '/to-remark',
		name: 'to-remark',
		meta: {
			needAccredit: true
		},
		component: () => import('@/views/remark/to-remark.vue')
	},
	{
		path: '/remark',
		name: 'remark',
		meta: {
			needAccredit: true,
		},
		component: () => import('@/views/remark/remark.vue')
	},

]})
