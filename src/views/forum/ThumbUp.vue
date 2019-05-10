<template>
	<span class="thumb-up"><i class="fa fa-thumbs-o-up"></i>{{item.praise}}</span>
</template>

<script>
export default {
	name: "thumb-up",
	
}
</script>

<style scoped lang="less">
.thumb-up{
	margin-right: 3px;
	i{
		font-size: 14px;
		margin-right: 2px;
	}
}
</style>
