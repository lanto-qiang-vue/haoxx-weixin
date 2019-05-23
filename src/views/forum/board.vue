<template>
<div class="boardList">
    <div class='search'>
	    <search placeholder="搜索话题" :readonly="true"
	            @click="$router.push({path: '/forum-query', query: {id: $route.query.id}})"></search>
	</div>
	<topics-list :top="40" :id="$route.query.id"></topics-list>
	<topic-add :id="$route.query.id"></topic-add>
</div>
</template>

<script>
import TopicsList from './part/TopicsList.vue'
import TopicAdd from './part/TopicAdd.vue'
import Search from '@/components/common-search.vue'
export default {
	name: "board",
	components: {TopicsList, TopicAdd, Search},
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
/*@import './forum.less';*/
.boardList {
	background-color: #fff;
	height: 100vh;
	overflow: hidden;
	width: 100%;
	box-sizing: border-box;
	.search {
		width: 100%;
		background: white;
		padding: 5px 15px;
	}
}
</style>
