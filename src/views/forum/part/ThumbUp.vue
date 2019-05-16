<template>
	<span :class="[{[onclass]: activity}, 'thumb-up']" @click="click">
		<i class="fa fa-thumbs-o-up"></i><span>{{showNum}}</span>
	</span>
</template>

<script>
export default {
	name: "thumb-up",
	props: {
		'num': {
			default: 0
		},
		'id': {
			default: ''
		},
		'type': {
			default: ''
		},
		self:{
			default: false
		},
		onclass:{
			default: 'on'
		},
	},
	computed:{
		showNum(){
			let num= 0
			if(this.self){
				num= this.activity? this.num : this.num-1
			}else{
				num= this.activity? this.num+1 : this.num
			}
			return num
		}
	},
	data(){
		return{
			activity: false
		}
	},
	watch:{
		self(val){
			this.activity= val
		}
	},
	mounted(){
		this.activity= this.self
	},
	methods:{
		click(){
			let on= this.activity, url= ''
			switch (on){
				case true:{
					url= '/cartalk/praise/cancel'
					break
				}
				case false:{
					url= '/cartalk/praise/add'
				}
			}
			this.axiosHxx.post(url, {
					businessId: this.type,
					primaryKey: this.id,
				}, {baseURL: '/hxx-gateway-proxy', noIndicator: true}).then(res=>{
				if(res.data.success){
					this.activity= !on
				}
			})
		}
	}
}
</script>

<style lang="less">
.thumb-up.on{
	color: #FF6D0E;
}
</style>
