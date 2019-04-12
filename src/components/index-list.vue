<template>
<div class="vehicle-model">

	<mt-index-list>
		<mt-index-section v-for="(item, key) in indexList" :index="key" :key="key">
			<mt-cell v-for="(item2, key2) in item.arr" :key="key2" :title="item2.text"></mt-cell>
		</mt-index-section>
	</mt-index-list>
</div>
</template>

<script>
import pinying from '~/public/lib/pinying.js'
import { IndexList, IndexSection } from 'mint-ui';
export default {
	name: "vehicle-model",
	data(){
		return{
			indexList:[],

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
			return []
		}
	},
	created(){
		this.getList()
	},
	mounted(){
	},
	methods:{
		getList(){
			let tree= localStorage.getItem('vehiclemodel-tree')||''
			let index= localStorage.getItem('vehiclemodel-index')
			this.axiosHxx.post('/tenant/basedata/vehiclemodel/tree', {node: 0}).then(res => {
				if(res.data.success){
					let data= res.data.data
					if(tree  == JSON.stringify(data)){
						this.indexList= index? JSON.parse(index): []
					}else{
						this.indexList= this.getIndexList(this.getTree(data))
						localStorage.setItem('vehiclemodel-index', JSON.stringify(this.indexList))
						localStorage.setItem('vehiclemodel-tree', JSON.stringify(data))
					}
				}
				console.log('this.indexList', this.indexList)
			})
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
				resObj[index]={
					arr: []
				}
				for (let j in arr){
					if(arr[j].parentId== 0){
						let letter= arr[j].text[0].toUpperCase();
						let letterNum= letter.charCodeAt()
						if(letterNum>=65 && letterNum<=90){
							if(letterNum== i){
								resObj[index].arr.push(arr[j])
							}
						}else{
							let pyArr= pinying(letter)
							for(let k in pyArr){
								if(index== pyArr[k]){
									resObj[index].arr.push(arr[j])
								}
							}
						}
					}
				}
			}
			return resObj
		}
	},
}
</script>

<style scoped lang="less">
.vehicle-model{

}
</style>
