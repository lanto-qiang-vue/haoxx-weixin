<template>
<div class="forum-post">
	<Form :class="['common-form']" :model="form"
	      :label-width="80" label-position="left" ref="form">
		<FormItem label="发布圈子类别">
			<select-radio class="ivu-input select" v-model="form.topicId" :options="typeList"></select-radio>
		</FormItem>
	</Form>
</div>
</template>

<script>
import SelectRadio from '@/components/select-radio.vue'
export default {
	name: "forum-post",
	components: {SelectRadio },
	data(){
		return{
			form:{
				topicId: '',
				title: '',
				content: '',
				picFilePaths: []
			},
			typeList: []
		}
	},
	mounted(){

	},
	methods:{

	}
}
</script>

<style scoped lang="less">

</style>
