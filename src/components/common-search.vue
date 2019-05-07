<template>
<form action="javascript:;" class="common-search">
	<i class="fa fa-search icon"></i>
	<input type="search" ref="input" v-model="search" placeholder="城市名/拼音"/>
	<i class="fa fa-times-circle close" v-show="search" @click="close"></i>
</form>
</template>

<script>
export default {
	name: "common-search",
	data(){
		return{
			search: ''
		}
	},
	methods:{
		close(){

		}
	}
}
</script>

<style scoped lang="less">

</style>
