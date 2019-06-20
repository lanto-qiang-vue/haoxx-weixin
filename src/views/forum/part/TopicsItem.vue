<template>
<li class="topics-item">
	<div class="head">
		<img src="/img/head.png"/>
		<span>{{item.nickname}}</span>
	</div>
	<p :class="{title: true, top: showTop(item)}" @click="topic(item.id)">{{item.title}}</p>
	<div class="img-group" v-if="item.path">
		<img v-for="(img, key) in item.path.split(',')" :src="img" :key="key" v-img="{group: `img-${type}-${item.id}`}"/>
	</div>
	<div class="foot">
		<span class="center" :style="{ color: item.colour}">{{item.topicContent}}</span>
		<span>{{item.createDate | TimeAgo}}</span>
		<span class="left">{{item.number}}个评论</span>
		<span class="right" @click="topic(item.id)">去参与</span>
	</div>
</li>
</template>

<script>
export default {
	name: "topics-item",
	props: ['item', 'type', 'isHome'],
	methods:{
		topic(id){
			this.$router.push(`/topic?id=${id}`)
		},
		showTop(item){
			return this.isHome? item.hometop: item.top
		}
	}
}
</script>

<style scoped lang="less">
.topics-item{
	border-bottom: 1px solid #D9D9D9;
	padding: 10px 0;
	font-size: 14px;
	.head{
		padding-bottom: 10px;
		/*line-height:18px;*/
		img{
			width:18px;
			height:18px;
			border-radius: 100%;
			overflow: hidden;
			vertical-align: middle;
		}
		span{
			padding-left: 5px;
			font-size:12px;
			color: #666666;
			/*line-height:17px;*/
		}
	}
	.title{
		color:#333333;
		line-height: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom:5px;
		font-weight: 600;
		position: relative;
		&.top{
			color: #438EFF;
			padding-left: 20px;
			&:before{
				content: '顶';
				color: white;
				background-color: #438EFF;
				padding: 2px;
				border-radius: 2px;
				font-size: 12px;
				line-height: 12px;
				position: absolute;
				left: 0;
				top: 2px;
				font-weight: 400;
			}
		}
	}
	.img-group{
		overflow: auto;
		padding: 5px 0;
		white-space:nowrap;
		img{
			width:60px;
			height:60px;
			border-radius:3px;
			margin-right:5px;
			display:inline-block;
			object-fit: cover;
		}
	}
	.foot{
		position: relative;
		margin-top: 5px;
		height: 20px;
		line-height: 20px;
		span{
			font-size:12px;
			color:#999999;
		}
		.center{
			/*line-height: 17px;*/
			/*color: #FE8636;*/
			color: #666666;
			padding-right: 10px;
		}
		.left{
			height: 20px;
			line-height: 20px;
			position: absolute;
			top: 0;
			right: 80px;
			color: #666;

		}
		.right{
			width:60px;
			height:20px;
			background: #F2F2F2;
			border-radius:10px;
			display: inline-block;
			position: absolute;
			right: 15px;
			top: 0;
			text-align: center;
			line-height: 20px;
			color: #FF6D0E;
		}
	}
}
</style>
