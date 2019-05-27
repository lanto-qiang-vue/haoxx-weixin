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
	<ul class="my-cars block" style="border: 0;padding-top: 10px">
		<!--<p class="title">我的爱车</p>-->
		<router-link tag="li" to="/my-car-list">
			<img src="~@/assets/img/index/我的爱车2.png"/>
			<p><i class="zmdi zmdi-plus-circle-o"></i>我的爱车</p>
		</router-link>
		<router-link tag="li" to="/remark-map" v-show="isShanghai">
			<img src="~@/assets/img/index/维修点评2.png"/><p>维修点评</p>
		</router-link>
		<li></li>
	</ul>
	<ul class="coupons block">
		<p class="title">车主权益<span @click="goCoupons">查看更多</span></p>
		<li @click="goCoupons('洗车')">洗车券<span>查看可用券</span></li>&thinsp;
		<li @click="goCoupons('保养')">保养券<span>查看可用券</span></li>&thinsp;
		<li @click="goCoupons('油漆')">油漆券<span>查看可用券</span></li>
	</ul>
	<ul class="block">
		<p class="title">车谈话题
			<router-link tag="span" to="/forum" class="more">查看更多</router-link>
		</p>
	</ul>
	<topics-list :top="0" :hottestShow="false" :isIndex="true" class="topics-list"></topics-list>
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
			recordPath: '/my-car-list',
			comments:{
				list: [],
				page: 1,
				total: 0,
				allLoaded: false
			},
			couponsType: []
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
			if(this.qixiutoken){
				this.axiosQixiu.post('/vehicle/owner/queryVehicelist',
					{"page": 1, "pageSize": 1,}).then( (res) => {
					if(res.data.code=='0'){
						if(res.data.total==1){
							let item= res.data.items[0]
							this.recordPath= `/record-list?id=${item.vin}&vehicleplatenumber=${item.vehicleplatenumber}`
						}
					}
				})
			}
			if(this.isLogin){
				this.axiosHxx.post('/operate/coupon/mycoupons',
					{USER_ID:this.$store.state.user.userinfo.userId}).then(res => {
					if(res.data.success){
						if(res.data.data &&res.data.data.length){
							this.couponsType = res.data.data;
						}
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
			if(this.isLogin && name){
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
		color: #FF6D0E;
		float: right;
		line-height: 30px;
		margin-right: 15px;
		i{
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
			font-weight: 500;
			line-height: 36px;
			span{
				color: #333333;
				float: right;
				font-size: 12px;
				font-weight: 400;
			}
		}
	}
	.my-cars{
		text-align: center;
		overflow: hidden;
		p{
			text-align: left;
		}
		li{
			width: 32%;
			display: inline-block;
			position: relative;
			margin-bottom: 10px;
			&:nth-child(1){
				float: left;
			}
			&:nth-child(3){
				float: right;
			}
			img{
				width: 100%;
			}
			p{
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
		height: 105px;
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
			width: 30%;
			/*max-width: 100px;*/
			text-align: center;
			background:linear-gradient(180deg, #fff2da, #FFB45F);
			box-shadow:0px 1px 2px 0px rgba(144,138,138,0.5);
			border-radius:3px;
			position: relative;
			color: #F70813;
			font-size: 14px;
			line-height: 28px;
			font-weight: 500;
			span{
				font-weight: 400;
				display: block;
				font-size: 12px;
				color: #8A0A0A;
				line-height: 20px;
				transform: scale(.8);
			}
			&:before{
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				border:2px dashed #FA5E54;
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
	}
	/*.forum{*/
		/*border-top: 10px solid #F3F3F3;*/
	/*}*/
	.topics-list{
		top: -10px;
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
}
</style>
