<template>
<div class="city-select">
	<mt-index-list>
		<div class="above">
			<div class="query">
				<div class="now">当前：<span>{{location.city|| '请选择'}}</span></div>
				<form action="javascript:;" class="common-search">
					<i class="fa fa-search icon"></i>
					<input type="search" ref="input" v-model="search" placeholder="城市名/拼音"/>
					<i class="fa fa-times-circle close" v-show="search" @click="close"></i>
				</form>
			</div>
			<div class="tag">
				<p>定位/最近访问</p>
				<ul>
					<li v-show="location.city"><i class="fa fa-map-marker"></i>{{location.city}}</li>
					<li v-for="(item, key) in cityHistory" :key="key">{{item.city}}</li>
				</ul>
			</div>
		</div>
		<mt-index-section v-for="(item, key) in area" :index="key" :key="key">
			<li v-for="(item2, key2) in item" :key="key2" @click="clickItem(2, item2)">{{item2.text}}</li>
		</mt-index-section>
	</mt-index-list>
</div>
</template>

<script>
import { getLocation } from '@/util.js'
export default {
	name: "city-select",
	data(){
		return {
			search: '',
			area: {
				'a': [
					{text: '上海', code: '310100'},
					{text: '上海2', code: '310300'},
				],
				'b': [
					{text: '北京', code: '110000'},
					{text: '北京2', code: '110000'},
				],
				'j': [
					{text: '济南', code: '370100'}
				]
			}
		}
	},
	computed:{
		nowCity(){
			return this.$store.state.app.city
		},
		location(){
			return this.$store.state.app.location
		},
		cityHistory(){
			return this.$store.state.app.cityHistory
		}
	},
	mounted(){
		getLocation().then((success)=> {
			if(!this.nowCity.citycode){
				if(success){
					this.selectCity( this.location)
				}
			}
		})
		this.getData()
	},
	methods:{
		getData(){
			this.axiosHxx.get('/common/method/getRegionList',{baseURL: '/hxx-api-proxy'}).then(res=>{
				if(res.data.success){
					this.reservationNum= res.data.total
				}
			})
		},
		selectCity(item){
			this.$store.dispatch('setCity', item);
		},
		close(){},
		clickItem(){},
	}
}
</script>

<style scoped lang="less">
.city-select{
	/*padding-left: 10px;*/
	width: 100%;
	height: 100vh;
	overflow: auto;
	.above{
		position: absolute;
		overflow: hidden;
		width: 100%;
		left: 0;
		top: 0;
		padding: 10px 20px 10px 10px;
		background-color: white;
		.query{
			width:100%;
			position: relative;
			padding-left: 80px;
			z-index: 1;
			background-color: white;
			.now{
				line-height: 30px;
				position: absolute;
				left: 0;
				top: 0;
				font-size: 12px;
				color: #666666;
				span{
					font-size: 14px;
					color: black;
				}
			}

		}
		.tag{
			margin-top: 10px;
			p{
				font-size: 12px;
				color: #666666;
			}
			ul{
				margin-top: 5px;
				overflow: hidden;
				li{
					display: inline-block;
					width: 90px;
					line-height: 28px;
					background: white;
					border-radius:2px;
					border:1px solid #D7D7D7;
					font-size: 14px;
					color: #333333;
					text-align: center;
					margin-right: 10px;
					i{
						color: #FF6633;
					}
					&:last-child{
						margin: 0;
					}
				}

			}
		}
	}
}
</style>
<style lang="less">
.city-select{
	.mint-indexlist{
		padding-top: 110px;
		.mint-indexlist-nav{
			z-index: 2;
			border: 0;
		}
		.mint-indexlist-content{
			.mint-indexsection{
				.mint-indexsection-index{
					color: #9D9D9D;
					background-color: white;
					font-size: 12px;
					padding-bottom: 0;
				}
				ul{
					padding-left: 10px;
					li{
						line-height: 44px;
						font-size: 14px;
						color: black;
						border-bottom: 1px solid #D9D9D9;
					}
				}
			}
		}
	}

}
</style>
