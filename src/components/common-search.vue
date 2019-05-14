<template>
<form action="javascript:;" class="common-search">
	<i class="fa fa-search icon"></i>
	<input type="search" ref="input" v-model="search" :placeholder="placeholder"  @keydown="key"
	:disabled="disabled" :readonly="readonly" @click="$emit('click')"/>
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
	},
	data(){
		return{
			val: ''
		}
	},
	computed:{
		search: {
			get(){
				return this.value || this.val
			},
			set(val){
				this.val= val
				this.$emit('input', val);
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
				this.$emit('enter', this.search);
			}
		},
		clear(){
			this.search= ''
			this.$emit('clear');
		}
	}
}
</script>

<style scoped lang="less">

</style>
