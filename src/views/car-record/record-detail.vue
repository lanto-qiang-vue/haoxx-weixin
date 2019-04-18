<template>
<div class="box" >
        <div v-show="(showComment|| showComplaint &&flag1 &&flag2) && showButton" class="button_wrap">
          <mt-button v-show="showComment" :class="{half: false}" @click="goRemark" type="primary" size="large">我要评价</mt-button>
          <!--<mt-button v-show="showComplaint" :class="{half: showComment}" @click="goComplaint" type="primary" size="large">我要反馈</mt-button>-->
	        <span class="other"></span>
        </div>
        <div  :class="{bottom: (showComment|| showComplaint &&flag1 &&flag2) &&showButton}">
          <div class="title">
            <img src="/img/car-record/repairLog.png">
            <span>维修记录</span>
          </div>
          <ul class="repairRecord">
            <li>
              <span class="left">维修企业名称</span>
              <span class="right">{{ repairInfo.companyName }}</span>
            </li>
            <li>
              <span class="left">结算清单编号</span>
              <span class="right">{{ repairInfo.costlistcode }}</span>
            </li>
            <li>
              <span class="left">车架号(VIN)</span>
              <span class="right">{{ repairInfo.vin }}</span>
            </li>
            <li>
              <span class="left">送修日期</span>
              <span class="right">{{ repairInfo.repairDate }}</span>
            </li>
            <li>
              <span class="left">送修里程</span>
              <span class="right">{{ repairInfo.repairMileage }} 公里</span>
            </li>
            <li>
              <span class="left">结算日期</span>
              <span class="right">{{ repairInfo.settleDate }}</span>
            </li>
            <li>
              <span class="left">车牌号码</span>
              <span class="right">{{  repairInfo.plateNumber }}</span>
            </li>
            <li>
              <span class="left">故障描述</span>
              <span class="right">{{ repairInfo.faultDescription }}</span>
            </li>
          </ul>
          <div class="title">
            <img src="/img/car-record/repairItem.png">
            <span>维修项目</span>
          </div>
          <ul class="repairItem">
            <li v-for='(item, index) in weixiuxiangmu' :key='index'>
              <div>
                <p>名称: {{ item.repairproject }}</p>
                <p>工时: {{ item.workinghours }}</p>
              </div>
            </li>
            <li v-show="!weixiuxiangmu||!weixiuxiangmu.length" style="text-align: center">无</li>
          </ul>
          <div class="title">
            <img src="/img/car-record/repairOther.png">
            <span>维修配件</span>
          </div>
          <ul class="repairOther">
            <li v-for='(item, index) in weixiupeijian' :key="index">
              <div>
                <p>名称: {{ item.partsname }}</p>
                <p>编号: {{ item.partscode }}</p>
                <p>数量: {{ item.partsquantity }}</p>
              </div>
            </li>
            <li v-show="!weixiupeijian||!weixiupeijian.length" style="text-align: center">无</li>
          </ul>
          <div class="title">
            <img src="/img/car-record/repairLog.png">
            <span>维修点评</span>
          </div>

          <ul class="repairItem">
            <li v-show="showComment" style="text-align: center">暂无评论</li>
            <li v-show="!showComment" class="comment" @click="goRemarkDetail(comment.id)">
              <div class="left"><img v-if="comment.photo" :src="comment.photo"/></div>
              <div class="right">
                <div class="name">车友：{{comment.vehicleNum}} <span>{{comment.createTime | FormatDate}}</span></div>
                <div class="avg">
                  <img src="/img/remark/score_yellow.png"  v-for="index in parseInt(comment.avgScore)||0" :key="'yellow'+index">
                  <img src="/img/remark/score_gray.png"  v-for="index in (5-parseInt(comment.avgScore))||0" :key="'gray'+index">
                  {{comment.avgScore}}分
                </div>
                <div class="all">
                  履约 {{comment.keepAppointment}}
                  态度 {{comment.attitude}}
                  质量 {{comment.quailty}}
                  速度 {{comment.speed}}
                  价格 {{comment.price}}
                </div>
                <ol v-if="comment.tags">
                  <li v-for="(tag, index) in comment.tags.split(';')" :key="index">{{tag}}</li>
                </ol>
              </div>
            </li>
          </ul>

          <!--<div class="title">-->
            <!--<img src="/img/car-record/repairLog.png">-->
            <!--<span>维修反馈</span>-->
          <!--</div>-->
          <!--<ul class="repairItem">-->
            <!--<li v-show="showComplaint" style="text-align: center">暂无反馈</li>-->
            <!--<li v-show="!showComplaint" class="complaint">-->
              <!--{{getType(complaint.type)}}{{complaint.hasEvidence?'（有凭据）':''}}-->
              <!--<span>{{complaint.createDate | FormatDate}}</span>-->
            <!--</li>-->
          <!--</ul>-->
    </div>
