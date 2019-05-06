let hxxtoken= localStorage.getItem('HXXTOKEN')||''
let qixiutoken= localStorage.getItem('QIXIUTOKEN')||''
let userinfo= localStorage.getItem('USERINFO')||''
// let dict = localStorage.getItem('dict') || ''
let unit = localStorage.getItem('unit') || ''
export default {
	state: {
		hxxtoken: hxxtoken,
		qixiutoken: qixiutoken? JSON.parse(qixiutoken): '',
		userinfo: userinfo? JSON.parse(userinfo): '',
		// dict:dict ? JSON.parse(dict) : '',
		unit:unit ? JSON.parse(unit) : ''
	},
	getters: {

	},
	mutations: {
		setHxxToken(state, token){
			localStorage.setItem('HXXTOKEN', token || '')
			state.hxxtoken = token;
		},
		setQixiuToken(state, token){
			if(token)
			for(let key in token){
				state.qixiutoken[key]= token[key]
			}
			localStorage.setItem('QIXIUTOKEN', token ? JSON.stringify(state.qixiutoken): '')
		},
		setUserInfo(state, info){
			localStorage.setItem('USERINFO', info? JSON.stringify(info): '')
			state.userinfo = info;
		},
		// setDict(state,dict){
         //    localStorage.setItem('dict', dict ? JSON.stringify(dict): '')
		// 	state.dict = dict;
		// },
		setUnit(state,unit){
            localStorage.setItem('unit', unit ? JSON.stringify(unit): '')
            state.unit = unit;
		},
		logout(state){
			localStorage.removeItem('HXXTOKEN')
			localStorage.removeItem('QIXIUTOKEN')
			localStorage.removeItem('USERINFO')
			state.hxxtoken = ''
			state.qixiutoken = ''
			state.userinfo = ''
		},
		changePassSuccess(state){
			state.userinfo.is_modify= 1
			localStorage.setItem('USERINFO', JSON.stringify(state.userinfo))
		}
	},
	actions:{
		dictInit(context, dict){
			let newObj = {};
			let unitObj = {};
			for(let i in dict){
				if(!newObj[dict[i].group]){
					newObj[dict[i].group] = [];
				}
				unitObj[dict[i].code] = dict[i].name;
				newObj[dict[i].group].push({label:dict[i].name,value:dict[i].code});
			}
			// coxntext.commit('setDict',newObj);
			context.commit('setUnit',unitObj);
		},
	},
}
