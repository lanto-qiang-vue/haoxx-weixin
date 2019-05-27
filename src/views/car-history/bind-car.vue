<template>
  <div class="bind-car">
	  <div class="upBlock drive">
		  <div class="title"><i></i>行驶证正面照片<i></i></div>

		  <div class="imgBlock">
			  <div :class="['img',{nobg: drivePic}]" @click="clickImg('upLicense',drivePic)">
				  <img v-img v-show="drivePic" :src="drivePic">
			  </div>
			  <p @click.stop.prevent="$refs.upLicense.clickBox()">拍摄正面</p>
		  </div>
		  <upload operate='base64' mode="camera" @done="upLicense" ref="upLicense"></upload>
	  </div>

	<div class="upBlock id" v-show="needId || idCard.id">
		<div class="title"><i></i>身份证正面照片<i></i></div>
		<p>请上传行驶证对应的身份证</p>

		<div class="imgBlock" >
			<div :class="['img',{nobg: idPic}]" @click="clickImg('upIdCard', idPic)">
				<img v-img v-show="idPic" :src="idPic">
			</div>
			<p @click.stop.prevent="$refs.upIdCard.clickBox()" >拍摄正面</p>
		</div>
		<upload operate='base64' mode="camera" @done="upIdCard" ref="upIdCard"></upload>
	</div>

	  <div class="info" v-show="license.id">
		  <div class="head">
			  <p>行驶证识别信息</p>
		  </div>
		  <ul>
			  <li>
				  <label>所有人</label>
				  <span>{{license.ownerName}}</span>
			  </li>
			  <li>
				  <label>车牌号</label>
				  <span>{{license.vehiclePlateNumber}}</span>
			  </li>
			  <li>
				  <label>车架号(VIN)</label>
				  <span>{{license.vin}}</span>
			  </li>
			  <li>
				  <label>发证日期</label>
				  <span>{{license.issueDate}}</span>
			  </li>
			  <li>
				  <label>注册日期</label>
				  <span>{{license.issueDate}}</span>
			  </li>
			  <li>
				  <label>发动机号</label>
				  <span>{{license.engineNo}}</span>
			  </li>
		  </ul>
	  </div>

	  <!--<div class="info" v-show="showIDCardUpInfo">-->
	  <div class="info" v-show="idCard.creditId || idCard.id">
		  <div class="head">
			  <p>身份证正面识别信息</p>
		  </div>
		  <ul>
			  <li>
				  <label>姓名</label>
				  <span>{{idCard.ownerName}}</span>
			  </li>
			  <li>
				  <label>身份证号</label>
				  <span>{{idCard.idCardNo}}</span>
			  </li>
		  </ul>
	  </div>

	  <div class="upBlock">
		  <div class="title"><i></i>拍摄证件要求<i></i></div>
		  <div class="rule">
			  <p>拍摄时确保证件<span style="color: #fc0;">边框完整，字体清晰，亮度均匀</span></p>
			  <li>
				  <img src="/img/car-record/身份证_标准@3x.png">
				  <p>标准</p>
			  </li>
			  <li>
				  <img src="/img/car-record/身份证_边框缺失@3x.png">
				  <p>边框缺失</p>
			  </li>
			  <li>
				  <img src="/img/car-record/身份证_照片模糊@3x.png">
				  <p>照片模糊</p>
			  </li>
			  <li>
				  <img src="/img/car-record/身份证_闪光强烈@3x.png">
				  <p>闪光强烈</p>
			  </li>
		  </div>
	  </div>

	  <div class="common-submit">
		  <!--<submit-button :rules="rules" :datas="form" :feedback="true" @click="Bind">提交绑定</submit-button>-->
		  <a class="on" @click="bind">提交绑定</a>
	  </div>

  </div>
</template>

