<template>
<div class="coupons" v-show="productId">
	<ul class="tab">
		<li :class="{on: able}" @click="status=('enableUsed')"><span>可使用</span></li>
		<li :class="{on: !able}" @click="status=('disableUsed')"><span>不可使用</span></li>
	</ul>
	<!--<p class="num">共{{total}}张</p>-->
	<!--<p class="num">共{{total}}张，可用{{query.canuse}}张</p>-->
	<ul class="coupons-list">
		<li v-for="(item, key) in showList" :class="{status3: !able}" :key="key">
			<div class="content">
				<div class="left">
					<label>{{showName(item)}}</label>
					<!--<label>{{item.name}}</label>-->
				</div>
				<i></i>
				<div class="right">
					<div class="button on" v-show="able" @click="use(item)">立即使用</div>
					<div class="type" v-show="!able">
						<p>不可使用</p>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
import {formatDate, deepClone} from '@/util.js'
export default {
	name: "coupons-use",
	data(){
		return{
			enableUsed:[],
			disableUsed:[],
			page: 1,
			total: 0,
			allLoaded: false,
			type:"",
			useList:['未领用','可使用','已使用','已过期'],
			status: 'enableUsed'
		}
	},
	computed:{
		able(){
			return this.status=='enableUsed'
		},
		showList(){
			return this[this.status]
		},
		query(){
			return this.$route.query
		},
		productId(){
			return this.$route.query.productId
		}
	},
	mounted(){
		// this.getList(false);
		this.initBlock()
	},
	methods:{
		open(id){
			this.enableUsed= []
			this.$router.push(  this.$route.path+ this.getBlockHash(id))
			this.getList(id)
		},
		getBlockHash(num){
			let query= deepClone(this.$route.query)
			query.productId= num
			// console.log('this.getHash(query)', this.getHash(query))
			return this.getHash(query)
		},
		initBlock(){
			let query= deepClone(this.$route.query), path= window.location.hash.split('?')[0]
			delete query.productId
			// if(Object.keys(query).length){
			this.$router.replace(  this.$route.path+ this.getHash(query))
			// history.replaceState(null, null, window.location.origin + path+ this.getHash(query))
			// }
		},
		getHash(query){
			let hash=''
			for(let key in query){
				if(hash) hash+= '&'
				hash+= (key+'='+ query[key])
			}
			if(hash) hash= '?'+hash
			return hash
		},
		getList(id){
			this.axiosQixiu.get('/hxxdc/order/promotion/list/' +id, {hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					this.enableUsed= res.data.item.enableUsed ||[]
					this.disableUsed= res.data.item.disableUsed || []
				}
			})
		},
		showName({discount, use_type, name}){
			let num= parseFloat(discount || 0), text=''
			if(use_type== 10561003){
				text= num*10 + '折'
			}else if(use_type== 10561004){
				text= num + '元'
			}
			return name + text
			// return item.name + (item.amount? `-抵扣${item.amount}元`: '')
		},
		use(item){
			item.name= this.showName(item)
			this.$emit('ok', item)
			this.$router.go(-1)
		},
		formatDate: formatDate,
	}
}
</script>

<style scoped lang="less">
.coupons{
	position: fixed;
	width: 100%;
	height: 100vh;
	left: 0;
	top: 0;
	/*height: 100vh;*/
	overflow: auto;
	background-color: white;
	.tab{
		overflow: hidden;
		border-bottom: 10px #F7F7F7 solid;
		text-align: center;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: white;
		li{
			width: 90px;
			display: inline-block;
			text-align: center;
			font-size: 16px;
			color: #333333;
			span{
				display: inline-block;
				margin: 0 auto;
				line-height: 38px;
				border-bottom: 2px solid transparent;
			}
		}
		li.on span{
			color: #FF6D0E;
			border-bottom: 2px solid  #FF6D0E;
		}
	}
	.num{
		color: #666666;
		font-size: 12px;
		/* padding-top: 10px; */
		padding: 10px 10px 5px;
		position: fixed;
		top: 50px;
		background-color: white;
		z-index: 1;
		width: 100%;
	}
	.coupons-list{
		margin-top: 50px;
		.content .left label{
			white-space: nowrap;
			font-size: 18px;
		}
	}
}
@import "./coupons.less";
.coupons-list li .content .right .tag .orange{
	background-color:#ffaa6a;
}
</style>
