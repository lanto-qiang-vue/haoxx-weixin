<template>
<span class="select-radio">
	<label @click="click">{{label}}</label>
	<mt-popup v-model="showRadio"
	          position="bottom"
	          style="width: 100%"
	          pop-transition="popup-fade" >
		<div class="popupBlock">
			<mt-radio
					@click.native=""
					align="right"
					v-model="val"

					:options="options">
			</mt-radio>
		</div>
	</mt-popup>
</span>
</template>

<script>
export default {
	name: "select-radio",
	props:{
		options:{
			default(){
				return []
			}
		},
		value:{
			default: ''
		},
		setclass:{
			default: ''
		}
	},
	data(){
		return{
			showRadio: false
		}
	},
	computed:{
		label(){
			let label= ''
			if(this.value && this.options.length){
				for(let i in this.options){
					if(this.options[i].value== this.value){
						label= this.options[i].label
						break
					}
				}
			}
			return label
		},
		val:{
			get () {
				return this.value
			},
			set (newValue) {
				this.$emit('input', newValue)
			}
		}
	},
	watch:{
		val(){
			this.showRadio= false
		}
	},
	methods:{
		click(){
			console.log('click')
			if(!this.showRadio) this.showRadio= true
		}
	}
}
</script>

<style scoped lang="less">
.select-radio{
	display: inline-block;
	width: 100%;
	height: 100%;
	label{
		display: inline-block;
		width: 100%;
		min-height: 20px;
		line-height: 20px;
		vertical-align: top;
	}
}
</style>
