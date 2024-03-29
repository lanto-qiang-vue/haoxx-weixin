const toJson= (str)=>{
	try {
		if (typeof JSON.parse(str) == "object") {
			return JSON.parse(str);
		}
	} catch(e) {
	}
	return false;
}
let hxxtoken= localStorage.getItem('HXXTOKEN')||''
let qixiutoken= localStorage.getItem('QIXIUTOKEN')
let userinfo= localStorage.getItem('USERINFO')||''
// let dict = localStorage.getItem('dict') || ''
let unit = localStorage.getItem('unit') || ''
// let unionid = localStorage.getItem('UNIONID') || ''
// let openid = localStorage.getItem('OPENID') || ''
// let unionidlock= unionid? 1: 0

export default {
	state: {
		hxxtoken: hxxtoken,
		qixiutoken: toJson(qixiutoken) || {},
		userinfo: toJson(userinfo)|| {},
		// dict:dict ? JSON.parse(dict) : '',
		unit: toJson(unit)||  '',
		// weixinid:{
		// 	unionid: unionid,
		// 	openid: openid,
		// 	lock: lock
		// }
	},
	getters: {

	},
	mutations: {
		setHxxToken(state, token){
			localStorage.setItem('HXXTOKEN', token || '')
			state.hxxtoken = token;
		},
		setQixiuToken(state, token){
			if(token){
				for(let key in token){
					state.qixiutoken[key]= token[key]
				}
				localStorage.setItem('QIXIUTOKEN',  JSON.stringify(state.qixiutoken) )
			}
		},
		setUserInfo(state, info){
			localStorage.setItem('USERINFO', info? JSON.stringify(info): '')
			state.userinfo = info;
		},
		setNickName(state, name){
			state.userinfo.nickName = name;
			localStorage.setItem('USERINFO', JSON.stringify(state.userinfo))
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
			state.qixiutoken = {}
			state.userinfo = ''
		},
		changePassSuccess(state){
			state.userinfo.is_modify= 1
			localStorage.setItem('USERINFO', JSON.stringify(state.userinfo))
		},
		changeUserInfo(state, obj){
			for(let key in obj){
				state.userinfo[key]= obj[key]
			}
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
