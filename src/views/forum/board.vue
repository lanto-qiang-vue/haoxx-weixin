<template>
<div class="boardList">
    <div class='search'>
		<form action="javascript:;" class="common-search ">
			<i class="fa fa-search icon"></i>
			<input type="search" ref="input" v-model="search" placeholder="搜索话题"/>
			<i class="fa fa-times-circle close" v-show="search" @click="close"></i>
		</form>
	</div>

	<topics-list :top="40" :id="$route.query.id"></topics-list>

	<topic-add :id="$route.query.id"></topic-add>
</div>
</template>

<script>
import TopicsList from './TopicsList.vue'
import TopicAdd from './TopicAdd.vue'
export default {
	name: "board",
	components: {TopicsList, TopicAdd},
	data(){
		return{
			search:'',
		}
	},
	mounted(){

	},
	methods:{
		close(){

		}
	}
}
</script>

<style scoped lang='less'>
@import './forum.less';
.boardList {
	background-color: #fff;
	height: 100vh;
	overflow: auto;
	width: 100%;
	box-sizing: border-box;
	.search {
		width: 100%;
		background: white;
		padding: 5px 15px;
	}
}
</style>
