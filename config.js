const conf={
	appid: process.env.NODE_ENV=='development'? 'wx71b3e2a11334e62d': 'wx6b11ffb51b409ac3',
	location: [
		{
			province: '上海市',
			adcode:"310000",
			lng: 121.480236,
			lat: 31.236301,
		},
		{
			province: '山东省',
			adcode:"370000",
			lng: 117.120098,
			lat: 36.6512,
		},
	],
}


export default conf


