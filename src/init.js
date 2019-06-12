import { getWeixinId, getLocation, getwxticket } from '@/util.js'
import store from '@/store'
import config from '~/config.js'

let initVer=()=>{
	let hxxver = localStorage.getItem('hxxver'), ver= parseFloat(config.versions);
	if(!hxxver || (hxxver && parseFloat(hxxver)<ver)){
		localStorage.clear()
		localStorage.setItem('hxxver', ver)
	}
}

initVer()

getWeixinId()

getLocation().then(( success)=>{
	if(success){
		let appstore= store.state.app
		if(!appstore.city.regionId){
			store.dispatch('setCity', {
				regionId: appstore.location.adcode,
				regionName: appstore.location.city || appstore.location.province,
			});
		}
	}
})



