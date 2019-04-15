<template>
<div class="common-fold">
	<label @click="showSlot= !showSlot">{{label}}</label>
	<div class="fold-item" v-show="showSlot">
		<slot></slot>
	</div>
</div>
</template>

<script>
export default {
	name: "common-fold",

	props:{
		label:{
			default: ''
		},
		show:{
			default: true
		},
	},
	data(){
		return{
			showSlot: true
		}
	},
	beforeMount(){
		this.showSlot= this.show
	}
}
</script>

<style scoped lang="less">
.common-fold{
	label{
		display: block;
		height: 40px;
		line-height: 40px;
		margin-bottom: 5px;
		padding: 0 10px;
		background-color: #f9f9f9;
		color: #333333;
		font-size: 14px;
	}
}
</style>
