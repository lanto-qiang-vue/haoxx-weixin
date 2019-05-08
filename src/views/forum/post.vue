<template>
<div class="forum-post">
	<Form :class="['common-form']" :model="form"
	      :label-width="0" label-position="left" ref="form">
		<FormItem label="选择发布圈子" :label-width="100" prop="topicId">
			<select-radio class="ivu-input select" v-model="form.topicId" :options="typeList"></select-radio>
		</FormItem>
		<FormItem prop="title">
			<Input v-model.trim="form.title" placeholder="标题"></Input>
		</FormItem>
		<FormItem prop="content" style="border: 0">
			<Input v-model.trim="form.content" placeholder="分享您的想法或提出您的疑问" type="textarea"
			       :autosize="{ minRows: 8}" wrap="hard"></Input>
		</FormItem>
	</Form>
	<div class="bottom">
		<ul class="imgs">
			<li v-for="(item, index) in form.picFilePaths"><img :src="item" v-img="{group: 'post-img'}"/>
				<i class="fa fa-times-circle" @click="del(index)"></i></li>
			<li class="add" v-show="form.picFilePaths.length<9" @click="upImg">
				<span>+</span>
				<p>图片</p>
			</li>
		</ul>
		<div class="common-submit" @click="submit"><a>发布</a></div>
	</div>
	<upload ref="upload" backend="hxx" @done="getImg"></upload>
</div>
</template>

<script>
import SelectRadio from '@/components/select-radio.vue'
import Upload from '@/components/compress-upload.vue'
export default {
	name: "forum-post",
	components: {SelectRadio, Upload},
	data(){
		return{
			form:{
				topicId: '',
				title: '',
				content: '',
				picFilePaths: [
					'/img/maintain/shqxw.jpg',
					'/img/maintain/shqxw.jpg',
					'/img/maintain/shqxw.jpg',
					'/img/maintain/shqxw.jpg',
					'/img/maintain/shqxw.jpg',
				]
			},
			typeList: []
		}
	},
	mounted(){
		this.getTypeList()
	},
	methods:{
		getTypeList(){
			this.axiosHxx.post('/cartalk/plate/selectTopicPlate',{},
				{baseURL: '/hxx-gateway-proxy'}
			).then(res=>{
				if(res.data.success){
					let list= res.data.data
					for(let i in list){
						this.typeList.push({
							label: list[i].content,
							value: list[i].id.toString(),
						})
					}
				}
			})
		},
		upImg(){
			this.$refs.upload.clickBox()
		},
		getImg(){

		},
		submit(){
			// console.log('content', JSON.stringify(this.form.content) )
			this.axiosHxx.post('/cartalk/topic/release', this.form,
				{baseURL: '/hxx-gateway-proxy'}
			).then(res=>{
				if(res.data.success){
					this.$toast('发布成功')
					this.$router.go(-1)
				}
			})
		},
		del(index){
			console.log('del(index)', index)
		},
	}
}
</script>

<style scoped lang="less">
.forum-post{
	min-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	&>*{
		flex-shrink:0;
	}
	.bottom{
		.imgs{
			padding: 0 10px 0 20px;
			margin-bottom: 20px;
			overflow: hidden;
			li{
				width: 25%;
				border-style: solid;
				border-color: transparent;
				border-width: 10px 10px 0 0;
				float: left;
				position: relative;
				display: inline-block;
				overflow: visible;
				border-radius: 3px;
				&:before{
					content: '';
					display: block;
					margin-top: 100%;
				}
				img{
					position: absolute;
					width: 100%;
					height: 100%;
					border-radius: 3px;
					overflow: hidden;
					left: 0;
					top: 0;
					object-fit: cover;
				}
				i{
					position: absolute;
					top: -8px;
					right: -8px;
					font-size: 20px;
					border: 2px solid white;
					border-radius: 100%;
					background-color: white;
					width: 22px;
					height: 22px;
					color: #999999;
				}
			}
			.add{
				overflow: hidden;
				&:after{
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: #FCFCFC;
					border: 1px dashed #DDDDDD;
					border-radius: 3px;
				}
				span,p{
					position: absolute;
					display: block;
					text-align: center;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					z-index: 1;
					color: #BDBDBD;
				}
				span{
					font-size: 30px;
					padding-bottom: 20px;
				}
				p{
					font-size: 13px;
					padding-top: 30px;
				}
			}
		}
		.common-submit{
			position: relative;
		}
	}
}
</style>
