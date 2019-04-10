<template>
<div class="reservation-detail">
	<Form :class="['common-form']" :model="form"
	      :label-width="100" label-position="left" ref="form">
		<FormItem label="所有人" prop="ownerName">
			<Input v-model.trim="form.name"></Input>
		</FormItem>
		<FormItem label="所有人" prop="ownerName">
			<Input v-model.trim="form.name"></Input>
		</FormItem>
		<FormItem label="所有人" prop="ownerName">
			<span class="ivu-input select">所有人</span>
		</FormItem>
	</Form>
</div>
</template>

<script>
export default {
	name: "reservation-detail",
	data(){
		return{
			form: {
				name: ''
			}
		}
	}
}
</script>

<style scoped lang="less">

</style>
