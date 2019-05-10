<template>
<div class="reply-input" v-show="!hideInput">
	<div class="mask" v-show="showMask"></div>
	<div class="bottom">
		<div class="target">
			正在回复·186****5567
		</div>
		<div :class="['reply',{on: content}]">
			<Input v-model.trim="content" placeholder="请输入您的评论" type="textarea"
			       :autosize="{ minRows: 1}" wrap="hard"
			       @on-focus="showMask=true"
			       @on-blur="showMask=false"
			></Input>
			<div class="post" v-show="content">发布</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "reply-input",
	props: {
		'hideInput': {
			default: false
		},
	},
	data(){
		return{
			content: '',
			showMask: false
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
