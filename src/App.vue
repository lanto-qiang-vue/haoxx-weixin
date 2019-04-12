<template>
<div :class="['app-body', {'show-footer': showFooter}]">
	<router-view v-if="!cache"/>
	<keep-alive v-else><router-view /></keep-alive>

	<ul class="footer" v-show="showFooter">
		<router-link to="/" tag="li">
			<img src="~@/assets/img/index/home.png" v-show="active('/')">
			<img src="~@/assets/img/index/home-off.png" v-show="!active('/')">
			<p>首页</p>
		</router-link>
		<router-link to="/my" tag="li">
			<img src="~@/assets/img/index/my.png" v-show="active('/my')">
			<img src="~@/assets/img/index/my-off.png" v-show="!active('/my')">
			<p>我的</p>
		</router-link>
	</ul>
</div>
</template>

<script>

export default {
	name: "app-body",
	computed:{
		active(){
			return (path)=>{
				return this.$route.path== path
			}
		},
		showFooter(){
			return this.$route.meta.footer
		},
		cache(){
			return this.$route.meta.cache
		}
	},
	mounted(){
		let state= this.getUrlParam('state')
		let appId= 'wx71b3e2a11334e62d', URL= encodeURIComponent(window.location.href)
		if(this.isWeixn() && !state){
			window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${URL}&response_type=code&scope=snsapi_userinfo&state=snsapi_base#wechat_redirect`
		}

	},
	methods:{
		isWeixn(){
			let ua = navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i)=="micromessenger") {
				return true;
			} else {
				return false;
			}
		},
		getUrlParam(name) {
			let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			let r = window.location.search.substr(1).match(reg);
			// if(r!=null)return  unescape(r[2]); return null;
			if(r!=null)return r[2];
			return null;
		}
	}
}
</script>

<style scoped lang="less">
.app-body{
	min-height: 100vh;
	.footer{
		height: 50px;
		width: 100%;
		background: #FAFAFA;
		box-shadow:0px -1px 0px 0px #EDEDED;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 1;
		text-align: center;
		-webkit-transform: translateZ(0);
		li{
			height: 100%;
			width: 100px;
			display: inline-block;
			vertical-align: top;
			padding-top: 8px;
			img{
				height: 20px;
			}
			p{
				font-size: 12px;
				color: #333333;
			}
		}
	}
	&.show-footer{
		height: 100vh;
		padding-bottom: 50px;
		overflow: auto;
	}
}
</style>
