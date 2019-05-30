<template>
<div class="queryList">
    <div class='search'>
		<search placeholder="搜索话题" @enter="enter" v-model="search" ref="search"></search>
    </div>
	<div class="content">
		<div class="title">{{hasQuery? '搜索结果': '热聊话题'}}</div>
		<ul class="list" v-show="!hasQuery">
			<li v-for="item in hottest" @click="goTopic(item)">{{item.title}}</li>
		</ul>
		<ul class="list" v-show="hasQuery">
			<li v-for="item in queryList" @click="goTopic(item)">{{item.title}}</li>
		</ul>
		<div class="title">
			搜索记录<div class="clear" @click="del(false)">清空</div>
		</div>
		<ul class="list">
			<li v-for="(item, key) in historyList" :key="key" @click.stop="query(item)">{{item}}
				<i class="fa fa-times" @click.stop="del(key)"></i></li>
		</ul>
	</div>
</div>
</template>

<script>
import Search from '@/components/common-search.vue'
export default {
	name: "query",
	components: { Search},
	data(){
		return{
			search:'',
			hottest:[],
			queryList: [],
			historyList: [],
		}
	},
	computed:{
		hasQuery(){
			return !!this.queryList.length
		}
	},
	mounted(){
		this.getHotTopic(5);
		this.$refs.search.focus()
		this.historyList= this.getHistory()
	},
	methods:{
		getHotTopic(limit, query){
			this.axiosHxx.post('/cartalk/plate/selectTopicContentByHot', {
				bbsTopicId: this.$route.query.id ||'',
				page: 1,
				limit: limit,
				keyWord: query ||''
			},{baseURL: '/hxx-gateway-proxy', noIndicator: query? false: true}).then( (res) => {
				if( res.data.success){
					if(query){
						this.queryList=res.data.data;
						if(res.data.data.length){
							this.setHistory(query)
						}else{
							this.$toast('未搜到相关话题')
						}
					}else{
						this.hottest=res.data.data;
					}
				}
			})
		},
		enter(val){
			if(val){
				this.getHotTopic(10, val);
			}else{
				this.queryList= []
			}
		},
		setHistory(val){
			let list= this.getHistory() , have= false, length= 0
			for( let i in list){
				if(list[i]== val) have= true
			}
			if(!have){
				length= list.unshift(val)
				if(length>5) list.pop()
			}
			this.historyList= list
			localStorage.setItem('forumQueryHistory', JSON.stringify(list))
		},
		getHistory(){
			let storage= localStorage.getItem('forumQueryHistory')
			let list= storage? JSON.parse(storage): []
			return list
		},
		del(index){
			// console.log('index', index)
			if(index != false){
				let list= this.getHistory()
				if(list.length){
					list.splice(index, 1)
					this.historyList= list
					localStorage.setItem('forumQueryHistory', JSON.stringify(list))
				}
			}else{
				this.historyList= []
				localStorage.removeItem('forumQueryHistory')
			}
		},
		query(val){
			// console.log('query(val)', val)
			this.search= val
			this.enter(val)
		},
		goTopic(item){
			this.$router.push('/topic?id='+ item.id)
		}
	}
}
</script>
<style lang='less'>
</style>
<style scoped lang='less'>
.queryList {
	background-color: #fff;
	height: 100vh;
	overflow: auto;
	width: 100%;
	box-sizing: border-box;
	.search {
		width: 100%;
		background: #fff;
		position: fixed;
		z-index:20;
		top: 0;
		left: 0;
		box-sizing: border-box;
		padding: 5px 15px;
		border-bottom: 10px #F3F3F3 solid;
	}
	.content{
		background: #fff;
		box-sizing: border-box;
		padding: 50px 0 0 15px;
		.title {
			margin-top: 10px;
			box-sizing: border-box;
			width: 100%;
			line-height: 20px;
			color: #333;
			font-size:14px;
			font-weight:500;
			position: relative;
			.clear{
				width:40px;
				background:rgba(242,242,242,1);
				border-radius:11px;
				font-size:12px;
				font-weight:400;
				color:rgba(102,102,102,1);
				line-height: 22px;
				text-align: center;
				position: absolute;
				right: 10px;
				top: 0;
			}
		}
		.list {
			margin-bottom: 10px;
			min-height: 45px;
			li {
				box-sizing: border-box;
				border-bottom: 1px solid #D9D9D9;
				height: 44px;
				line-height: 44px;
				font-size: 14px;
				width: 100%;
				color:#666666;
				position: relative;
				white-space: nowrap;
				padding-right: 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				i{
					position: absolute;
					right: 15px;
					top: 14px;
				}
			}
		}
	}
}
</style>
