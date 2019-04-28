<template>
<div class="city-select">
	<mt-index-list>
		<div class="query">
			<div class="search"><i class="fa fa-search icon"></i>
				<form action="javascript:;">
					<input type="search" ref="input" v-model="search" placeholder="城市名/拼音"/>
				</form>
				<i class="fa fa-times-circle close" v-show="search" @click="close"></i>
			</div>
		</div>
		<div class="tag">
			<p>定位/最近访问</p>
			<ul>
				<li><i class="fa fa-map-marker"></i>上海</li>
				<li>北京</li>
				<li>济南</li>
			</ul>
		</div>
		<mt-index-section v-for="(item, key) in area" :index="key" :key="key">
			<mt-cell v-for="(item2, key2) in item" :key="key2" :title="item2.text"
			         @click.native="clickItem(2, item2)"></mt-cell>
		</mt-index-section>
	</mt-index-list>
</div>
</template>

<script>
export default {
	name: "city-select",
	data(){
		return {
			search: '',
			area: {
				'a': [
					{text: '上海', code: '310100'},
					{text: '上海2', code: '310300'},
				],
				'b': [
					{text: '北京', code: '110000'},
					{text: '北京2', code: '110000'},
				],
				'j': [
					{text: '济南', code: '370100'}
				]
			}
		}
	},
	methods:{
		close(){},
		clickItem(){},
	}
}
</script>

<style scoped lang="less">
.city-select{
	/*padding-left: 10px;*/
	width: 100%;
	height: 100vh;
	overflow: auto;
	.query{
		height: 50px;width:100%; position: absolute;left: 0;top: 0;padding-right: 24px;
		z-index: 1;
		background-color: white;
		.search{
			display: inline-block;
			vertical-align: middle;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 90%;
			padding-right: 24px;
			input{
				width: 100%;
				height: 30px;
				line-height: 28px;
				background-color: #EEEEEE;
				border: 1px solid #DBDBDB;
				border-radius: 15px;
				padding: 0 10px 0 30px;
				margin: 0;
				text-align: left;
				font-size: 14px;
			}
			.icon{
				position: absolute;
				font-size: 14px;
				color: #999999;
				left: 10px;
				top: 50%;
				transform: translateY(-50%);
			}
			.close{
				position: absolute;
				font-size: 18px;
				color: #999999;
				right: 32px;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	.mint-indexlist{
		padding-top: 50px;
	}

}
</style>
<style lang="less">
.city-select{
	.mint-indexlist-nav{
		z-index: 2;
	}
}
</style>
