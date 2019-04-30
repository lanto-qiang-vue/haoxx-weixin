<template>
	<mt-popup
			v-model="show"
			:position="position"
			:popup-transition="$data['popup-transition']"
			:modal="modal"
			:closeOnClickModal="closeOnClickModal"
			style="width: 90%;background: transparent;"
	>
	<div class="popup-input">
		<div class="content">
			<h5 v-show="title">{{title}}</h5>
			<Input v-model="value" :placeholder="placeholder" clearable class="input"/>
		</div>
		<div class="btns">
			<p :class="'popup-input-cancel '+ cancelClass" @click="click(false)">{{cancelText}}</p>
			<p :class="'popup-input-confirm '+ confirmClass" @click="click(true)">{{confirmText}}</p>
		</div>
	</div>
	</mt-popup>
</template>

<script>
export default {
	name: "popup-input",
	data(){
		return {
			show: false,
			position: '',
			'popup-transition': 'popup-fade',
			modal: true,
			closeOnClickModal: true,
			title: '',
			value: '',
			placeholder: '',
			cancelText: '取消',
			confirmText: '确定',
			cancelClass: '',
			confirmClass: '',
			resolve: null,
		}
	},
	methods:{
		popup(options){
			for(let key in options){
				this.$data[key]= options[key]
			}
			this.show= true
			return new Promise((resolve, reject) => {
				this.resolve= resolve
			});
		},
		click(status){
			if(this.resolve){
				this.resolve({status, value: this.value})
				this.resolve= null
			}
			this.show= false
		}
	}
}
</script>

<style scoped lang="less">
.popup-input{
	background-color: white;
	border-radius: 5px;
	overflow: hidden;
	.content{
		padding: 10px 15px 0;
		h5{
			color: #333333;
			font-size: 16px;
			text-align: center;
			font-weight: 500;
			margin-bottom: 10px;
		}
		.input{
			margin-bottom: 10px;
			input{
				height: 36px;
				line-height: 36px;
				font-size: 14px;
			}
		}
	}
	.btns{
		border-top: 1px solid #DCDEE3;
		overflow: hidden;
		p{
			width: 50%;
			float: left;
			height: 39px;
			line-height: 39px;
			text-align: center;
			color: #666666;
			font-size: 16px;
		}
		.popup-input-confirm{
			color: #FF6D0E;
			border-left: 1px solid #DCDEE3;
		}
	}
}
</style>
<style lang="less">
.popup-input{
	.content{
		.input{
			.ivu-input{
				height: 36px;
				line-height: 36px;
				font-size: 14px;
				&:hover, &:focus{
					border-color: #DCDEE3;
					box-shadow: none;
				}
			}
			.ivu-input-icon{
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
</style>