</div>
</template>

<script>
  import { Toast } from 'mint-ui'
export default {
   data(){
      return{
        repairInfo: {
          repairBasicinfo: {}
        },
        formateRepairDate: '',
        formateSettleDate: '',
        weixiuxiangmu: [],
        weixiupeijian: [],
        comment: {},
        complaint: {},

        showComment: false,
        showComplaint: false,

        flag1:false,
        flag2:false,
      }
   },
	computed:{
   	    showButton(){
   	    	// console.log(this.$route)
	        return this.$route.path== '/vehicleDetail-carOwner'
        }
	},
  mounted(){
	  // console.log(this.$route)
     // console.log(this.$router.replaceState)
    let self= this

    this.axiosQixiu({
      method: 'post',
      url: '/vehicle/carfile/queryDetail',
      data: {
	    repairbasicinfoId: this.$route.query.repairbasicinfoId
      }
    }).then(res=>{
        // console.log(res);
        if(res.data.code==="0"){
          this.repairInfo = res.data.item.repairBasicinfo
          this.weixiuxiangmu=res.data.item.repairprojectlist
          this.weixiupeijian=res.data.item.vehiclepartslist
        }else {
          Toast(res.data.status)
          setTimeout(()=>{
            this.$router.go(-1)
          },2000)
        }
      })
    this.axiosQixiu({
      method: 'get',
      url: '/comment/maintain/query/repairId?repairId='+  this.$route.query.repairbasicinfoId,
    }).then(res=>{
      // console.log(res);
        if(res.data.id){
          self.comment = res.data
          self.showComment=false
          if(self.$route.query.show=='yes') Toast('已经有评价')
        }else{
          if(self.$route.query.show=='yes') {
            history.replaceState(null, null, window.location.origin + window.location.hash.replace('&show=yes',''))
            self.goRemark()
          }
          self.showComment=true
        }
        self.flag1=true
    })

    this.axiosQixiu({
      method: 'get',
      url: '/comment/complaint/maintain/query/repairId?repairId='+ this.$route.query.repairbasicinfoId,
    }).then(res=>{
      // console.log(res);
        if(res.data.id){
          self.complaint = res.data
          self.showComplaint=false

        }else{

          self.showComplaint=true
        }
        self.flag2=true

    })
  },
  methods: {
    goRemark(){
      // this.axiosQixiu({
      //   url: '/company/review/isExistUnreviewRepairBasicInfo',
      //   method: 'post',
      //   headers: {'Content-type': 'application/json'},
      //   data: JSON.stringify({
      //     accessToken: localStorage.getItem("ACCESSTOKEN"),
      //     companyId: this.$route.query.companyId
      //   })
      // }).then(res=>{
      //   if(res.data.data.result){
      //     this.$router.push({
      //       path: '/remark',
      //       query: {corpId:this.$route.query.companyId}
      //     })
      //   }else{
      //     Toast("未找到您在该企业未评价的维修记录")
      //   }
      // })

      this.$router.push({path: '/remark-match',
        query: { corpId: this.$route.query.companyId,
          repairId: this.$route.query.repairbasicinfoId,
	        vehicleplatenumber: this.$route.query.vehicleplatenumber,
	        show: 'yes',
	        compName: this.repairInfo.companyName
      }})
    },
    goRemarkDetail(id){
      this.$router.push({path:'/remarkDetail', query:{id: id}})
    },
    goComplaint(){
      this.$router.push({path: '/upComplain',
        query: {
          // corpId: this.$route.query.companyId,
          repairId: this.$route.query.repairbasicinfoId,
          // vehicleplatenumber: this.repairInfo.vehicleplatenumber,
          // show: 'yes',
          type: 1
      }})
    },
    getType(type){
      switch (type){
        case '0': return '维修记录未上传';
        case '1': return '维修记录不正确';
        default: return '维修记录未上传';
      }
    }
  }
}
</script>
<style lang='less' scoped>
    .box {
        height: 100vh;
        width: 100%;
        position: relative;
        overflow: scroll;
	    .button_wrap{
		    padding: 8px 10px;
		    width: 100%;
		    border-top: 1px solid rgb(204, 204, 204);
		    position: fixed;
		    left: 0px;
		    bottom: 0px;
		    background-color: white;
		    z-index: 1;
		    text-align: justify;
	    }
	    .title {
            border-top: 10px solid #f8f8f8;
            width: 100%;
            box-sizing: content-box;
            height: 35px;
            border-bottom: 1px solid #f8f8f8;
            line-height: 35px;
            font-size: 16px;
            color: #333;
            img {
                width: 15px;
                height: 15px;
                margin: 10px 0 0 10px;
            }
        }
        .title:first-child{
          border-top: 0;
        }
        .repairRecord {
            margin-left: 20px;
            li {
                border-bottom: 1px solid #f8f8f8;
                /*height: 40px;*/
                line-height: 20px;
                padding: 10px 0;
                font-size: 14px;
                width: 100%;
                .left {
                    color: #333;
                    float: left;
                }
                .right {
                    display: block;
                    margin-left: 95px;
                    /*text-align: right;*/
                    color: #666;
                    margin-right: 10px;
                    overflow: hidden;
                    /*white-space: nowrap;*/
                    /*text-overflow: ellipsis;*/
                }
            }
        }
        .repairItem {
          margin-left: 20px;
            li{
                line-height: 22px;
                padding: 6px 0;
                border-bottom: 1px solid #eee;
                p {
                    margin-bottom: 0;
                    color: #333;
                }
            }
        }
        .repairOther {
            margin-left: 20px;
            li {
                height: 80px;
                padding: 8px 0;
                border-bottom: 1px solid #eee;
                p {
                    line-height: 22px;
                    margin-bottom: 0;
                    color: #333;
	                white-space: nowrap;
	                text-overflow: ellipsis;
	                overflow: hidden;
                }
            }
        }
        li.comment{
          position: relative;
          padding: 5px 10px 0 0;
          border-bottom: 1px solid #eeeeee;
          .left{
            position: absolute;
            width: 35px;
            height: 35px;
            border-radius: 100%;
            background-color: #eeeeee;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .right{
            padding-left: 45px;
            width: 100%;
            .name{
              font-size: 14px;
              span{
                float: right;
                color: #999999;
              }
            }
            .avg {
              font-size: 12px;
              color: #999999;
              img {
                width: 15px;
                float: left;
                margin-right: 3px;
                margin-top: 3px;
              }
            }
            .all {
              font-size: 13px;
              font-weight: 300;
            }
            ol{
              li{
                padding: 0 5px;
                font-size: 12px;
                margin: 0 5px 5px 0;
                background-color: #ff8327;
                color: white;
                display: inline-block;
                border-radius: 5px;
                border: 0;
              }
            }
          }
        }
      .complaint{
        font-size: 14px;
        color: #666666;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eeeeee;
        position: relative;
        span{
          position: absolute;
          top: 0;
          right: 10px;
          line-height: 40px;
        }
      }

    }
  .bottom{
    margin-bottom: 58px;
  }
</style>
<style lang='less'>
  .mint-button.half{
    display: inline-block;
    width: 48%;
	  margin: 0 1%;
  }
</style>
