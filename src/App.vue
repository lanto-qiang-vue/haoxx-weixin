<template>
<div :class="['app-body', {'show-footer': showFooter}]">
	<router-view v-if="!cache"></router-view>
	<keep-alive><router-view v-if="cache"></router-view></keep-alive>

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
import { getWeixinId, getLocation } from '@/util.js'
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
		getLocation()

		getWeixinId()

		$('body').on('blur', 'input, textarea', ()=>{
			// console.log('blur')
			if($('body').scrollTop()!= 0 ) $('body').scrollTop(0)
		})


	},
	methods:{

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
