<template>
<form action="javascript:;" class="common-search">
	<i class="fa fa-search icon"></i>
	<input type="search" ref="input" v-model="search" :placeholder="placeholder"
	:disabled="disabled" :readonly="readonly"
	       @click="$emit('click')" @keydown="key"
	       @focus="$emit('focus')" @blur="$emit('blur')"/>
	<i class="fa fa-times-circle close" v-show="search" @click="clear"></i>
</form>
</template>

<script>
export default {
	name: "common-search",
	props: {
		value: {
			default: ''
		},
		placeholder: {
			default: ''
		},
		disabled: {
			default: false
		},
		readonly: {
			default: false
		},
		feedback:{
			default: false
		},
		timing:{
			default: false
		},
	},
	data(){
		return{
			val: '',
			timer: null
		}
	},
	computed:{
		search: {
			get(){
				return this.val
			},
			set(val){
				this.val= val
				this.$emit('input', val);
			}
		}
	},
	watch:{
		search(val){
			if(this.timing){
				clearTimeout(this.timer)
				this.timer= setTimeout(()=>{
					this.$emit('change', val);
				},300)
			}else{
				this.$emit('change', val);
			}

		}
	},
	mounted(){

	},
	methods:{
		focus(){
			this.$refs.input.focus()
		},
		key(e){
			if (e.keyCode == 13 ) {
				this.enter()
			}
		},
		enter(){
			this.$emit('enter', this.search);
		},
		clear(){
			this.search= ''
			// this.$emit('input', '');
			this.$emit('clear');
		}
	}
}
</script>

<style scoped lang="less">

</style>
