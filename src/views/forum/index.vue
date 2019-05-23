<template>
<div class="forum-index">
    <div class='search'>
	    <search placeholder="搜索话题" :readonly="true" @click="$router.push('/forum-query')"></search>
    </div>
	<ul class="button">
		<router-link tag="li" to="/forum-board?name=全部圈子">
			<img src="/img/forum/icon-all-board.png"/><p>全部圈子</p></router-link>
		<router-link tag="li"
		             :to="`/forum-board?id=${item.id}&name=${item.content}`"
		             v-for="(item, index) in boardList" :key="index">
			<img :src="item.icon"/><p>{{item.content}}</p>
		</router-link>
	</ul>

	<topics-list :top="130" :latestShow="false"></topics-list>
	<topic-add></topic-add>
</div>
</template>

<script>
import TopicsList from './part/TopicsList.vue'
import TopicAdd from './part/TopicAdd.vue'
import Search from '@/components/common-search.vue'
export default {
	name: "forum-index",
	components: {TopicsList, TopicAdd, Search},
	data(){
		return{
			search:'',
			boardList: [],
		}
	},
	mounted(){
		console.log('TopicsList', TopicsList)
		this.getCarTalk();
	},
	methods:{
		getCarTalk(){
			this.axiosHxx.post('/cartalk/plate/selectTopicPlate', {},{baseURL: '/hxx-gateway-proxy'}).then( (res) => {
				if(res.data.success){
					this.boardList= res.data.data
				}
			})
		},
		close(){

		}
	}
}
</script>
<style scoped lang='less'>
.forum-index {
	background-color: #fff;
	height: 100%;
	overflow: hidden;
	width: 100%;
	box-sizing: border-box;
	.search {
	  padding: 5px 15px;
	}
	.button{
		padding:7px 0 0 7px;
		overflow: auto;
		white-space:nowrap;
		li{
			padding: 0 8px;
			display: inline-block;
			text-align: center;
			overflow: hidden;
			margin-bottom: 14px;
			img{
				width: 40px;
				height: 40px;
				object-fit: cover;
				border-radius: 100%;
				overflow: hidden;
			}
			p{
				color: #333333;
				padding-top: 6px;
				font-size: 12px;
				line-height: 17px;
			}
		}
	}
}
</style>
