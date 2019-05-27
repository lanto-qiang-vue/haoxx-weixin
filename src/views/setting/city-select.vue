<template>
<div class="city-select">
	<div class="above">
		<div class="query">
			<div class="now" v-if="nowCity.regionId">当前：<span>{{nowCity.regionName}}</span></div>
			<div class="now" v-else><span>请选择</span></div>
			<search placeholder="城市名/拼音" @enter="enter" v-model="search" ref="search" @change="change"></search>
		</div>
		<div class="tag">
			<p>定位/最近访问</p>
			<ul>
				<li v-show="location.adcode" @click="selectLocation"><i class="fa fa-map-marker"></i>
					{{location.city || location.province}}</li>
				<li v-for="(item, key) in cityHistory" :key="key" @click="selectCity(item)">{{item.regionName}}</li>
			</ul>
		</div>
	</div>
	<mt-index-list>
		<mt-index-section v-for="(item, key) in showList" :index="key" :key="key">
			<li v-for="(item2, key2) in item" :key="key2" @click="selectCity(item2)">{{item2.regionName}}</li>
		</mt-index-section>
	</mt-index-list>
</div>
</template>

<script>
import { getLocation, cityIsSupport} from '@/util.js'
import pinying from '~/public/lib/pinying.js'
import Search from '@/components/common-search.vue'
// import { deepClone } from '@/util.js'
export default {
	name: "city-select",
	components: { Search},
	data(){
		return {
			search: '',
			indexList: {},
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
		},
		showList(){
			let obj= {}, search= this.search.trim()
			if(search){
				for(let key in this.indexList){
					let match= false, arr=[]
					for(let i in this.indexList[key]){
						if(this.indexList[key][i].regionName.toUpperCase().indexOf(search.toUpperCase())>=0){
							// obj[key]=  this.indexList[key]
							match= true
							arr.push(this.indexList[key][i])
						}else if(pinying(this.indexList[key][i].regionName[0])[0]== search.toUpperCase()){
							match= true
							arr.push(this.indexList[key][i])
						}
					}
					if(match) obj[key]= arr
				}
				return obj
			}else return this.indexList
		},
	},
	mounted(){
		this.getData()
	},
	methods:{
		getData(){
			this.axiosHxx.get('/common/method/getRegionList',
				{baseURL: '/hxx-gateway-proxy'}
				).then(res=>{
				if(res.data.success){
					this.indexList= this.getIndexList(res.data.data)
				}
			})
		},
		getIndexList(arr){
			let resObj= {}
			for(let i =65; i<91; i++){
				let index= String.fromCharCode(i)
				resObj[index]=[]
				for (let j in arr){
					let letter= arr[j].regionName[0].toUpperCase();
					let letterNum= letter.charCodeAt()
					if(letterNum>=65 && letterNum<=90){
						if(letterNum== i){
							resObj[index].push(arr[j])
						}
					}else{
						let pyArr= pinying(letter)
						for(let k in pyArr){
							if(index== pyArr[k]){
								resObj[index].push(arr[j])
							}
						}
					}

				}
			}
			return resObj
		},
		enter(){

		},
		change(val){
			console.log('change(val)', val)
		},
		close(){

		},
		selectLocation(){
			this.$store.dispatch('setCity', {
				regionId: this.location.adcode,
				regionName: this.location.city ||this.location.province,
			});
			this.goBackUrl()
		},
		selectCity(item){
			this.$store.dispatch('setCity', item);
			this.goBackUrl()
		},
		goBackUrl(){
			if(cityIsSupport() &&this.$route.query.redirect){
				// if(this.$route.query.redirect){
				this.$router.replace({
					path: this.$route.query.redirect
				})
				// }else{
				// 	this.$router.go(-1)
				// }
			}else{
				this.$router.go(-1)
			}
		},
	}
}
</script>

<style scoped lang="less">
.city-select{
	/*width: 100%;*/
	/*height: 100vh;*/
	/*overflow: auto;*/
	/*position: fixed;*/
	/*left: 0;*/
	/*top: 0;*/
	.above{
		position: absolute;
		overflow: hidden;
		width: 100%;
		left: 0;
		top: 0;
		padding: 10px 24px 10px 10px;
		background-color: white;
		height: 110px;
		z-index: 1;
		.query{
			width:100%;
			position: relative;
			padding-left: 90px;
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
				white-space: nowrap;
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
					margin-right: 8px;
					overflow: hidden;
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
	position: fixed;
	width: 100%;
	height: 100vh;
	left: 0;
	top: 0;
	.mint-indexlist{
		.mint-indexlist-nav{
			z-index: 2;
			max-height: 100vh;
			border: 0;
		}
		.mint-indexlist-content{
			padding-top: 110px;
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
