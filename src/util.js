import axios from './axios.js'
import config from '~/config.js'

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}


/**
 * @param {obj} 任意参数
 * @returns {String}
 * @description 判断参数类型
 */
export const getType = (obj) => {
  //tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  if(obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}

/**
 * @param {data} 任意参数
 * @returns {Object}
 * @description 任意数据深拷贝
 */
export const deepClone = (data) => {
  let type = getType(data);
  let obj;
  if(type === 'array'){
    obj = [];
  } else if(type === 'object'){
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if(type === 'array'){
    for(let i = 0, len = data.length; i < len; i++){
      obj.push(deepClone(data[i]));
    }
  } else if(type === 'object'){
    for(let key in data){
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

export const  base64ToBlob= (dataurl) => {
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
}

export const imgUrlToBase64 = (url, callBack) => {
	var image = new Image();

	image.onload=function(){

		for( let key in image){
			console.log('key', key)
		}
		console.log('image.currentSrc', image.currentSrc)
		var width = image.width;
		var height = image.height;
		_compress( url,
			{width: width, height:height, quality: 0.6, type: ''} ,
			image.name,
			callBack
		)
	};
	image.src= url;

}

/**
 * @param {thisfile} 图片文件
 * @param {callBack} 回调函数
 * @returns {base64, filename}
 * @description 图片压缩并转base64
 */
export const imgToBase64 = (thisfile, callBack) => {
  // var file= $(domName).get(0).files[0]
  var file= thisfile
  var reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    var image = new Image();
    var self= this
    image.src= e.target.result;
    image.onload=function(){
      var width = image.width;
      var height = image.height;
      _compress(self.result,
        {width: width, height:height, quality: 0.6, type: file.type} ,
        file.name,
        callBack
      )
    };
  }
}
export const _compress = (path, obj, name, callBack) => {
  var img = new Image();
  img.src = path;
  img.onload = function () {
    var that = this;
    // 默认按比例压缩
    var w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    if(w> 1000){
    	w= 1000
	    h= 1000/scale
    }
    var quality = 0.7;  // 默认图片质量为0.7
    //生成canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // 创建属性节点
    var anw = document.createAttribute("width");
    anw.nodeValue = w;
    var anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL(obj.type|| 'image/png', quality);
    // console.log(base64)
    // 返回base64的值
    callBack(base64, name )
  }

}

export const formatMoney =(val, decimals, dec_point, thousands_sep)=> {
  /*
  　　 * 参数说明：
  　　 * number：要格式化的数字
  　　 * decimals：保留几位小数
  　　 * dec_point：小数点符号
  　　 * thousands_sep：千分位符号
  　　 * */
  if(val=== undefined || val=== null ) return ''
  let number = (val + '').replace(/[^0-9+-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      let k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  let re = /(-?\d+)(\d{3})/;
  while(re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/**
 * @param {String|Number} data 各种日期格式
 * @param {String} timeStamp 格式字符串,默认值 yyyy-MM-dd
 * @returns {String} 相对时间字符串
 */
export const formatDate= (value1, format) => {
	if (value1) {
		// console.log('转化之前',value);
		let value= null
		if( typeof value1== 'string'){
			let value2= value1.replace(/-/g,'/')
			value = new Date(value2);
			if(value=='Invalid Date'){
				value= new Date(value1)
			}
		}else{
			value= new Date(value1)
		}

		// console.log('转化hi后',value);
		let o = {
			"M+": value.getMonth() + 1, //month
			"d+": value.getDate(),    //day
			"h+": value.getHours(),   //hour
			"m+": value.getMinutes(), //minute
			"s+": value.getSeconds(), //second
			"q+": Math.floor((value.getMonth() + 3) / 3),  //quarter
			"S": value.getMilliseconds() //millisecond
		}
		if(!format) format='yyyy/MM/dd'
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
			(value.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (let k in o)if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	} else {
		return '';
	}
};

export const getwxticket= (jsApiList, callback) => {
	axios.get('/weixin/qixiu/ticket/jsapi?url='+ (window.location.href.split('#')[0])).then(res=>{
	// axios.get('/weixin/qixiu/ticket/jsapi?url='+('http://192.168.169.121:8888?code=0716QWVV0hJ0b22adjVV0QF6WV06QWVe&state=snsapi_base')).then(res=>{
		wx.config({
			debug: false,
			appId: config.appid,
			timestamp: res.data.timeStamp,
			nonceStr: res.data.uuid,
			signature: res.data.signature,
			jsApiList: jsApiList
		})
	})
}

export const isIos= () => {
	// let u = navigator.userAgent
	let isIOS = !!(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))
	return isIOS
}

export const isWeixn=()=>{
	let ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
	} else {
		return false;
	}
}


/**
 * @description 改变对象key
 * @param keyObj {Object} key数组对象,每组key长度必须相同
 * @param obj {Object} 要改变key的对象（按情况需使用深拷贝对象）
 * @param before {String} 改变前的key集合
 * @param after {String} 改变后的key集合
 * @returns {Object} 改变key后的对象
 * @使用范例 let turn= new turnKey({
	            key1:['a', 'b'],
				key2:['a1', 'b1'],
				key3:['a2', 'b2'],
			})
            console.log( turn({a: 123, b:456}, 'key1', 'key3'))  //{a2: 123, b2:456}
 */
export const turnKey= function(keyObj){
	return (obj, before, after)=>{
		let res= {}
		for(let key in obj){
			for(let i in keyObj[before]){
				if(keyObj[before][i]== key){
					res[keyObj[after][i]]= obj[key]
				}
			}
		}
		return res
	}
}

export const reg={
	idcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
	vehicle: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/,
	vin: /^[A-Z0-9]{17}$/,
	mobile: /^1[3456789]\d{9}$/,
}
