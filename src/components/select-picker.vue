<template>
<div class="select-picker">
	<mt-popup v-model="show"
	          position="bottom"
	          style="width: 100%"
	          pop-transition="popup-fade" >
		<ul class="operate">
			<li @click="cancel">取消</li>
			<li @click="ok">确定</li>
		</ul>
		<mt-picker :slots="slots" @change="change" ref="picker" :valueKey="valueKey"></mt-picker>
	</mt-popup>
</div>
</template>

<script>
export default {
	name: "select-picker",
	props:{
		valueKey:{
			default: ''
		},
		slots: {
			default(){
				return []
			}
		},
	},
	data(){
		return {
			show: false,
			value: null,
			timer: null,
		}
	},
	mounted(){

	},
	methods:{
		open(val){
			this.show= true
			if(val){
				this.value= val
				this.$refs.picker.setValues(val)
			}else{
				// console.log(this.$refs.picker.getValues())
				// let arr= this.$refs.picker.getValues()
				// for(let i in arr){
				// 	arr[i]= null
				// }
				// this.value= null
				// this.$refs.picker.setValues(arr)
			}
		},
		change(inst, valArr){
			// console.log( valArr)
			// console.log(valArr[0].id, valArr[1].id)
			// inst.setSlotValue(0, '2015-03')
			// inst.setValues(["2015-03", "2015-05"])
			// console.log('getSlotValues(index)',inst.getSlotValues(1))
			if(this.timer){
				clearTimeout(this.timer)
				this.timer= null
			}
			this.timer= setTimeout(()=>{
				this.value= valArr
				this.$emit('change', inst, valArr)
			}, 500)
		},
		setSlotValues(index, values){
			this.$refs.picker.setSlotValues(index, values)
		},
		cancel(){
			this.value= null
			this.show= false
		},
		ok(){
			this.$emit('ok', this.value)
			this.value= null
			this.show= false
		},
	}
}
</script>

<style scoped lang="less">
.select-picker{
	.operate{
		border-bottom: 1px solid #DCDEE3;
		li{
			display: inline-block;
			width: 50%;
			line-height: 40px;
			text-align: center;
			color: #333333;
			font-size: 14px;
			&:last-child{
				border-left: 1px solid #DCDEE3;
				color: #FF9738;
			}
		}
	}
}
</style>
