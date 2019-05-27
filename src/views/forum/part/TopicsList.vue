<template>
<div class="topics-list" :style="top? {height: '100%', overflow: 'hidden'}: {}">
	<div class="title" v-show="!isIndex">
		<span :class="{active: active=='hottest'}" @click="active='hottest'" v-if="hottestShow">热聊话题</span>
		<span :class="{active: active=='latest'}" @click="active='latest'" v-if="latestShow">最新话题</span>
	</div>
	<div class="body" :style="isIndex? {paddingTop: 0, position: 'relative'}: (top?{'top': `-${top}px`, paddingTop: `${top+40}px`, overflow: 'auto',height: '100%'}:{})">
	<mt-tab-container v-model="active" :swipeable="false">
		<mt-tab-container-item id="hottest" v-if="hottestShow">
			<ul class="list"
			    v-infinite-scroll="loadMoreHottest"
			    infinite-scroll-disabled="hottestAllLoaded"
			    infinite-scroll-distance="30">
				<topics-item v-for="(item, key) in hottest.list" :key="key" :item="item" type="hottest"></topics-item>
			</ul>
		</mt-tab-container-item>
		<mt-tab-container-item id="latest" v-if="latestShow">
			<ul class="list"
			    v-infinite-scroll="loadMoreLatest"
			    infinite-scroll-disabled="latestAllLoaded"
			    infinite-scroll-distance="30">
				<topics-item v-for="(item, key) in latest.list" :key="key" :item="item" type="latest"></topics-item>
			</ul>
		</mt-tab-container-item>
	</mt-tab-container>
	</div>
</div>
</template>

<script>
import TopicsItem from './TopicsItem.vue'
export default {
	name: "topics-list",
	components: {TopicsItem },
	props: {
		id: {
			default: ''
		},
		top: {
			default: 0
		},
		limit: {
			default: 10
		},
		hottestShow: {
			default: true
		},
		latestShow: {
			default: true
		},
		isIndex: {
			default: false
		},
	},
	data(){
		return{
			active:'hottest',
			hottest:{
				list: [],
				page: 0,
				total: 0,
				// allLoaded: false
			},
			latest:{
				list: [],
				page: 0,
				total: 0,
				// allLoaded: false
			},
			hottestAllLoaded: false,
			latestAllLoaded: false,
		}
	},
	mounted(){
		if(!this.hottestShow) this.active= 'latest'
	},
	methods:{
		loadMoreHottest(){
			this.hottest.page++
			this.getList('hottest', true)
		},
		loadMoreLatest(){
			this.latest.page++
			this.getList('latest', true)
		},
		getList(listType, flag){
			let url= '', thisList= this[listType]
			switch (listType){
				case 'hottest':{
					url= '/cartalk/plate/selectTopicContentByHot'
					break
				}
				case 'latest':{
					url= '/cartalk/plate/selectTopicContentByTime'
					break
				}
			}
			this.axiosHxx.post(url, {
				page: thisList.page,
				bbsTopicId: this.id,
				limit: this.limit,
			},{baseURL: '/hxx-gateway-proxy', noIndicator: true}).then( (res) => {
				if(res.data.success){
					let datas= res.data.data
					if(!flag) thisList.list=[]
					thisList.total= res.data.total
					if(datas && datas.length){
						thisList.list= thisList.list.concat(datas)
						if(thisList.list.length>=res.data.total || this.isIndex){
							this[listType+ 'AllLoaded']= true
						}else{
							this[listType+ 'AllLoaded']= false
						}
					}else{
						this[listType+ 'AllLoaded']= true
					}
				}
			})
		}
	}
}
</script>

<style scoped lang="less">
.topics-list{
	position: relative;
	.title {
		margin-bottom: 5px;
		padding: 10px 0 0 15px;
		width: 100%;
		line-height: 20px;
		color: #666;
		font-size:14px;
		font-weight:500;
		overflow: hidden;
		border-top: 10px #F3F3F3 solid;
		position: relative;
		z-index: 1;
		background-color: white;
		span{
			margin-right: 20px;
			transition: color .3s;
			&.active{
				color: #FF6D0E;
			}
		}
		.more{
			color: #333333;
			font-size: 12px;
			font-weight: 500;
			float: right;
			margin-right: 10px;
		}
	}
	.body{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: auto;
		overflow: hidden;
		padding-top: 40px;
		.list{
			padding-left:15px;
		}
	}
}
</style>
