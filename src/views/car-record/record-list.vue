<template>
  <div id="recoList">
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">

      <div class="basinfo">
        <div class="title"><img src="/img/car-record/repairinfo.png"/><span>维修信息</span></div>
        <ul class="info thick" v-for='(item, index) in info' :key='index'>
          <li><span>维修企业</span><p>{{ item.companyName }}</p></li>
          <li><span>送修日期</span><p>{{ item.repairDate }}</p></li>
          <li><span>送修里程</span><p>{{ item.repairMileage }}公里</p></li>
          <div class="more" @click="goVehicleDetail(item.id, item.companyId, item.plateNumber)"><span>详情</span><i></i></div>
          <span v-show="!item.gray" @click="goRemark(item.id, item.companyId, item.plateNumber)">我要评价</span>
          <span v-show="item.gray" class="gray" @click="goRemarkDetail(item.commentId)">查看评价</span>
        </ul>
        <div class="more_loading" v-show="showLoading">
          <mt-spinner type="fading-circle" color="#00ccff" :size="25" v-show="true"></mt-spinner>
        </div>
        <div class="noMoreData" v-show="!lastPage">暂无更多数据...</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast, InfiniteScroll } from "mint-ui"
  export default {
    data(){
      return{
        info: [],
        info2: [],
        pageNo: 1,
        showLoading: false,
        lastPage: false,
        formatManufacturedate: '',
        formatRegisterdate: '',
        times: 0
      }
    },
    created() {
      // 基本信息

      this.axiosQixiu({
        method: 'post',
        url: '/vehicle/carfile/query',
        data: {
        	"companyName":"","pageNo":1,"pageSize":100,
	        "vehicleplatenumber":this.$route.query.vehicleplatenumber,
	        "vin":this.$route.query.id
        }
      }).then(res=>{

        this.info2=res.data.items;
        for(let i in this.info2){
          this.getRemark(this.info2[i].id, i)
        }
      })
    },
    methods: {
      getRemark(repairId, index){
        this.axiosQixiu({
          method: 'get',
          url: '/comment/maintain/query/repairId?repairId='+ repairId,
        }).then(res=>{
          // console.log(res);

            if(res.data.id){
              this.info2[index].gray= true
              this.info2[index].commentId= res.data.id
              // console.log(this.info2)
            }else{
              this.info2[index].gray= false
            }
            this.times++
            if(this.times==this.info2.length) this.info=this.info2

        })
      },
      goRemarkDetail(id){
        this.$router.push({path:'/remark-detail', query:{id: id}})
      },
      goRemark(repairbasicinfoId, companyId, vehicleplatenumber){
        // this.axiosQixiu({
        //   url: '/company/review/isExistUnreviewRepairBasicInfo',
        //   method: 'post',
        //   headers: {'Content-type': 'application/json'},
        //   data: JSON.stringify({
        //     accessToken: localStorage.getItem("ACCESSTOKEN"),
        //     companyId
        //   })
        // }).then(res=>{
        //   if(res.data.data.result){
        //     this.$router.push({
        //       path: '/remark',
        //       query: {corpId:companyId}
        //     })
        //   }else{
        //     Toast("未找到您在该企业未评价的维修记录")
        //   }
        // })

        // this.$router.push({
        //   path:'/vehicleDetail-carOwner',
        //   query: {repairbasicinfoId, companyId, show: 'yes'}
        // })

        // this.$router.push({path: '/remarkMatch', query: { corpId: companyId, repairId: repairbasicinfoId, vehicleplatenumber: vehicleplatenumber,show: 'yes'}})
        this.$router.push({path: '/record-detail', query: { repairbasicinfoId, companyId ,vehicleplatenumber,show: 'yes'}})
      },
      goVehicleDetail(repairbasicinfoId, companyId,vehicleplatenumber) {
        this.$router.push({
          path:'/record-detail',
          query: {repairbasicinfoId, companyId, vehicleplatenumber}
        })
      },
      loadMore(){

      },
    }
  }
</script>

<style scoped lang='less' scoped>
  #recoList {
    height: 100vh;
    overflow: scroll;
    background-color: #f8f8f8;
    .basinfo{
      width: 100%;
      /*border-top: 10px solid #f8f8f8;*/
      background-color: #fff;
      .title{
        width: 100%;
        border-bottom: 1px solid #f8f8f8;
        height: 30px;
        overflow: hidden;
        img{
          width: 15px;
          margin-top: 7px;
          margin-left: 10px;
        }
        span{
          font-size: 16px;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          margin-left: 5px;
        }
      }
      .info{
        padding-left: 30px;
        margin: 0;
        position: relative;
        >span {
          position: absolute;
          right: 8px;
          bottom: 4px;
          color: #3486ff;
          font-size: 14px;
          border: 1px solid #3486ff;
          padding: 3px 5px;
          background: rgba(220,220,220,.2);
        }
        .gray{
          color: black;
          border-color: black;
        }
        li{
          height: 35px;
          line-height: 35px;
          width: 100%;
          border-bottom: 1px solid #f8f8f8;
          font-size: 14px;
          /*overflow: hidden;*/
          position: relative;
          i{
            color:red;
            position: absolute;
            left: -8px;
          }
          span{
            width: 90px;
            display: inline-block;
          }
          p{
            display: inline;
          }
        }
        li:nth-child(1) {
          padding-right: 38px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      .thick{
        border-top: 5px solid #f8f8f8;
        position: relative;
        .more{
          font-size: 14px;
          color: #3486ff;
          position: absolute;
          height: 35px;
          line-height: 35px;
          top: 0;
          right: 10px;
          i{
            display: inline-block;
            border-right: 1px solid;
            border-bottom: 1px solid;
            width: 10px;
            height: 10px;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            color: #3486ff;
          }
        }
      }
      >.more_loading {
        padding-left: calc(50% - 13px);
      }
      .noMoreData {
        text-align: center;
        font-size: 15px;
        color: #999;
        line-height: 30px;
      }
    }
  }
</style>
