<template>
<div class="index">
	<router-link tag="div" to="/city-select" class="area">
		{{appstore.city.regionName|| '请选择城市'}}<i class="fa fa-angle-down"></i>
	</router-link>
	<div class="banner" v-if="showSwiper">
		<swiper :options="swiperOption" ref="mySwiper" class="banner-swiper" >
			<swiper-slide v-for="(item, index) in banners" :key="index">
				<div class='dummy'></div>
				<ul class='content'>
					<a v-if="bannerLink(item).outside" class="banner-body" :href="bannerLink(item).to"
					   :target="bannerLink(item).target" :style="'cursor:'+ bannerLink(item).cursor">
						<img :src="item.imageUrl"></a>
					<router-link v-else tag="a" :to="bannerLink(item).to" class="banner-body" :target="bannerLink(item).target"
					           :style="'cursor:'+ bannerLink(item).cursor">
						<img :src="item.imageUrl"></router-link>
				</ul>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
	<ul class="button">
		<router-link tag="li" to="/maintain"><img src="~@/assets/img/index/查选维修.png"/><p>查选维修</p></router-link>
		<router-link tag="li" :to="recordPath"><img src="~@/assets/img/index/维修记录.png"/><p>维修记录</p></router-link>
		<router-link tag="li" to="/remark-map"><img src="~@/assets/img/index/维修点评.png"/><p>维修点评</p></router-link>
		<router-link tag="li" to="/my-car-list"><img src="~@/assets/img/index/我的爱车.png"/><p>我的爱车</p></router-link>
		<!--<router-link tag="li" to="/coupons-type"><img src="~@/assets/img/index/车主权益.png"/><p>车主权益</p></router-link>-->
	</ul>
	<ul class="coupons">
		<p class="title">车主权益<span @click="goCoupons">查看更多</span></p>
		<li @click="goCoupons">洗车券<span>查看可用券</span></li>&thinsp;
		<li @click="goCoupons">保养券<span>查看可用券</span></li>&thinsp;
		<li @click="goCoupons">油漆券<span>查看可用券</span></li>
	</ul>

	<topics-list :top="40" :hottestShow="false" :isIndex="true"></topics-list>

</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getCityToken} from '@/util'
import TopicsList from '@/views/forum/TopicsList.vue'
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
		}
	},
	computed:{
		qixiutoken(){
			return getCityToken()
		},
		appstore(){
			return this.$store.state.app
		}
	},
	mounted(){
		this.getBanner()
		this.init()
	},
	methods:{
		init(){
			if(this.qixiutoken){
				this.axiosQixiu.post('/vehicle/owner/queryVehicelist', {"page": 1, "pageSize": 1,}).then( (res) => {
					if(res.data.code=='0'){
						if(res.data.total==1){
							let item= res.data.items[0]
							this.recordPath= `/record-list?id=${item.vin}&vehicleplatenumber=${item.vehicleplatenumber}`
						}
					}
				})
			}
		},
		getBanner(){
			this.axiosQixiu.post('/banner/query', {
				terminal: 'W',
				useSystem: 2,
			},{noLogin: true}).then( (res) => {
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
		goCoupons(){
			this.$router.push('/coupons-type')
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
	.banner{
		position: relative;
		.banner-swiper{
			.dummy{
				margin-top: 45%;
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
	.coupons{
		border-top: 10px solid #F3F3F3;
		text-align: justify;
		padding: 0 10px;
		height: 105px;
		.title{
			color: #333333;
			font-size: 14px;
			font-weight: 500;
			line-height: 36px;
			span{
				float: right;
				font-size: 12px;
			}
		}
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
			font-size: 16px;
			line-height: 28px;
			font-weight: 500;
			span{
				display: block;
				font-size: 12px;
				color: #8A0A0A;
				line-height: 20px;
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
				left: 0;
				bottom: 22px;
				width: 100%;
				height: 1px;
				border-top:1px dotted #E48E69;
				opacity: .5;
			}
		}
	}
	.forum{
		border-top: 10px solid #F3F3F3;
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
