const maintainListHistory = () => {
	const val = localStorage.getItem('maintainListHistory')
	return val ? JSON.parse(val) : []
}

export default {
	state: {
		maintainListHistory: maintainListHistory(),
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
	},
	actions:{

	},
}
