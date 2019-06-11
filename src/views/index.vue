<template>
<div class="index">
	<router-link tag="div" to="/city-select" class="area">
		{{appstore.city.regionName|| '请选择城市'}}<i class="fa fa-angle-down"></i>
	</router-link>
	<router-link  to="/maintain" class="maintain"><i class="fa fa-search icon"></i>查选维修</router-link>
	<div class="banner" v-if="showSwiper">
		<swiper :options="swiperOption" ref="mySwiper" class="banner-swiper" >
			<swiper-slide v-for="(item, index) in banners" :key="index">
				<div class='dummy'></div>
				<ul class='content'>
					<a v-if="bannerLink(item).outside" class="banner-body" :href="bannerLink(item).to"
					   :target="bannerLink(item).target" :style="'cursor:'+ bannerLink(item).cursor">
						<img :src="item.imageUrl"></a>
					<router-link v-else tag="a" :to="bannerLink(item).to" class="banner-body"
					             :target="bannerLink(item).target"
					             :style="'cursor:'+ bannerLink(item).cursor">
						<img :src="item.imageUrl"></router-link>
				</ul>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
	<!--<ul class="button">-->
		<!--<router-link tag="li" to="/maintain"><img src="~@/assets/img/index/查选维修.png"/><p>查选维修</p></router-link>-->
		<!--<router-link tag="li" :to="recordPath"><img src="~@/assets/img/index/维修记录.png"/><p>维修记录</p></router-link>-->
		<!--<router-link tag="li" to="/remark-map"><img src="~@/assets/img/index/维修点评.png"/><p>维修点评</p></router-link>-->
		<!--<router-link tag="li" to="/my-car-list"><img src="~@/assets/img/index/我的爱车.png"/><p>我的爱车</p></router-link>-->
		<!--<router-link tag="li" to="/coupons-type"><img src="~@/assets/img/index/车主权益.png"/><p>车主权益</p></router-link>-->
	<!--</ul>-->
	<ul class="my-cars">
		<!--<p class="title">我的爱车</p>-->
		<router-link tag="li" :to="myCarPath">
			<img src="~@/assets/img/index/我的爱车2.png"/>
			<p><i class="zmdi zmdi-plus-circle-o"></i>我的爱车</p>
		</router-link>
		<router-link tag="li" to="/report/query-vin" v-show="showReport">
			<img src="~@/assets/img/index/车史报告.png"/>
			<p>车史报告</p>
		</router-link>
		<router-link tag="li" to="/remark-map" v-show="isShanghai">
			<img src="~@/assets/img/index/维修点评2.png"/>
			<p><i class="fa fa-thumbs-o-up"></i>维修点评</p>
		</router-link>
		<li></li>
	</ul>
	<ul class="coupons block">
		<p class="title">车主权益<span @click="goCoupons(null)">查看更多</span></p>
		<router-link tag="li" to="/obu" class="etc">
			<img src="~@/assets/img/index/etc.png"/>
		</router-link>&thinsp;
		<li @click="goCoupons('洗车')">洗车券<span>查看可用券</span></li>&thinsp;
		<li @click="goCoupons('保养')">保养券<span>查看可用券</span></li>
	</ul>
	<ul class="block">
		<p class="title">车谈话题
		</p>
	</ul>
	<topics-list :top="0" :hottestShow="false" :isIndex="true" class="topics-list"></topics-list>
	<p class="coupons-more">
		<router-link tag="span" to="/forum" class="more">查看更多</router-link>
	</p>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getCityToken} from '@/util'
