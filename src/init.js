import config from '~/config.js'

let initVer=()=>{
	let hxxver = localStorage.getItem('hxxver'), ver= parseFloat(config.versions);
	if(!hxxver || (hxxver && parseFloat(hxxver)<ver)){
		localStorage.clear()
		localStorage.setItem('hxxver', ver)
	}
}

initVer()







