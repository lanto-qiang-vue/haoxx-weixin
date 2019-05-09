<template>
<a :class="{[onclass]: activity}" @click="click"><slot></slot></a>
</template>

<script>
import schema from 'async-validator'
export default {
	name: "submit-button",
	props:{
		rules:{
			default(){
				return {}
			}
		},
		datas:{
			default(){
				return {}
			}
		},
		onclass:{
			default: 'on'
		},
		feedback:{
			default: false
		},
	},
	data(){
		return{
			activity: false
		}
	},
	watch:{
		datas:{
			deep: true,
			handler(newData){
				this.validator()
			}
		}
	},
	mounted(){
		this.validator()
	},
	methods:{
		click(){
			this.validator(true, ()=>{
				this.$emit('click', this.datas);
			})
		},
		validator(alarm, callback){
			let validator = new schema(this.rules)
			validator.validate(this.datas, (err, res)=> {
				// console.log('(err, )', err)
				// console.log('(, res)', res)
				if(err && err.length && alarm && this.feedback){
					this.$toast(err[0].message);
				}
				this.activity= false
			}).then(() => {
				this.activity= true
				if(callback) callback()
			}).catch(({ errors, fields }) => {

			})
		}
	}
}
</script>

<style scoped lang="less">

</style>
