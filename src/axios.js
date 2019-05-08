import axios from 'axios'
import router from './router'
import store from './store'
import { Toast, Indicator, Popup } from 'mint-ui'
import { isWeixn, getCityToken} from './util'
let toast= null
let axiosHxx= axios.create({
	baseURL: '/hxx-proxy/',
	timeout: 6000,
	headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
	transformRequest: [function (data) {
		// console.log('data', Object.prototype.toString.call(data))
		let ret = '',hashxxtoken= false, token= store.state.user.hxxtoken, dataType=Object.prototype.toString.call(data);
		switch(dataType){
			case '[object Object]': {
				for (let key in data) {
					let item = data[key]
					if (ret) ret += '&';
					if (key == 'access_token') {
						if (item) hashxxtoken = true;
						else continue
					}
					ret += (encodeURIComponent(key) + '=' + encodeURIComponent(typeof item == 'object' ? JSON.stringify(item) : item))
				}
				if (!hashxxtoken && token) ret += ('&' + encodeURIComponent('access_token') + '=' + encodeURIComponent(token))
				break
			}
			case '[object FormData]':{
				if(!data.has('access_token')){
					data.append('access_token' , token);
				}
				ret= data
				break
			}
		}

		return ret
	}]
});

let axiosQixiu= axios.create({
	baseURL: '/qixiu-proxy/',
	timeout: 6000,
	headers: {'Content-Type': 'application/json;charset=UTF-8'}
});

let weixinLogin= ()=> {
	let unionid= localStorage.getItem('UNIONID')
	if(isWeixn() && unionid){
		Indicator.close()
		Toast('登录中')
		axiosHxx.post('/operate/controller/loginByWx', {unionid}).then(res => {
			if(res.data.success){
				let data= res.data.data
				if(data.qxtoken) store.commit('setQixiuToken', data.qxtoken);
				store.commit('setHxxToken',data.tokenStr);
				store.dispatch('dictInit',data.dict);
				delete data.dict
				store.commit('setUserInfo',data);
				Toast('登录成功');
			}else{
				Toast('自动登录失败，请手动登录')
			}
			router.replace({ path: '/'})
		})
	}else{
		// console.log('router', router)
		router.push({path: '/login', query: { redirect: router.currentRoute.fullPath }})
	}
}

let logout=()=>{
	Toast("请重新登陆");
	store.commit('logout')
	weixinLogin()
}

axiosHxx.interceptors.request.use(config => {
	// let data= config.data
	// let contentType= config.headers['Content-Type']
	// console.log('config.headers', config.headers)
	// if(contentType.indexOf('application/x-www-form-urlencoded')>=0){
	// 	let form = new FormData(), res=''
	// 	if(!data.access_token && store.state.user.hxxtoken){
	// 	if(!data.access_token && store.state.user.hxxtoken){
	// 		data.access_token= store.state.user.hxxtoken
	// 	}
	// 	for(let key in data){
	// 		// form.append(key, typeof data[key]=='object'?  JSON.stringify( data[key]): data[key] );
	//
	// 	}
	// 	config.data= form
	// }

	// let token= localStorage.getItem("ACCESSTOKEN")
	// if(token) {
	// 	config.headers.token= token
	// }
	Indicator.close()
    Indicator.open({
		text: '请稍候...',
		spinnerType: 'snake'
    });
    return config
}, error => {
    return Promise.reject(error);
});

// Add a response interceptor 响应拦截器
axiosHxx.interceptors.response.use(response => {
	Indicator.close()
	// console.log('response', response)
	let { data } = response
	// console.log('data', data)
	if (data &&!data.success) {
		if(data.code == 808){
			logout()
			// return false;
		}else{
			if(data.hasOwnProperty("Exception")){
				// console.log(data.Exception.message);
				Toast( data.Exception.message || data.title);
			}else{
				Toast(data.title);
			}
		}
	}
	return response;
}, error => {
	// for(let key in error){
	// 	console.log(key)
	// }
	 //  console.log('error.response', error.response)
	Indicator.close()
	  // Toast({
		//   message: error.response.data.error,
		//   position: 'bottom',
		//   duration: 2000
	  // });
	// if(error.response.status==400){
	// let msg= (error.response.data&& error.response.data.msg)? error.response.data.msg: '系统异常'
	// 	Toast({
	// 	message: msg,
	// 	// position: 'bottom',
	// 	duration: 2000
	// });
	// } else if(error.message == 'timeout of 10000ms exceeded'){
	// 	Toast({
	// 		message: '请求超时',
	// 		position: 'bottom',
	// 		duration: 2000
	// 	});
	// }else{
	// 	Toast({
	// 		message: '系统异常',
	// 		position: 'bottom',
	// 		duration: 2000
	// 	});
	// }
	return Promise.reject(error)
});


axiosQixiu.interceptors.request.use(config => {
	// console.log('config', config)
	let token= getCityToken()
	if(token && !config.noLogin) {
		config.headers.token= token
	}
	Indicator.close()
	Indicator.open({
		text: '请稍候...',
		spinnerType: 'snake'
	});
	return config
}, error => {
	Indicator.close()
	return Promise.reject(error);
});


axiosQixiu.interceptors.response.use(response => {
	Indicator.close()
	switch (response.data.code){
		case '0': break
		case '401':
		case '2000':
		case '100':
			logout()
			break

		// case '000001':
		//   Toast('系统异常')
		//   return
		//   break
		default:{
			let content= ''
			if(response.data.status) content+= response.data.status
			if(response.data.message) content+= ' '+response.data.message
			if(response.data.msg) content+= ' '+response.data.msg
			if(response.data.code &&content){
				if(toast) toast.close()
				toast = Toast(content)
			}
		}
	}
	return response;
}, error => {
	// for(let key in error){
	// 	console.log(key)
	// }
	//  console.log('error.response', error.response)
	Indicator.close()
	// Toast({
	//   message: error.response.data.error,
	//   position: 'bottom',
	//   duration: 2000
	// });
	if(error.response.status==400){
		let msg= (error.response.data&& error.response.data.msg)? error.response.data.msg: '系统异常'
		Toast({
			message: msg,
			// position: 'bottom',
			duration: 2000
		});
	} else if(error.message == 'timeout of 10000ms exceeded'){
		Toast({
			message: '请求超时',
			position: 'bottom',
			duration: 2000
		});
	}else{
		Toast({
			message: '系统异常',
			position: 'bottom',
			duration: 2000
		});
	}
	return Promise.reject(error)
});


export default {axiosHxx, axiosQixiu};
