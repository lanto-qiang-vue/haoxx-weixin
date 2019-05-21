<template>
<div class="reply-input" v-show="show">
	<div class="mask" v-show="showMask" @click="close"></div>
	<div class="bottom">
		<div class="target" v-show="replyName">
			正在回复·{{ replyName}}
		</div>
		<div :class="['reply', {on: content}]">
			<Input v-model.trim="content" placeholder="请输入您的评论" type="textarea"
			       :autosize="{ minRows: 1}" wrap="hard"
			       @on-focus="focus"
			       ref="input"
			></Input>
			<div class="post" v-show="content" @click="submit">发布</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "reply-input",
	props: {
		'initShow': {
			default: false
		},
	},
	data(){
		return{
			content: '',
			showMask: false,
			show: false,
			resolve: null,
			replyName: ''
		}
	},
	mounted(){
		this.close()
	},
	methods: {
		open( name){
			if(!this.$store.state.user.hxxtoken){
				this.$router.push({path: '/login', query: { redirect: this.$route.fullPath }})
				return
			}
			this.replyName= name
			this.show= true
			setTimeout(()=>{
				this.$refs.input.focus()
			},50)
			return new Promise((resolve, reject) => {
				this.resolve= resolve
			});
		},
		focus(){
			if(!this.$store.state.user.hxxtoken){
				this.$router.push({path: '/login', query: { redirect: this.$route.fullPath }})
				return
			}
			this.showMask=true
		},
		close(){
			this.content= ''
			this.replyName= ''
			this.resolve= null
			this.showMask= false
			this.show= this.initShow
		},
		submit(){
			if(!this.content){
				this.$toast('请输入内容');
			}else{
				if(this.resolve){
					this.resolve(this.content )
					this.resolve= null
				}else{
					this.$emit('reply', this.content);
				}
			}
		}
	}
}
</script>

<style scoped lang="less">
.reply-input{
	.mask{
		position: fixed;
		background-color: black;
		opacity: .3;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
	}
	.bottom{
		z-index: 2;
		position: fixed;
		left: 0;
		bottom: 0;
		max-height: 100vh;
		overflow: hidden;
		width: 100%;
		border-top: 1px solid #EEEEEE;
		.target{
			padding: 0 15px;
			height: 40px;
			line-height: 40px;
			background-color: #F6F6F6;
			color: #999999;
			font-size: 13px;
		}
		.reply{
			padding: 10px 20px;
			background-color: white;
			position: relative;
			&.on{
				padding-right: 50px;
			}
			.post{
				display: inline-block;
				padding: 5px;
				font-size: 14px;
				color: #FE8636;
				position: absolute;
				bottom: 10px;
				right: 10px;
			}
		}
	}
}
</style>
<style lang="less">
.reply-input .reply textarea{
	max-height: 90vh!important;
	overflow-y: auto!important;
	border: 0;
	box-shadow: none;
	background-color: #F6F6F6;
	padding: 4px 10px;
}
</style>
