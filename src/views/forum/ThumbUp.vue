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
	mounted(){
		this.activity= this.self
	},
	methods:{
		click(){

		}
	}
}
</script>

