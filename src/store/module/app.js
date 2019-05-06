const maintainListHistory = () => {
	const val = localStorage.getItem('maintainListHistory')
	return val ? JSON.parse(val) : []
}
const setCity= () => {
	const val = localStorage.getItem('setCity')
	return val ? JSON.parse(val) : {}
}
const setCityHistory= () => {
	const val = localStorage.getItem('cityHistory')
	return val ? JSON.parse(val) : []
}

export default {
	state: {
		maintainListHistory: maintainListHistory(),
		location:{
			lng: 0,
			lat: 0,
		},
		city: setCity(),
		cityHistory: setCityHistory(),
		manuallocation:{},
		vehiclemodelIndex: null
	},
	getters: {

	},
	mutations: {
		setMaintainListHistory(state, item){
			if(item){
				if(state.maintainListHistory.length &&
					state.maintainListHistory[state.maintainListHistory.length-1].corpId== item.corpId) {
					state.maintainListHistory[state.maintainListHistory.length-1]= item
				}else{
					if(state.maintainListHistory.length>=2){
						state.maintainListHistory.splice(0,1)
					}
					state.maintainListHistory.push(item)
				}
			} else state.maintainListHistory=[]
			localStorage.setItem('maintainListHistory', JSON.stringify(state.maintainListHistory))
		},
		setLocation(state, obj){
			state.location= obj
		},
		setVehiclemodelIndex(state, obj){
			state.vehiclemodelIndex= obj
		},
		setCity(state, item){
			localStorage.setItem('setCity', item? JSON.stringify(item): '')
			state.city = item;
		},
		setCityHistory(state, item){
			let list= state.cityHistory, have= false, length= 0
			for( let i in list){
				if(list[i].regionId== item.regionId) have= true
			}
			if(!have){
				length= list.unshift(item)
				if(length>2) list.pop()
			}
			localStorage.setItem('cityHistory', JSON.stringify(list))
		},
	},
	actions:{
		setCity(context, item){
			context.commit('setCity', item);
			context.commit('setCityHistory', item);
		},
	},
}
