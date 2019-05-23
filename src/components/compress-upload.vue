<!--//图片压缩上传按钮-->
<template>
	<div class="compress-upload">
		<input ref="file"  @change="getImg('file')" type="file" accept="image/*" capture="camera">
		<input ref="file2"  @change="getImg('file2')" type="file" accept="image/*">
		<mt-actionsheet style="z-index: 1"
				:actions="actions"
				v-model="sheetVisible">
		</mt-actionsheet>
	</div>
</template>

<script>
import {imgToBase64, base64ToBlob, isIos} from '@/util.js'
import { Actionsheet } from 'mint-ui';
export default {
		name: "compress-upload",
    props: {
	    'mode': {
		    default: ''
	    },
		'operate': {
			type: String,
			default: 'upLoad'
		},
		'accept': {
			type: String,
			default: 'image/jpg,image/png,image/bmp'
		},
	    'backend': {
		    default: 'qixiu'
	    }
    },
	data(){
		let _this = this
		return{
			sheetVisible: false,
			actions: [{
				name: '拍照',
				method(){
					_this.$refs.file.click()
				}
			}, {
				name: '选择相册',
				method(){
					_this.$refs.file2.click()
				}
			}],
		}
	},
	computed:{
		isios(){
			return isIos()
		}
	},
    methods:{
	    clickStop(){
	    	return
	    },
		clickBox(){
	    	switch( this.mode){
			    case 'camera':{
				    this.$refs.file.click()
				    break;
			    }
			    case 'file':{
				    this.$refs.file2.click()
				    break;
			    }
			    default :{
				    if(isIos()){
					    this.$refs.file2.click()
				    }else{
					    this.sheetVisible= true
				    }
			    }
		    }
		},
      getImg(fileName){
        let file= this.$refs[fileName].files[0]
        // console.log(file)
        imgToBase64(file, (base64, name ) => {
          // console.log(base64, name )
	        if(this.operate=='base64'){
		        this.$emit('done', {base64});
	        }else{
		        let formdata = new FormData();
		        formdata.append('file' , base64ToBlob(base64), name);
		        // console.log(base64ToBlob(base64))
		        switch(this.backend){
			        case 'qixiu':{
				        this.axiosQixiu({
					        method: 'post',
					        url: '/file/image/add',
					        headers: {'Content-Type': 'multipart/form-data'},
					        data: formdata
				        }).then( (res) => {
					        // console.log(res.data)
					        if(res.data.success){
						        this.$emit('done', {data:res.data, url:res.data.item.path, base64});
					        }
				        })
				        break
			        }
			        case 'hxx':{
				        this.axiosHxx.post('/cartalk/pic/savePicture?access_token='+ this.$store.state.user.hxxtoken
					        , formdata, {
				            baseURL: '/hxx-gateway-proxy',
					        headers: {'Content-Type': 'multipart/form-data'},
				        }).then(res=>{
					        if(res.data.success){
						        this.$emit('done', {data: res.data, url:res.data.data.picUrl, base64});
					        }
				        })
				        break
			        }
		        }
	        }
	        this.upback()
        })
      },
	    upback(){
		    this.$refs.file.value=null;
		    this.$refs.file2.value=null;
	    }
    }
}
</script>

<style scoped lang="less">
.compress-upload{
	position: absolute;
	height: 0;
	width: 0;
	left: 0;
	top: 0;

	input{
		display: none;
		opacity: 0;
		position: absolute;
		left: 100%;
		top: 100%;
		width: 0;
		height: 0;
	}
}
</style>
