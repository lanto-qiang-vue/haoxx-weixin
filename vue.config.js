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
			'/default-proxy': {
				target: 'http://192.168.169.231:8888/',
				pathRewrite: {'^/default-proxy': ''},
				secure: false
			},
		}
	}
}
