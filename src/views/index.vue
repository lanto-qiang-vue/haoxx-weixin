<template>
<div class="index">
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
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
	</div>
	<ul class="button">
		<router-link tag="li" to="/maintain"><img src="~@/assets/img/index/查选维修.png"/><p>查选维修</p></router-link>
		<router-link tag="li" :to="recordPath"><img src="~@/assets/img/index/维修记录.png"/><p>维修记录</p></router-link>
		<router-link tag="li" to="/remark-map"><img src="~@/assets/img/index/维修点评.png"/><p>维修点评</p></router-link>
		<router-link tag="li" to="/my-car-list"><img src="~@/assets/img/index/我的爱车.png"/><p>我的爱车</p></router-link>
		<router-link tag="li" to="/coupons-type"><img src="~@/assets/img/index/车主权益.png"/><p>车主权益</p></router-link>
	</ul>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	name: "index",
	components: {swiper, swiperSlide},
	data(){
		return{
			banners:[
				{createTime: "", id: 0, imageUrl: "http://download.image.lanto.com/2019/03/12/1552379660547.png", linkTarget: "", linkUrl: "#", place: 9, seq: 0, show: false, terminal: null, title: "石墨烯", updateTime: ""}
				],
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
			recordPath: '/my-car-list'
		}
	},
	computed:{
		qixiutoken(){
			return this.$store.state.user.qixiutoken
		},
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
			}).then( (res) => {
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
	},
}
</script>

<style scoped lang="less">
.index{
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
		margin-top: 20px;
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