import TopicsList from '@/views/forum/part/TopicsList.vue'
export default {
	name: "index",
	components: {swiper, swiperSlide, TopicsList},
	data(){
		return{
			banners:[],
			swiperOption: {
				centeredSlides : true,
				loop : true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
			},
			showSwiper: false,
			// recordPath: '/my-car-list',
			comments:{
				list: [],
				page: 1,
				total: 0,
				allLoaded: false
			},
			couponsType: [],
			myCarPath: '/car-list',
			showReport: false
		}
	},
	computed:{
		qixiutoken(){
			return getCityToken()
		},
		appstore(){
			return this.$store.state.app
		},
		isLogin(){
			return this.$store.state.user.hxxtoken
		},
		isShanghai(){
			return this.$store.state.app.city && this.$store.state.app.city.regionId
			&& this.$store.state.app.city.regionId.toString().substring(0, 3)=='310'
		}
	},
	mounted(){
		this.getBanner()
		this.init()
		// setTimeout(()=>{
		// 	this.$indicator.open({
		// 		text: '请稍候...',
		// 		spinnerType: 'snake'
		// 	});
		// },1000)
	},
	methods:{
		init(){
			// if(this.qixiutoken){
			// 	this.axiosQixiu.post('/vehicle/owner/queryVehicelist',
			// 		{"page": 1, "pageSize": 1,}).then( (res) => {
			// 		if(res.data.code=='0'){
			// 			if(res.data.total==1){
			// 				let item= res.data.items[0]
			// 				this.recordPath= `/record-list?id=${item.vin}&vehicleplatenumber=${item.vehicleplatenumber}`
			// 			}
			// 		}
			// 	})
			// }
			if(this.isLogin){
				this.axiosHxx.post('/operate/coupon/mycoupons',
					{USER_ID:this.$store.state.user.userinfo.userId}).then(res => {
					if(res.data.success){
						if(res.data.data &&res.data.data.length){
							this.couponsType = res.data.data;
						}
					}
				})
				this.axiosQixiu.post( '/hxxdc/vehicle/bind/list', {
					pageNo: 1,
					pageSize: 1,
				},{hxxtoken: true}).then( (res) => {
					if(res.data.code=='0' &&res.data.total>0){
						this.myCarPath= '/car-list'
					}else{
						this.myCarPath= '/bind-car'
					}
				})
				this.axiosQixiu.get( '/hxxdc/activity/check/1',{hxxtoken: true}).then( (res) => {
					if(res.data.code=='0'){
						if(res.data.item) this.showReport= true
					}
				})
			}
		},
		getBanner(){
			this.axiosQixiu.post('/banner/query', {
				terminal: 'W',
				useSystem: 2,
			},{noLogin: true,  constBaseUrl: true}).then( (res) => {
				if(res.data.code=='0'){
					this.banners= res.data.items
					this.showSwiper= true
				}
			})
		},
		bannerLink(item){
			let obj={
				cursor: 'default',
				target: '',
				to: '/',
				outside: false
			}
			if(item.linkUrl.indexOf('http')>=0){
				obj.outside= true
			}
			if(item.linkUrl!='/'){
				obj.cursor= 'pointer'
				obj.to= item.linkUrl
				if(item.linkTarget== '_blank'){
					obj.target= '_blank'
				}
			}
			return obj
		},
		goCoupons(name){
			// console.log('name', name)
			if(this.isLogin){
				if(name){
					let arr= this.couponsType, type= '', canuse= ''
					for( let i in arr){
						if(arr[i].name.indexOf(name) >= 0){
							type= arr[i].type
							canuse= arr[i].canuse
						}
					}
					if(type){
						this.$router.push( '/coupons?type='+ type+'&canuse='+ canuse)
					}else{
						this.$toast('暂无优惠券')
					}
				}else{
					this.$router.push('/coupons-type')
				}
			}else{
				this.$router.push('/coupons-type')
			}
		}
	},
}
</script>

