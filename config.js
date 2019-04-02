//打包编译环境配置
const prodConfig={
	appid: 'wxc0fa34909c77eaa5'
}


//开发测试环境配置
const devConfig={
	appid: 'wx963d76dadc29b2e6'
}

export default process.env.NODE_ENV==='development'? devConfig: prodConfig