<script>
import Upload from '@/components/compress-upload.vue'
import {deepClone, formatDate, reg} from '@/util.js'
import SubmitButton from '@/components/submit-button.vue'
export default{
    name: "bind-car",
    components: {Upload, SubmitButton},
    data(){
	    return {
		    drivePic: '',
		    idPic: '',
		    license: {},
		    idCard: {},
		    needId: false,
		}
    },
	computed:{

	},
	mounted(){

	},
	methods: {
		clickImg(ref, img){
			if(!img){
                this.$refs[ref].clickBox()
            }
		},
		upLicense({base64}){
		    //调用上传接口;
            this.drivePic = base64;
		},
		upIdCard({base64}){

		},
		bind() {

		}
	}
}
</script>

<style lang='less' scoped>
.bind-car{
	padding-bottom: 40px;
	background-color: #f8f8f8;

	.drive .img{
		background: #f2f7fd url("/img/car-record/行驶证@3x.png") no-repeat center center;
	}
	.id .img{
		background: #f2f7fd url("/img/car-record/身份证_正面@3x.png") no-repeat center center;
	}
	.business .img{
		background: #f2f7fd url("/img/car-record/营业执照@3x.png") no-repeat center center;
	}
	.upBlock{
		padding: 20px 15px 15px;
		margin-bottom: 15px;
		background-color: white;
		.title{
			text-align: center;
			color: #666666;
			i{
				display: inline-block;
				width: 30px;
				height: 2px;
				background-color: #f1f2f4;
				padding: 0 5px;
				margin: 0 10px;
				position: relative;
				vertical-align: middle;
				&:first-child::after, &:last-child::before{
					content: '';
					width: 4px;
					height: 4px;
					display: block;
					background-color: #d1d6dc;
					position: absolute;
					top: -1px;
					border-radius: 100%;
					left: 0;
				}
				&:first-child::after{
					left: auto;
					right: 0;
				}
			}
		}
		>p{
			font-size: 13px;
		}
		.imgBlock{
			width: 220px;
			margin: 25px auto;
			overflow: hidden;
			border-radius: 5px;
			.img{
				height: 120px;
				text-align: center;
				background-size: 100px auto;
				position: relative;
				img{
					width: auto;
					height: auto;
					max-width: 100%;
					max-height: 100%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
			.img.nobg{
				background: #f2f7fd;
			}
			p{
				font-size: 15px;
				line-height: 30px;
				background-color: #FF9738;
				text-align: center;
				color: white;
			}
		}
		.rule{
			margin-top: 25px;
			overflow: hidden;
			p{
				color: #999999;
			}
			li{
				width: 50%;
				float: left;
				text-align: center;
				margin-top: 10px;
				img{
					width: 80%;
				}
				p{

				}
			}
		}
	}
	.info{
		background-color: white;
		.head{
			background: #FF9738;
			font-size: 16px;
			position: relative;
			p{
				font-size: 16px;
				line-height: 35px;
				color: white;
				margin-left: 15px;
			}
			span{
				border: 1px solid white;
				position: absolute;
				right: 15px;
				top: 50%;
				background: rgba(0, 0, 0, 0.2);
				transform: translateY(-50%);
				color: white;
				padding: 1px 15px;
				border-radius: 3px;
			}
		}
		ul{
			padding-left: 15px;
			font-size: 15px;
			li{
				min-height: 41px;
				overflow: hidden;
				border-bottom: 1px solid #c8c7cc;
				position: relative;
				label{
					display: inline-block;
					width: 100px;
					line-height: 40px;
					position: absolute;
					left: 0;
					top: 0;
				}
				span{
					display: inline-block;
					width: 100%;
					padding-left: 110px;
					/*white-space: nowrap;*/
					/*overflow: hidden;*/
					text-overflow: ellipsis;
					line-height: 20px;
					height: 20px;
					margin-top: 10px;
				}
				p{
					height: auto;
					padding-left: 110px;
					position: relative;
					line-height: 20px;
					color: orange;
					font-size: 15px;
					margin-bottom: 5px;
					&:before{
						content: '修改后';
						position: absolute;
						left: 0;
						line-height: 20px;
						height: 20px;
						color: orange;
						margin-bottom: 5px;
					}
				}
			}
		}
	}
}
</style>
