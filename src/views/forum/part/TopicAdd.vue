<template>
	<router-link tag="div" :to="{path: '/forum-post', query:{ id}}" class="topic-add"></router-link>
</template>

<script>
export default {
	name: "topic-add",
	props: ['id']
}
</script>

<style scoped lang="less">
.topic-add{
	width:48px;
	height:48px;
	background: #FF6D0E;
	position: fixed;
	bottom:69px;
	right: 10px;
	border-radius: 48px;
	&:before{
		 content: '';
		 display: block;
		 width: 24px;
		 border: 1px #fff solid;
		 position:absolute;
		 top: 50%;
		 left: 50%;
		 transform: translate(-50%, -50%);
	}
	&:after{
		 content: '';
		 display: block;
		 height: 24px;
		 border: 1px #fff solid;
		 position:absolute;
		 top: 50%;
		 left: 50%;
		 transform: translate(-50%, -50%);
	}
}
</style>
