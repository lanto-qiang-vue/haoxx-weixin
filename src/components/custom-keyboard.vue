<template>
<ul class="custom-keyboard" v-show="show">
	<template v-for="(val, index) in keys">
		<li @click="ok(val)">{{val}}</li>
		<br v-if="(index+1)%10 ==0"/>
	</template>
	<!--<li v-if="keys.length%10 ==0"></li>-->
	<ul class="button">
		<li @click="$emit('del')"><i class="zmdi zmdi-tag-close"></i></li>
		<li @click="close">确定</li>
	</ul>
</ul>
</template>

<script>
export default {
	name: "custom-keyboard",
	data(){
		return{
			show: false,
			keys: '',
			timer: null
		}
	},
	mounted(){
		document.addEventListener('click', this.onDocumentClick);
	},
	methods:{
		open(keys){
			this.keys= keys
			setTimeout(()=>{
				this.show= true
				if(this.timer){
					clearTimeout(this.timer)
					this.timer= null
				}
			}, 50)
		},
		ok(val){
			this.$emit('ok', val)
		},
		close(){
			this.timer= setTimeout(()=>{
				this.$emit('close')
				this.show= false
			}, 100)
		},
		onDocumentClick(event){
			let dom= document.body.querySelector('.custom-keyboard')
			let list= dom.querySelectorAll('*')
			let flag= false
			for(let i in list){
				if(list[i]== event.target){
					flag= true
					break
				}
			}
			if(event.target== dom) flag= true
			if(!flag){
				// this.show= false
				this.close()
			}
		}
	},
	beforeRouteLeave(to, from, next){
		document.removeEventListener('click', this.onDocumentClick);
		next()
	},
	beforeDestroy(){
		document.removeEventListener('click', this.onDocumentClick);
	}
}
</script>

<style scoped lang="less">
.custom-keyboard{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	background-color: #f3f3f3;
	padding:  10px 0 0 10px;
	li{
		width: 8%;
		min-width: 26px;
		max-width: 36px;
		line-height: 40px;
		text-align: center;
		border-radius: 3px;
		background-color: white;
		font-size: 16px;
		color: #333333;
		display: inline-block;
		margin: 0 4px 8px 0;
		box-shadow: 0 1px 1px 0 #DEDEDE;
	}
	.button{
		float: right;
		white-space: nowrap;
		margin-right: 6px;
		li{
			width: auto;
			max-width: none;
			padding: 0 10px;
		}
	}
}
</style>
