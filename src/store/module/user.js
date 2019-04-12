let hxxtoken= localStorage.getItem('HXXTOKEN')||''
let qixiutoken= localStorage.getItem('QIXIUTOKEN')||''
let userinfo= localStorage.getItem('USERINFO')||''
let dict = localStorage.getItem('dict') || ''
export default {
	state: {
		hxxtoken: hxxtoken,
		qixiutoken: qixiutoken,
		userinfo: userinfo? JSON.parse(userinfo): '',
		dict:dict ? JSON.parse(dict) : ''
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
		setDict(state,dict){
            localStorage.setItem('dict', dict ? JSON.stringify(dict): '')
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
		dictInit(context,dict){
           let newObj = {};
           for(let i in dict){
           	if(!newObj[dict[i].group]){
           		newObj[dict[i].group] = [];
			}
               newObj[dict[i].group].push({label:dict[i].name,value:dict[i].code});
		   }
            context.commit('setDict',newObj);
		}
	},
}
