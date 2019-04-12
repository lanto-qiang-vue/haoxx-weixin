const maintainListHistory = () => {
	const val = localStorage.getItem('maintainListHistory')
	return val ? JSON.parse(val) : []
}

export default {
	state: {
		maintainListHistory: maintainListHistory(),
		location:{
			lng: 0,
			lat: 0
		},
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
			state.location.lng= obj.lng
			state.location.lat= obj.lat
		},
		setVehiclemodelIndex(state, obj){
			state.vehiclemodelIndex= obj
		},
	},
	actions:{

	},
}
