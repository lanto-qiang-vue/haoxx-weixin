<template>
<div class="test">
	<index-list ref="vehicle" @ok="okay"></index-list>
	<div @click="click" style="line-height: 30px">点击</div>
	<div @click="click2" style="line-height: 30px">点击2</div>

	<!--<div style="text-align: center;font-family: Microsoft YaHei,微软雅黑;">-->
	<!--<div style="font-size: 16px; line-height: 30px; width: 100%;max-width: 800px;display: inline-block;text-align: left">-->
<!--<p>各汽车维修企业：</p>-->
	<!--<p style="text-indent: 2em">自2019年4月15日起，将会有佩戴上海汽修平台工作证的平台工作人员到门店进行现场服务，届时将会协助各维修企业完成市运管处签发的【2018】250号文件相关要求。</p>-->
	<!--<p style="text-indent: 2em">特此通知。</p>-->
	<!--<p style="text-align: right;margin-top: 30px">上海市机动车维修公共服务平台</p>-->
	<!--<p style="text-align: right">2019年4月13日</p>-->
	<!--<p style="margin-top: 50px">附件：平台工作人员工作证示例图</p>-->
	<!--<div style="width: 100%;text-align: center">-->
	<!--<img style="margin-top: 20px;max-width: 500px" src="https://download.image.shanghaiqixiu.org/2019/04/12/1555081405003.jpg"/>-->
	<!--</div>-->
	<!--</div>-->
	<!--</div>-->
</div>
</template>

<script>
import IndexList from '@/components/vehicle-model.vue'
export default {
	components: {IndexList},
	name: "test",
	mounted(){

	},
	methods:{
		click(){
			window.location.href= 'https://wxcredit.test.abchina.com/App/pic/?isshare=1&saler=18ffcb4b0e588486081e0e4359a612537&salersource=1'
			// this.$refs.vehicle.open()
			// this.$router.push({path: this.$route.path, query:{vehiclemodelblock: 1}})
			// this.$router.push('/test?vehiclemodelblock=1')
			// console.log('this.$route', this.$route)
		},
		click2(){
			this.$router.push({path: this.$route.path, query:{vehiclemodelblock: 2}})
		},
		okay(item){
			// console.log('okay', item)
		}
	}
}
</script>

<style scoped lang="less">

</style>
