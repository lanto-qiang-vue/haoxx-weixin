<template>
<div style="height: 100vh;overflow: auto;">
  <mt-header title="全部点评" style="position: fixed;top: 0;width: 100%;z-index: 100"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">
    <ul class="content" style="margin-top: 40px">
      <li v-show="!$route.query.joint" class="system">
        <div class="left"><img src="~@/assets/img/maintain/shqx-head.png"/></div>
        <div class="right">
          <div class="name">上海汽修平台<span>系统评分</span></div>
          <div class="avg">
            <img src="~@/assets/img/maintain/score_yellow.png"  v-for="index in 1" :key="'yellow'+index">
            <img src="~@/assets/img/maintain/score_gray.png"  v-for="index in 4" :key="'gray'+index">
            1.2分
          </div>
          <div class="msg">企业未能遵照相关法律法规和政策完成《汽车维修电子健康档案系统》对接，因此设置默认评分。</div>
        </div>
      </li>
      <li :to="{path:'/remarkDetail', query:{id: item.id}}" tag="li" v-for="(item, index) in list" :key="index">
        <div class="left"><img v-if="item.photo" :src="item.photo.replace(/http/g, 'https')"/></div>
        <div class="right">
          <div class="name">车友：{{item.vehicleNum}} <span>{{item.createTime | FormatDate}}</span></div>
          <div class="avg">
            <img src="~@/assets/img/maintain/score_yellow.png"  v-for="index in parseInt(item.userAvgScore)||0" :key="'yellow'+index">
            <img src="~@/assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(item.userAvgScore))||0" :key="'gray'+index">
            {{item.userAvgScore}}分
          </div>
          <div class="all">
            履约 {{item.keepAppointment}}
            态度 {{item.attitude}}
            质量 {{item.quailty}}
            速度 {{item.speed}}
            价格 {{item.price}}
          </div>
          <ol v-if="item.tags">
            <li v-for="(tag, index) in item.tags" :key="index">{{tag}}</li>
          </ol>
        </div>
      </li>
      <li v-show="$route.query.joint" class="system">
        <div class="left"><img src="~@/assets/img/maintain/shqx-head.png"/></div>
        <div class="right">
          <div class="name">上海汽修平台<span>系统评分</span></div>
          <div class="avg">
            <img src="~@/assets/img/maintain/score_yellow.png"  v-for="index in 3" :key="'yellow'+index">
            <img src="~@/assets/img/maintain/score_gray.png"  v-for="index in 2" :key="'gray'+index">
            3分
          </div>
          <div class="msg">该企业已根据相关法律法规和政策完成《汽车维修电子健康档案系统》对接，因此设置该默认评分。</div>
        </div>
      </li>
    </ul>
    <div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
  </mt-loadmore>
</div>
</template>

<script>
  import { Toast} from 'mint-ui'
	export default {
		name: "maintain-remark",
    data(){
      return{
        page: 1,
        list: [],
        allLoaded: false
      }
		},
    created(){
      this.getList(false)
    },
    methods:{
      loadBottom(){
        this.page++
        this.getList(true)
      },
		  getList(flag){
		    let self=this

			  this.axiosQixiu.get('/comment/maintain/query/companyId?size=10&page='+(this.page-1)+'&companyId='+this.$route.query.id).then( (res) => {

				  self.list=self.list.concat(res.data.content)
				  // self.list=res.data.comments
				  if(self.list.length>=res.data.totalElements){
					  self.allLoaded=true
				  }
				  if(flag) self.$refs.loadmore.onBottomLoaded()
			  })

			  this.axiosQixiu.get('/review/shop/cartalk_hxx/query/companyCode',{params:{
					  companyCode: this.code,
					  platform: 'cartalk_hxx',
					  page: this.page-1
				  }}).then( (res) => {
				  self.list=self.list.concat(res.data.content)
				  // self.list=res.data.comments
				  if(self.list.length>=res.data.totalElements){
					  self.allLoaded=true
				  }
				  if(flag) self.$refs.loadmore.onBottomLoaded()
			  })
      },
      hide( content) {
        return content.substr(0,2)+"****"+content.substr(content.length-1,1)
      }
    }
}
</script>

<style scoped lang='less'>
/*.content1{*/
  /*li{*/
    /*background-color: white;*/
    /*margin-bottom: 15px;*/
    /*padding: 0 15px 15px 15px;*/
    /*font-weight: 200;*/
    /*.head{*/
      /*font-size: 16px;*/
      /*height: 40px;*/
      /*line-height: 40px;*/
      /*border-bottom: 1px solid #eeeeee;*/
      /*margin-bottom: 10px;*/
      /*position: relative;*/
      /*span{*/
        /*position: absolute;*/
        /*right: 0;*/
        /*em{*/
          /*font-style: normal;*/
          /*color: #ff9738;*/
        /*}*/
      /*}*/
    /*}*/
    /*.info{*/
      /*font-size: 12px;*/
      /*!*height: 30px;*!*/
      /*line-height: 30px;*/
    /*}*/
  /*}*/
  /*li:last-child{*/
    /*margin-bottom: 0;*/
  /*}*/
/*}*/
.content{
  padding: 0 15px;
  li:last-child{
    border: 0;
  }
  >li{
    position: relative;
    padding: 5px 0;
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
          width: 12px;
          float: left;
          margin-right: 3px;
          margin-top: 4px;
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
  .system{
    .name span{
      color: #e4e4e4!important;
      font-size: 12px;
    }
    .msg{
      margin-top: 5px ;
      font-size: 12px;
      color: #c4c4c4;
    }
  }

}
</style>
