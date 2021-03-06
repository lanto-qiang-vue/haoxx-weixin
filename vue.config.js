const path = require('path')
const resolve = dir => {
	return path.join(__dirname, dir)
}
// console.log(process.env.NODE_ENV)
module.exports = {
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set('~', resolve('/'))
	},
	// 打包时不生成.map文件
	productionSourceMap: false,

	devServer: {
		port: 7777,
		proxy: {
			'/hxx-proxy/': {
				// target: 'http://192.168.169.119:8761',
				// target: 'https://hxx.test.hoxiuxiu.com/',
				// target: 'http://developer.hxx.hoxiuxiu.com/',
				// target: 'http://mendian.dev.hoxiuxiu.com/',
				// target: 'http://192.168.169.231:10032/hxx-proxy/',
				target: 'https://weixin.test.hoxiuxiu.com/hxx-proxy/',
                pathRewrite: {'^/hxx-proxy/': ''},
                secure: false
			},
			'/hxx-gateway-proxy/': {
				// target: 'https://www.test.shanghaiqixiu.org/proxy/',
				target: 'http://192.168.169.231:8888/',
				// target: 'http://api.test.hoxiuxiu.com/',
				// target: 'http://192.168.169.109:8289/',
				pathRewrite: {'^/hxx-gateway-proxy/': ''},
				secure: false
			},
			'/qixiu-proxy/': {
				target: 'http://192.168.169.231:8888/',
				// target: 'https://www.test.shanghaiqixiu.org/proxy/',
				// target: 'https://www.shanghaiqixiu.org/proxy/',
				pathRewrite: {'^/qixiu-proxy/': ''},
				secure: false
			},

			'/repair-proxy/': {
				target: 'http://192.168.169.230:7210/',
				// target: 'https://www.shanghaiqixiu.org/repair/',
				pathRewrite: {'^/repair-proxy/': ''},
				secure: false
			},
			'/qixiu-proxy-shandong/': {
				target: 'http://192.168.169.208:8888/',
				// target: 'https://www.test.shanghaiqixiu.org/proxy/',
				// target: 'https://www.shanghaiqixiu.org/proxy/',
				pathRewrite: {'^/qixiu-proxy-shandong/': ''},
				secure: false
			},
			'/repair-proxy-shandong/': {
				target: 'http://192.168.169.211:7210/',
				// target: 'https://www.shanghaiqixiu.org/repair/',
				pathRewrite: {'^/repair-proxy-shandong/': ''},
				secure: false
			},
			'/laozhao-api/': {
				target: 'http://212.64.108.93:10001/',
				pathRewrite: {'^/laozhao-api/': ''},
				secure: false
			},
		}
	}
}
