<template>
<div :class="['app-body', {'show-footer': showFooter}]">
	<router-view v-if="!keep.cache"></router-view>
	<keep-alive>
		<router-view v-if="keep.cache && !keep.needArea"></router-view>
	</keep-alive>
	<template v-for="item in confList">
		<keep-alive>
			<router-view v-if="keep.cache && keep.needArea && item.adcode==keep.area.adcode"></router-view>
		</keep-alive>
	</template>

	<ul class="footer" v-show="showFooter">
		<router-link to="/" tag="li" :class="{on: active('/')}">
			<img src="~@/assets/img/index/home.png" v-show="active('/')">
			<img src="~@/assets/img/index/home-off.png" v-show="!active('/')">
			<p>首页</p>
		</router-link>
		<router-link to="/forum" tag="li" :class="{on: active('/forum')}">
			<img src="~@/assets/img/index/forum.png" v-show="active('/forum')">
			<img src="~@/assets/img/index/forum-off.png" v-show="!active('/forum')">
			<p>车谈</p>
		</router-link>
		<router-link to="/my" tag="li" :class="{on: active('/my')}">
			<img src="~@/assets/img/index/my.png" v-show="active('/my')">
			<img src="~@/assets/img/index/my-off.png" v-show="!active('/my')">
			<p>我的</p>
		</router-link>
	</ul>
</div>
</template>

<script>
import { cityIsSupport } from '@/util.js'
import config from '~/config.js'
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
		},
		keep(){
			let cache= this.$route.meta.cache, needArea= this.$route.meta.needArea
			let obj={
				cache,
				needArea
			}
			if(needArea){
				obj.area= cityIsSupport(true)
			}
			return obj
		},
		confList(){
			return config.location
		}
		// appstore(){
		// 	return this.$store.state.app
		// }
	},
	watch:{
		showFooter(show){
			if(show){
				document.body.addEventListener('touchend', this.bodyScrollTop, { passive: false });
			}else{
				document.body.removeEventListener('touchend', this.bodyScrollTop,false)
			}
		}
	},
	mounted(){

		$('body').on('blur', 'input, textarea', ()=>{
			// console.log('blur')
			if($('body').scrollTop()!= 0 ) $('body').scrollTop(0)
		})

	},
	methods:{
		bodyScrollTop(){
			if(document.body.scrollTop!=0) window.scrollTo(0,0);
		},
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
			width: 33%;
			display: inline-block;
			vertical-align: top;
			padding-top: 8px;
			img{
				height: 20px;
				margin-bottom: 2px;
			}
			p{
				font-size: 12px;
				color: #666666;
				/*transform: scale(0.8);*/
			}
			&.on p{
				color: #FF6D0E;
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
