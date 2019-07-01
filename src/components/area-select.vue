<template>
<select-picker :slots="slots" valueKey="name" @change="change" ref="picker" @ok="ok"></select-picker>
</template>

<script>
import SelectPicker from '@/components/select-picker.vue'
import { cityIsSupport} from '@/util'
export default {
	name: "area-select",
	components: { SelectPicker},
	data(){
		return{
			area1: [{}],
			area2: [{}],
			nowarea1: {},
			nowarea2: {},
		}
	},
	computed:{
		slots(){
			return [
				{
					flex: 1,
					values: this.area1,
					className: 'slot1',
					textAlign: 'center'
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					flex: 1,
					values: this.area2,
					className: 'slot3',
					textAlign: 'center'
				}
			]
		}
	},
	mounted(){
		let thisCity= cityIsSupport(true)
		if(thisCity){
			this.getArea(thisCity.adcode, (data)=>{
				this.$refs.picker.setSlotValues(0,
					data.items.length>1? [{id: thisCity.adcode, name: "全部", all: true}].concat(data.items): data.items)
			})
		}
	},
	methods:{
		getArea(code, callback){
			this.axiosQixiu.post('/hxxdc/city/list', {
				parentCode: code
			},{hxxtoken: true}).then( (res) => {
				if(res.data.code=='0' && callback){
					callback(res.data)
				}
			})
		},
		change(inst, valArr){
			// console.log(valArr[0].id,valArr[1].id)
			let same= parseInt(this.nowarea1.id) == parseInt(valArr[0].id)
			if(valArr[0].all){
				this.$refs.picker.setSlotValues(1, [{id: false, name: "全部", all: true}])
			}else if(!same && valArr[0].id){
				this.getArea( valArr[0].id, (data)=>{
					this.$refs.picker.setSlotValues(1, [{id: false, name: "全部", all: true}].concat(data.items))
				})
			}
			this.nowarea1= valArr[0]
			this.nowarea2= valArr[1]
		},
		open(){
			this.$refs.picker.open()
		},
		ok(){
			this.$emit('ok', this.nowarea1, this.nowarea2)
		},
	}
}
</script>

<style scoped lang="less">
.area-select{

}
</style>
