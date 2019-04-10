<template>
<div>
	{{}}
	<mt-popup v-model="showRadio" style="width: 90%">
		<div class="popupBlock">
			<mt-radio
					@click.native="select"
					align="right"
					v-model="value"
					:options="options">
			</mt-radio>
		</div>
	</mt-popup>
</div>
</template>

<script>
export default {
	name: "select-radio",
	props:{
		options:{
			default(){
				return []
			}
		},
		text:{
			default: '获取验证码'
		},
		disableClass:{
			default: 'off'
		},
		phone:{
			default:"",
		},
		url:{
			default:"",
		}
	},
	data(){
		return{
			value: '',
			showRadio: false
		}
	},
	methods:{
		select(){

		}
	}
}
</script>

<style scoped lang="less">

</style>
