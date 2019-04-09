<template>
<div id="remarkdetail" >
	<mt-header title="点评详情" style="position: fixed;top: 0;width: 100%;z-index: 100"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>

      <div class="compinfo" >
        <img :src="info.companyPhoto ||'/static/img/shqxw.jpg'"/>
        <div class="rightinfo">
          <p class="name">{{info.companyName}}</p>
          <p class="small">{{info.companyAddress}}</p>
        </div>
      </div>
	<div class="remark">
		<p>维修车牌：{{info.vehicleNum}}</p>
		<p>点评日期：{{info.createDate}}</p>
		<p v-if="info.avgScore">我的评分：<img src="/static/img/yellow.png" v-for="index in parseInt(info.avgScore)" :key="'yellow'+index"/>
			<img src="/static/img/gray.png" v-for="index in (5-parseInt(info.avgScore))" :key="'gray'+index"/>
		</p>
		<p>评分详情：
			履约:{{info.keepAppointment}}
			态度:{{info.attitude}}
			质量:{{info.quality}}
			速度:{{info.speed}}
			价格:{{info.price}}</p>
		<p>形象标签：{{info.tags? info.tags.join(','): ''}}</p>
	</div>

	<div class="complaint" v-if="complaint.id">
		<p>反馈类型：{{complaint.type | FormatComplaintType}}</p>
		<p>维修凭证：{{complaint.photoUrl?'已上传':'未上传'}}
			<a v-if="complaint.photoUrl" @click="$refs.img.click()">(点击查看)<img ref="img" :src="complaint.photoUrl" v-img></a>
		</p>
	</div>


	<!--<div class="share" v-show="!complaint.id"><a @click="showmask=true">我要反馈</a></div>-->
</div>
</template>

<script>
import { Toast} from 'mint-ui'
export default {
	name: "new-remark-detail",
    data(){
        return{
			info:{},
			complaint:{}
        }
    },
    created(){
	    let token= localStorage.getItem('ACCESSTOKEN')
	    let openid= localStorage.getItem('QXWOPENID')
	    let url= '/comment/maintain/'+ this.$route.query.id
	    if(!token && openid) url+= ('?openId='+ openid)
      this.axios({
        method: 'get',
        url: url,
      }).then(res => {
		this.info= res.data
	      if(res.data.complaintId){
		      this.axios.get('/comment/complaint/maintain/'+ res.data.complaintId).then(res => {
			      this.complaint= res.data
		      })
	      }
      })

    },
    methods:{


    }
}
</script>

<style scoped lang='less'>
.compinfo{
	margin-top: 40px;
	padding: 10px 20px;
	position: relative;
	border-bottom: 1px solid #f1f1f1;
	img{
		width: 50px;
		height: 50px;
		border-radius: 100%;
		position: absolute;
		left: 20px;
		top: 10px;
	}
	.rightinfo{
		padding-left: 60px;
		width: 100%;
		height: 50px;
		p{
			white-space: nowrap;
			width: 100%;
			line-height: 25px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.name{
			font-size: 16px;
		}
		.small{
			font-size: 12px;
			padding-left: 15px;
			color: #d1d1d1;
			background: url("/static/img/remark/address_gray.png") no-repeat left center;
			background-size: 12px auto;
		}
	}
}
.complaint, .remark{
	padding: 0 20px;
	p{
		font-size: 13px;
		line-height: 30px;
		img{
			width: 16px;
			vertical-align: baseline;
		}
	}
}
.complaint{
	border-top: 20px solid #fbfbfb;
	img{
		width: 0;
		height: 0;
	}
}
.share{
	position: fixed;
	bottom: 10px;
	width: 100%;
	text-align: center;
	a{
		font-size: 18px;
		width: 90%;
		height: 40px;
		line-height: 40px;
		border-radius: 20px;
		color: white;
		/*background-color: #4089f6;*/
		background: linear-gradient(to right, #78b9fd , #4f40ff);
		display: inline-block;
	}
}
</style>

