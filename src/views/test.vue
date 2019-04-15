<template>
<div class="test">
	<index-list ref="vehicle"></index-list>
	<div  @click="click">点击</div>
</div>
</template>

<script>
import IndexList from '@/components/vehicle-model.vue'
export default {
	components: {IndexList},
	name: "test",
	mounted(){

	},
	methods:{
		click(){
			this.$refs.vehicle.open()
			// this.$router.push('/test?vehiclemodelblock=1')
			// console.log('this.$route', this.$route)
		}
	}
}
</script>

<style scoped lang="less">

</style>
