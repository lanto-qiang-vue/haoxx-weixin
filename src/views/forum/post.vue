<template>
<div class="forum-post">
	<Form :class="['common-form']" :model="form"
	      :label-width="0" label-position="left" ref="form">
		<FormItem label="选择发布圈子" :label-width="100" prop="topicId">
			<select-radio class="ivu-input select" v-model="form.topicId" :options="typeList"></select-radio>
		</FormItem>
		<FormItem prop="title">
			<Input v-model.trim="form.title" placeholder="标题" :maxlength="100"></Input>
		</FormItem>
		<FormItem prop="content" style="border: 0">
			<Input v-model.trim="form.content" placeholder="分享您的想法或提出您的疑问" type="textarea"
			       :autosize="{ minRows: 8}" wrap="hard" :maxlength="30000"></Input>
		</FormItem>
	</Form>
	<div class="bottom">
		<ul class="imgs">
			<li v-for="(item, index) in form.picFilePaths">
				<img :src="imgDatas['img-'+item] || item" v-img="{group: 'post-img'}"/>
				<i class="fa fa-times-circle" @click="del(index)"></i></li>
			<li class="add" v-show="form.picFilePaths.length<9" @click="upImg">
				<span>+</span>
				<p>图片</p>
			</li>
		</ul>
		<div class="common-submit">
			<submit-button :rules="rules" :datas="form" :feedback="true" @click="submit">发布</submit-button>
		</div>
	</div>
	<upload ref="upload" backend="hxx" @done="getImg"></upload>
</div>
</template>

<script>
import SelectRadio from '@/components/select-radio.vue'
import Upload from '@/components/compress-upload.vue'
import SubmitButton from '@/components/submit-button.vue'
export default {
	name: "forum-post",
	components: {SelectRadio, Upload, SubmitButton},
	data(){
		return{
			form:{
				topicId: '',
				title: '',
				content: '',
				picFilePaths: []
			},
			typeList: [],
			imgDatas: {},
		}
	},
	computed:{
		rules(){
			return {
				topicId: { required: true, message:'请选择发布圈子'},
				title: { required: true, message:'请填写标题'},
				content: { required: true, message:'请填写内容'},
			}
		}
	},
	mounted(){
		this.getTypeList()
		this.form.topicId= this.$route.query.id
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
		getImg({url, base64}){
			this.form.picFilePaths.push(url)
			this.imgDatas['img-'+url]= base64
		},
		submit(data){
			// console.log('data', data )
			this.axiosHxx.post('/cartalk/topic/release',{data: this.form},
				{baseURL: '/hxx-gateway-proxy'}
			).then(res=>{
				if(res.data.success){
					this.$toast('发布成功')
					// this.$router.go(-1)
					this.$router.replace('/topic?id='+ res.data.data.contentId)
				}
			})
		},
		del(index){
			// console.log('del(index)', index)
			let url= (this.form.picFilePaths[index]&& this.form.picFilePaths[index].indexOf('url=')>=0)?
				this.form.picFilePaths[index].split('url=')[1]: ''
			this.form.picFilePaths.splice(index, 1)
			if(url){
				this.axiosHxx.post('/cartalk/pic/delPicture', {url: url},
					{baseURL: '/hxx-gateway-proxy'}
				).then(res=>{
					if(res.data.success){}
				})
			}
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
					line-height: 18px;
					border: 2px solid white;
					border-radius: 100%;
					background-color: white;
					width: 21px;
					height: 21px;
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
