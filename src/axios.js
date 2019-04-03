import axios from 'axios'
import router from './router'

import { Toast, Indicator, Popup } from 'mint-ui'
import { isWeixn} from './util'

let axiosHxx= axios.create({
	baseURL: '/hxx-proxy/',
	timeout: 6000,
	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
});

let axiosQixui= axios.create({
	baseURL: '/hxx-proxy/',
	timeout: 6000,
	headers: {'Content-Type': 'application/json;charset=UTF-8'}
});

axiosHxx.interceptors.request.use(config => {
	let data= config.data
	let contentType= config.headers['Content-Type']
	if(contentType.indexOf('application/x-www-form-urlencoded')>=0){
		let form = new FormData();
		for(let key in data){
			form.append(key, data[key]);
		}
		config.data= form
	}

	// let token= localStorage.getItem("ACCESSTOKEN")
	// if(token) {
	// 	config.headers.token= token
	// }
    Indicator.open({
      text: '请稍候...',
      spinnerType: 'snake'
    });
    return config
  },
  error => {
    return Promise.reject(error);
});


// Add a response interceptor 响应拦截器
axiosHxx.interceptors.response.use(response => {
    Indicator.close()
	  console.log('response', response)

	  let { data } = response
	  console.log('data', data)
	  if (data &&!data.success) {
		  	if(data.code == 808){
			    Toast("请重新登陆");
			    return false;
		    }else Toast(data.title);
	  }
    return response;
  },
  error => {
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


axiosQixui.interceptors.request.use(config => {
	let token= localStorage.getItem("ACCESSTOKEN")
	if(token) {
		config.headers.token= token
	}
	Indicator.open({
		text: '请稍候...',
		spinnerType: 'snake'
	});
	return config
},
error => {
	return Promise.reject(error);
});


axiosQixui.interceptors.response.use(
	response => {
		Indicator.close()
		switch (response.data.code){
			case '0': break
			case '401':
			case '2000':
			case '100':

				localStorage.removeItem("ACCESSTOKEN")
				localStorage.removeItem("USERINFO")

				weixinLogin()

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
					toast= Toast(content)
				}
			}
		}
		return response;
	},
	error => {
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


function weixinLogin() {
  if(isWeixn() &&localStorage.getItem('UNIONID')){
	  Indicator.close()
    Toast('登录中')

    axiosHxx({
      url: '/user/useraccount/login',
      method: 'post',
      data: {
		  openid: localStorage.getItem('UNIONID')+','+localStorage.getItem('QXWOPENID'),
		  loginMethod: "微信",
		  workOn: process.env.NODE_ENV!='development' ? 'pPro' : 'pDev',
		  system: "wechatqixiu"
	  }
    }).then(res=>{
      console.log(res.data.code)
      if(res.data.code === "0"){
	      localStorage.setItem("ACCESSTOKEN", res.data.item.accessToken);
	      localStorage.setItem("USERINFO", JSON.stringify(res.data.item));

        router.replace({ path: '/'})
      }else if(res.data.code === "141010"){

        setTimeout(function () {
          Toast('此微信未绑定手机号，请手动登录')
        },1000)

        router.replace({ path: '/'})
      }else {
        setTimeout(function () {
          Toast(res.data.status)
	        router.replace({ path: '/login'})
        },1000)
      }
    })
  }
}

export default {axiosHxx, axiosQixui};