<style scoped lang="less">
.index{
	height: 100%;
	overflow: auto;
	.area{
		line-height: 30px;
		padding: 0 15px;
		display: inline-block;
		font-size: 14px;
		i{
			margin-left: 5px;
			font-size: 20px;
			vertical-align: top;
			line-height: 28px;
		}
	}
	.maintain{
		font-size: 14px;
		color: #666666;
		float: right;
		line-height: 30px;
		margin-right: 15px;
		i{
			color: #FF6D0E;
			margin-right: 5px;
		}
	}
	.banner{
		position: relative;
		.banner-swiper{
			.dummy{
				margin-top: 35%;
			}
			.content {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				.banner-body{
					width: 100%;
					height: 100%;
					div{
						margin: 20px 0;
						height: 20px;
						line-height: 20px;
						padding-left: 10px;
						border-left: 2px solid #999999;
						font-size: 16px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					img{

						width: 100%;
						height: 100%;
					}
				}
			}


		}
	}
	.button{
		margin-top: 10px;
		overflow: hidden;
		li{
			padding: 0 10px;
			width: 25%;
			float: left;
			text-align: center;
			margin-bottom: 14px;
			img{
				width: 100%;
				max-width: 55px;
			}
			p{
				margin-top: 5px;
				color: #333333;
				font-size: 14px;
			}
		}
	}
	.block{
		border-top: 5px solid #F3F3F3;
		padding: 0 10px;
		.title{
			color: #333333;
			font-size: 14px;
			font-weight: 600;
			line-height: 36px;
			span{
				color: #666666;
				float: right;
				font-size: 12px;
				font-weight: 400;
			}
		}
	}
	.my-cars{
		overflow: hidden;
		margin: 5px 10px;
		position: relative;
		li{
			width: 32%;
			display: inline-block;
			position: relative;
			overflow: visible;
			padding: 2px;
			img{
				width: 100%;
				border-radius: 4px;
			}
			&:nth-child(1){
				float: left;
				img{
					box-shadow:0 1px 1px 0 #208BF1;
				}
			}
			&:nth-child(2){
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				img{
					box-shadow:0 1px 1px 0 #208BF1;
				}
			}
			&:nth-child(3){
				float: right;
				img{
					box-shadow: 0 1px 1px 0 #F07315;
				}
			}

			p{
				text-align: left;
				position: absolute;
				right: 10px;
				bottom: 5px;
				color: white;
				font-size: 12px;
				i{
					font-size: 16px;
					vertical-align: text-bottom;
					margin-right: 5px;
				}
			}
		}
	}
	.coupons{
		text-align: justify;
		height: 100px;
		font-size: 0;
		&:after{
			content: '';
			display: inline-block;
			width: 100%;
		}
		li{
			display: inline-block;
			overflow: hidden;
			height: 50px;
			min-width: 95px;
			width: 32%;
			/*max-width: 100px;*/
			text-align: center;
			background:linear-gradient(180deg, #fff2da, #FFB45F);
			box-shadow:0px 1px 2px 0px rgba(144,138,138,0.5);
			border-radius:3px;
			position: relative;
			color: #F70813;
			font-size: 16px;
			line-height: 32px;
			font-weight: 600;
			vertical-align: middle;
			span{
				font-weight: 400;
				display: block;
				font-size: 12px;
				color: #8A0A0A;
				line-height: 14px;
				transform: scale(.8);
				opacity: .7;
			}
			&:before{
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				border: 2px dashed #FA5E54;
			}
			&:after{
				content: '';
				display: block;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 22px;
				width: 90%;
				height: 1px;
				border-top:1px dotted #E48E69;
				opacity: .5;
			}
		}
		.etc{
			img{
				height: 34px;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
			&:after{
				display: none;
			}
		}
	}
	/*.forum{*/
		/*border-top: 10px solid #F3F3F3;*/
	/*}*/
	.coupons-more{
		text-align: center;
		position: relative;
		line-height: 60px;
		span{
			line-height: 20px;
			color: #666666;
			font-size: 12px;
			font-weight: 400;
		}
	}
}
</style>
<style lang="less">
.index{
	.swiper-pagination-bullet{
		background-color: #cccccc;
	}
	.swiper-pagination-bullet-active{
		background-color: #444444;
		opacity: .2;
	}
	.banner .content .mint-swipe-indicator.is-active{
		background-color: white;
		opacity: 1;
	}
	.topics-list .body .list li:first-child{
		padding-top: 0;
	}
}
</style>
