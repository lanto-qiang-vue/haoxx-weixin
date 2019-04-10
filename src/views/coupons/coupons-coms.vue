<template>
<div class="coupons-coms">
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
	<ul class="list">
		<li v-for="item in list">
			<p>{{item.name}}</p>
			<span>{{item.address}}</span>
		</li>
	</ul>
	</mt-loadmore>
</div>
</template>

<script>
export default {
	name: "coupons-coms",
	data(){
		return{
			list:[],
			page: 1,
			total: 0,
			allLoaded: false,
			companyId:[],
		}
	},
	watch:{

	},
	mounted(){
	    this.companyId = this.$route.query.id.split(',');
	    this.companyId = this.companyId.map(function(i){
	        return parseInt(i);
		});
		this.getList(false)
	},
	methods:{
		getList(flag){
			let params={
				page: this.page-1,
				size: 10
			}
			console.log(this.companyId);
			if(this.selected) params.hasRead= this.selected
			this.axios.post('/corp/info/list',this.companyId).then(res=>{
			    if(res.data.code == 0) this.list = res.data.items;
				// this.total= res.data.totalElements
				// if(res.data.content&&res.data.content.length){
				// 	this.list=this.list.concat(res.data.content)
				// 	// this.list=res.data.comments
				// 	if(this.list.length>=res.data.totalElements){
				// 		this.allLoaded=true
				// 	}else{
				// 		this.allLoaded=false
				// 	}
				// 	if(flag) this.$refs.loadmore.onBottomLoaded()
				// }else{
				// 	this.allLoaded=true
				// }
			})
		},
		loadMore(){
			this.page++
			this.getList(true)
		},
	}
}
</script>

<style scoped lang="less">

.coupons-coms{
	height: 100vh;
	overflow: auto;
	background-color: white;
	.list{
		padding-left: 15px;
		overflow: hidden;
		li{
			height: 60px;
			position: relative;
			border-bottom: 1px solid #D9D9D9;
			line-height: 20px;
			overflow: hidden;
			p{
				color: #333333;
				font-size: 14px;
				margin-top: 10px;
			}
			span{
				color: #666666;
				font-size: 12px;
			}
			&:after{
				content: '';
				position: absolute;
				right: 10px;
				top: 50%;
				border-right: 1px solid #666666;
				border-bottom: 1px solid #666666;
				width: 10px;
				height: 10px;
				transform: rotate(-45deg) translateY(-50%);
			}
		}
	}

}
</style>
