<template>
<div class="vehicle-model" v-show="blocknum>0">
	<mt-index-list>
		<div class="query">
			<div class="search"><i class="fa fa-search icon"></i>
				<form action="javascript:return true">
					<input type="search" ref="input" v-model="search" @keydown="key($event)" placeholder="车辆品牌"/>
				</form>
				<i class="fa fa-times-circle close" v-show="search" @click="close" ></i>
			</div>
		</div>
		<mt-index-section v-for="(item, key) in showList" :index="key" :key="key">
			<mt-cell v-for="(item2, key2) in item" :key="key2" :title="item2.text"></mt-cell>
		</mt-index-section>
	</mt-index-list>

</div>
</template>

<script>
import pinying from '~/public/lib/pinying.js'
import { deepClone } from '@/util.js'
import { IndexList, IndexSection } from 'mint-ui';
export default {
	name: "vehicle-model",
	data(){
		return{
			indexList:{},
			search: '',
			blocknum: 0
		}
	},
	computed:{
		index(){
			let arr=[]
			for(let i =65; i<91; i++){
				arr.push(String.fromCharCode(i))
			}
			return arr
		},
		showList(){
			let obj= {}, search= this.search.trim()
			if(search){
				for(let key in this.indexList){
					let match= false, arr=[]
					for(let i in this.indexList[key]){
						if(this.indexList[key][i].text.toUpperCase().indexOf(search.toUpperCase())>=0){
							// obj[key]=  this.indexList[key]
							match= true
							arr.push(this.indexList[key][i])
						}
					}
					if(match) obj[key]= arr
				}
				return obj
			}else return this.indexList
		},
		blockId(){
			return this.$route.query.vehiclemodelblock
		}
	},
	watch:{
		'$route'(to){
			console.log("'$route'(to)",to)
			this.blocknum= parseInt(to.query.vehiclemodelblock || 0)
		},
		blockId(val){
			console.log('blockId(val)', val)
		}
	},
	created(){
		this.getList()
		this.initBlock()
	},
	mounted(){

	},
	methods:{
		open(){
			this.$router.push({path: this.$route.path, query: this.getBlockHash(1)})
			console.log('open', this.$route.query.vehiclemodelblock)
		},
		getBlockHash(num){
			let query= this.$route.query
			query.vehiclemodelblock= num
			// console.log('this.getHash(query)', this.getHash(query))
			// return this.getHash(query)
			return query
		},
		initBlock(){
			let query= this.$route.query, path= window.location.hash.split('?')[0]
			delete query.vehiclemodelblock
			// if(Object.keys(query).length){
			history.replaceState(null, null, window.location.origin + path+ this.getHash(query))
			// }
		},
		getHash(query){
			let hash=''
			for(let key in query){
				if(hash) hash+= '&'
				hash+= (key+'='+ query[key])
			}
			if(hash) hash= '?'+hash
			return hash
		},
		getList(){
			let list= this.$store.state.app.vehiclemodelIndex
			if(list){
				this.indexList= deepClone(list)
			}else{
				this.axiosHxx.post('/tenant/basedata/vehiclemodel/tree', {node: 0}).then(res => {
					if(res.data.success){
						let data= res.data.data
						this.indexList= this.getIndexList(this.getTree(data))
						this.$store.commit('setVehiclemodelIndex', deepClone(this.indexList));
						console.log('this.indexList', this.indexList)
					}
				})
			}
		},
		getTree(arr, parentId= 0){
			let list= []
			for(let i in arr){
				if(arr[i].parentId== parentId){
					let obj={
						children: this.getTree(arr, arr[i].id),
						...arr[i]
					}
					list.push(obj)
				}
			}
			return list
		},
		getIndexList(arr){
			let resObj= {}
			for(let i =65; i<91; i++){
				let index= String.fromCharCode(i)
				resObj[index]=[]
				for (let j in arr){
					if(arr[j].parentId== 0){
						let letter= arr[j].text[0].toUpperCase();
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
			}
			return resObj
		},
		key(e) {
			if ( e.keyCode == 13 || e=='search') {

			}
		},
		close(){
			this.search='';
			// this.$refs.input.focus()

		},
	},
}
</script>

<style scoped lang="less">
.vehicle-model{
	.query{
		height: 50px;width:100%; position: absolute;left: 0;top: 0;padding-right: 24px;
		z-index: 1;
		background-color: white;
		.search{
			display: inline-block;
			vertical-align: middle;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 90%;
			padding-right: 24px;
			input{
				width: 100%;
				height: 30px;
				line-height: 28px;
				background-color: #EEEEEE;
				border: 1px solid #DBDBDB;
				border-radius: 15px;
				padding: 0 10px 0 30px;
				margin: 0;
				text-align: left;
				font-size: 14px;
			}
			.icon{
				position: absolute;
				font-size: 14px;
				color: #999999;
				left: 10px;
				top: 50%;
				transform: translateY(-50%);
			}
			.close{
				position: absolute;
				font-size: 18px;
				color: #999999;
				right: 32px;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	.mint-indexlist{
		padding-top: 50px;
	}

}
</style>
<style lang="less">
.vehicle-model{
	position: fixed;
	width: 100%;
	height: 100vh;
	left: 0;
	top: 0;
	.mint-indexlist-nav{
		z-index: 2;
	}
}
</style>
