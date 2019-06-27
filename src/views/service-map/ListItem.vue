<template>
<li class="maintain-item">
	<div class="picWrap">
		<img :src="item.pic? item.pic.split(',')[0] :'/img/maintain/shqxw.jpg'" />
		<img class="tag" :src="item.is4s?'/img/maintain/tag-4s.png':'/img/maintain/tag-normal.png'"/>
	</div>
	<div class="info">
		<!--<span>{{businessStatus(item.status)}}</span>-->
		<span :class="{rest: !isOpenTime(item.openHours)}">{{isOpenTime(item.openHours)?'营业中': '休息中'}}</span>
		<p>{{ item.name }}
			<!--(<span>{{ item.creditLevel }}</span>)-->
		</p>
		<div class=stars>
			<img src="~@/assets/img/maintain/score_yellow.png"  v-for="index in parseInt(item.rating)||0" :key="'yellow'+index">
			<img src="~@/assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(item.rating))||0" :key="'gray'+index">
			<span v-show="item.rating">{{ item.rating }}分</span>
			<span v-show="!item.rating">暂无评分</span>
		</div>
		<div class="address">
			<span class="miles">{{ item.distance.toFixed(1) }}km</span>
			<span class="address_area">{{ item.addr }}</span>
		</div>
	</div>
</li>
</template>

<script>
export default {
	name: "list-item",
}
</script>

<style scoped>

</style>
