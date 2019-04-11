let hxxtoken= localStorage.getItem('HXXTOKEN')||''
let qixiutoken= localStorage.getItem('QIXIUTOKEN')||''
let userinfo= localStorage.getItem('USERINFO')||''

export default {
	state: {
		hxxtoken: hxxtoken,
		qixiutoken: qixiutoken,
		userinfo: userinfo? JSON.parse(userinfo): ''
	},
	getters: {

	},
	mutations: {
		setHxxToken(state, token){
			localStorage.setItem('HXXTOKEN', token || '')
			state.hxxtoken = token;
		},
		setQixiuToken(state, token){
			localStorage.setItem('QIXIUTOKEN', token || '')
			state.qixiutoken = token;
		},
		setUserInfo(state, info){
			localStorage.setItem('USERINFO', info? JSON.stringify(info): '')
			state.userinfo = info;
		},
		logout(state){
			localStorage.removeItem('HXXTOKEN')
			localStorage.removeItem('QIXIUTOKEN')
			localStorage.removeItem('USERINFO')
			state.hxxtoken = ''
			state.qixiutoken = ''
			state.userinfo = ''
		}
	},
	actions:{

	},
}
