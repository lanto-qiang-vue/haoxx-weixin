<template>
<div class="single-checkbox">
	<span class="checkbox" @click="$emit('change', !checked)">
		<input type="checkbox" class="check-input" value="check" :checked="checked">
		<span class="check-core"></span>
	</span>
	<slot></slot>
</div>
</template>

<script>
export default {
	name: "single-checkbox",
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		checked: Boolean
	},
}
</script>

<style scoped lang="less">
.single-checkbox{
	text-align: center;
	font-size: 12px;
	color: #333333;
	.checkbox{
		width: 14px;
		height: 14px;
		margin-right: 5px;
		display: inline-block;
		font-size: 0;
		input{
			display: none;
		}
		.check-core{
			display: block;
			background-color: #fff;
			border-radius: 100%;
			border: 1px solid #ccc;
			position: relative;
			width: 100%;
			height: 100%;
			&:after{
				content: "";
				border-radius: 100%;
				top: 50%;
				left: 50%;
				position: absolute;
				width: 0;
				height: 0;
				transition: all .2s;
				transform: translate(-50%, -50%);
				background-color: #FF9738;
				transform-origin: center;
			}
		}
		input:checked + .check-core {
			/*background-color: #FF9738;*/
			border-color: #FF9738;
			&:after{
				width: 50%;
				height: 50%;
			}
		}
	}
	a{
		color: #FF9738;
	}
	span{
		vertical-align: middle;
	}
}
</style>
