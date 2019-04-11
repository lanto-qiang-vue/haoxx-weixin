<template>
<div @click="toClick" class="up-img-block">
	<upload @done="changeAvatar" ref="upload" :operate="operate" :accept="accept"></upload>
</div>
</template>

<script>
import Upload from '@/components/compress-upload.vue'
export default {
	name: "up-img-block",
	props: {
		'operate': {
			type: String,
			default: 'upLoad'
		},
		'accept': {
			type: String,
			default: 'image/jpg,image/png,image/bmp'
		}
	},
	components: {Upload},
	methods: {
		toClick(){
			this.$refs.upload.clickBox()
		},
		changeAvatar(res){
			this.$emit('done', res);
		}
	}
}
</script>

<style scoped>

</style>
