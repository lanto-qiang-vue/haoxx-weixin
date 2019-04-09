<template>
<div id="compDetail" v-show="compId">
	<slide-bar :pageLocation="[ 1, 1000 ]"
			:minHeight="minHeight" :toLocation="toMaintainDetailLocation" @bodyHeight="height= $event;calcHeight" ref="slideBar" @toLocation="toMaintainDetailLocation= $event" :bottom="50">
<div>
<img class="close" @click="closeDetail" src="~@/assets/img/maintain/关闭.png" />
<div class="info" >
  <div class="head">{{all.name}}<span :class="{rest: !isOpenTime}">{{isOpenTime?'营业中': '休息中'}}</span></div>
  <div class="text address">{{all.addr}}</div>
  <div class="avg">
    <img src="~@/assets/img/maintain/score_yellow.png"  v-for="index in parseInt(all.rating)||0" :key="'yellow'+index">
    <img src="~@/assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(all.rating))||0" :key="'gray'+index">
    {{all.rating?all.rating+'分':'暂无评分'}}
  </div>
  <div class="text">特约维修：{{all.brand}}</div>
  <div class="text">经营范围：{{all.bizScope}}</div>
  <div class="button">
    <router-link tag="div" :to="{path: '/carOwner-centre/appointment', query: {id: this.compId} }">
      <span class="yuyue">预约服务</span></router-link>
    <!--<router-link tag="div" :to="{path: '/carOwner-centre/visitService', query: {id: id} }">-->
      <!--<span class="shangmeng">上门服务</span></router-link>-->
    <router-link tag="div" :to="{ path : '/remarkMatch', query: { corpId: this.compId }}">
      <span class="dianping">点评</span></router-link>
    <div v-show="all.tel" ><a class="lianxi" :href="'tel:'+ all.tel">联系</a></div>
    <div v-show="!all.tel"><a class="lianxi" @click="noTal">联系</a></div>
  </div>
</div>
<div class="list" :style="{height: listHeight+'px'}">
  <div id="list">
    <div class="img">
      <img :src="all.pic||'/img/maintain/shqxwbig.png'"/>
      <!--<img @click="small();$emit('back')" class="back" src="~@/assets/img/maintain/back.png" />-->
    </div>
    <div class="head">累计评论（{{(comment.totalElements||0)+1}}条）
      <router-link tag="a" :to="{path: '/maintainRemark', query: {id: this.compId, joint: all.joint} }">
        <img src="~@/assets/img/maintain/箭头.png"/>
      </router-link>
    </div>
    <div class="tag"><span v-for="(item, index) in all.companyShowWors" :key="index">{{item}}</span></div>
    <ul>
      <li v-show="!all.joint" class="system">
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
      <li v-for="(item, index) in comment.content" :key="index">
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
      <li v-show="all.joint" class="system">
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
  </div>

</div>

</div>
	</slide-bar>
	<!--<maintain-bottom  @openMap="sheetVisible=true;companyDetail=$event" @toLocation="toMaintainDetailLocation= $event"-->
	<!--:location="toMaintainDetailLocation"></maintain-bottom>-->
	<mt-actionsheet
			style="z-index: 16"
			:actions="actions"
			v-model="sheetVisible">
	</mt-actionsheet>

	<div class="detail-bottom">
		<div class="lookall" v-show="toMaintainDetailLocation==0" @click="toMaintainDetailLocation=1">查看详情</div>
		<div class="lookmap" v-show="toMaintainDetailLocation==1" @click="toMaintainDetailLocation=0">显示地图</div>
		<div class="gps" @click="sheetVisible=true">导航</div>
		<div class="distance">距离您 {{distance.toFixed(1)}}km</div>
	</div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
import SlideBar from '@/views/service-map/SlideBar'
// import maintainBottom from '@/views/service-map/maintainBottom'
export default {
  name: "mantain-detail",
	components:{SlideBar,},
  // props: ['id','distance', 'random', 'searchCompanyType', 'showDetail', 'height'],
  // props: ['height'],
  data() {
	  let _this  = this
    return {
      all: {},

      opacity: 1,

      comment:{},

	    actions: [{
		    name: '高德地图',
		    method(){
			    let name= _this.all.name
			    window.location.href = `http://uri.amap.com/marker?position=${_this.all.lon},${_this.all.lat}&name=${name}&src=上海汽修平台&coordinate=wgs84&callnative=1`
		    }
	    }, {
			    name: '百度地图',
			    method(){
				    let name= _this.all.name
				    let address= _this.all.addr
				    // window.location.href = `http://api.map.baidu.com/marker?location=${_this.all.lat},${_this.all.lon}&title=${name}&content=${address}&output=html&src=上海汽修平台`
				    window.location.href = `http://api.map.baidu.com/marker?location=${_this.all.lat},${_this.all.lon}&title=${name}&content=${address}&output=html&src=webapp.baidu.openAPIdemo`
				    // window.location.href = `http://api.map.baidu.com/geocoder?address=${address}&output=html&src=上海汽修平台`
			    }
		    }],
	    sheetVisible: false,
	    height: 300,
      listHeight: 300,
	    minHeight: 0,
	    toMaintainDetailLocation: 0,
    }
  },
  computed: {
	distance(){
		return this.$route.query.distance? parseFloat(this.$route.query.distance): 0
	},
	  compId(){
      return this.$route.query.compId
    },
	  isOpenTime(){
		  console.log('isOpenTime')
		  let sTime=0, eTime=0, now=0;
		  if(!this.all.openHours) return true
		  let timeStrs= this.all.openHours.replace(/~/g,'-')
		  timeStrs= timeStrs.replace(/ /g,'')
		  timeStrs= timeStrs.replace(/：/g,':')
		  timeStrs= timeStrs.replace(/;/g,':')
		  console.log(timeStrs)
		  if(timeStrs.indexOf('-')<0 ||timeStrs.indexOf(':')<0) return true
		  sTime= parseInt(timeStrs.split('-')[0].split(':')[0])*60+ parseInt(timeStrs.split('-')[0].split(':')[1])
		  eTime= parseInt(timeStrs.split('-')[1].split(':')[0])*60+ parseInt(timeStrs.split('-')[1].split(':')[1])
		  now= (new Date()).getHours()* 60+ (new Date()).getMinutes()
		  // console.log(sTime, eTime, now)
		  if(sTime <= now && now<= eTime) return true
		  else return false
	  },
  },
	watch: {
		compId(id){
			if(id){
				this.getData()
			}
		},
	    height(val){
	      this.calcHeight(val)
	    },
	},

  mounted(){
    if(this.compId) this.getData()
    $(".list").bind('touchmove',function(e){
      e.stopPropagation();
    })

  },
  methods:{
	  showBlock(){
		  let compId= this.$route.query.compId
		  if(compId){

		  }
	  },
    noscroll(evt) {
      if(!evt._isScroller) {
        evt.preventDefault();
      }
    },
    getData(){
	    this.axiosQixiu({
		    method: 'get',
		    baseURL: '/repair-proxy',
		    url: '/micro/search/company/repair/'+ this.compId,
	    }).then(res => {
		    this.all=res.data
		    setTimeout( ()=> {

			    this.minHeight= $("#compDetail .info").outerHeight()
			    // this.$refs.slideBar.setHeight(this.minHeight)
			    this.toMaintainDetailLocation= 0
				console.log('this.minHeight', this.minHeight)
		    },50)
		    this.$emit('goMap', {lon: res.data.lon, lat: res.data.lat})
	    })

	    this.axiosQixiu.get('/comment/maintain/query/companyId?size=10&page=0&companyId='+this.compId).then( (res) => {
			    let data=res.data;
			    // this.total=res.data.totalElements;
		    // for (let i in data.content){
			 //    // if(res.data.comments[i].openId)
			 //    //   self.getimg(res.data.comments[i].openId)
			 //    if(data.content[i].userInfo){
				//     let img= JSON.parse(data.content[i].userInfo).headimgurl
				//     if(img) data.content[i].headimgurl= img
			 //    }
		    // }
		    this.comment= data
	    })

    },
    calcHeight(height){
      let lh= parseInt(height - (document.querySelector("#compDetail .info")?document.querySelector("#compDetail .info").offsetHeight: 0))
      this.listHeight= (lh<0 ? 0 : lh)
    },
    closeDetail(){
      // this.$store.commit('setSlideShowBody', 'maintainList')
	    this.$router.go(-1)
    },
    showAll(show){
      if(show){
        this.translateY=0
        $("#compDetail").scrollTop(0)
      }else this.small()
    },

    formatStatus(st) {
      switch (st){
        case 1: return "营业"; break;
        case 2: return "停业"; break;
        case 3: return "注销"; break;
        case 4: return "空壳"; break;
      }
    },

    hide( content) {
      return content.substr(0,2)+"****"+content.substr(content.length-1,1)
    },
    noTal(){
      Toast('暂无联系方式')
    }
  }
}
</script>

<style scoped lang='less'>
  @blue-color: #008bff;
#compDetail{
  width: 100%;
  /*height: 100vh;*/
  overflow: visible;
  /*position: fixed;*/
  left: 0;
  top: 0;
  z-index: 20;
  background-color: white;
  transition: all 0.3s;
  /*position: relative;*/
  /*padding: 0 15px;*/
  .close{
    position: absolute;
    top: 6px;
    right: 6px;
    width: 26px;
    z-index: 1;
  }
  .info {
    padding: 0 15px;
    .head{
      font-size: 20px;
      padding-right: 35px;
      position: relative;
      span{
        font-weight: 300;
        font-size: 12px;
        line-height: 19px;
        padding: 0 4px;
        color: white;
        background-color: @blue-color;
        border-radius: 2px;
        vertical-align: top;
        white-space:nowrap;
      }
      span.rest{
        background-color: #bebec0;
      }
      a{
        width: 30px;
        height: 20px;
        padding-left: 5px;
        display: block;
        border-left: 1px solid #dddddd;
        position: absolute;
        right: 0;
        top: 0;
        background: url("~@/assets/img/maintain/phone.png") no-repeat right center;
        background-size: 20px;
      }
    }
    .text{
      font-size: 13px;
      color: #666666;
      /*font-weight: 300;*/
      margin-top: 5px;

    }
    .address{
      padding-left: 16px;
      background: url("~@/assets/img/maintain/区域2.png") no-repeat left center;
      background-size: 10px;
    }
    .avg{
      margin-top: 5px;
      font-size: 12px;
      color: #999999;
      img{
        width: 15px;
        float: left;
        margin-right: 3px;
        margin-top: 3px;
      }
    }
    .button{
      border-top: 1px solid #eeeeee;
      overflow: hidden;
      >div{
        width: 33%;
        float: left;
        text-align: center;
        height: 40px;
        line-height: 40px;
        /*font-weight: 300;*/
        font-size: 14px;
        span,a{
          padding-left: 15px;
        }
        .yuyue{
          background: url("~@/assets/img/maintain/预约服务.png") no-repeat left center;
          background-size: 13px;
        }
        .shangmeng{
          background: url("~@/assets/img/maintain/上门服务.png") no-repeat left center;
          background-size: 13px;
        }
        .dianping{
          background: url("~@/assets/img/maintain/点评.png") no-repeat left center;
          background-size: 13px;
        }
        .lianxi{
          background: url("~@/assets/img/maintain/phone2.png") no-repeat left center;
          background-size: 10px;
          color: black;
        }
      }
      div:first-child{
        text-align: left;
      }
      div:last-child{
        text-align: right;
      }
    }
  }

  .list{
    padding: 0 15px;
    overflow: auto;
    border-top: 10px solid #f8f8f8;
    /*border-top: 10px solid #f8f8f8;*/
    .img {
      position: relative;
      padding: 10px 15px;
      img{
        width: 100%;
        border-radius: 4px;
      }
      .back{
        position: absolute;
        left: 15px;
        top: 15px;
        width: 35px;
        height: 35px;
      }
    }
    .head{
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      font-weight: 300;
      /*margin-top: 5px;*/
      img{
        float: right;
        width: 15px;
        padding: 7px 0 7px 7px;
      }
    }
    .tag{
      margin-top: 5px;
      span{
        display: inline-block;
        font-size: 14px;
        padding: 2px 12px;
        color: #666666;
        border: 1px solid #bdbdbd;
        border-radius: 5px;
        margin: 0 5px 5px 0;
      }
    }
    ul{
      margin-top: 10px;
      /*margin-bottom: 50px;*/
      li:last-child{
        border: 0;
      }
      li{
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
  }
  .bottom{
    position: fixed;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-top: 1px solid #eeeeee;
    font-size: 14px;
    z-index: 10;
    .lookall{
      padding-left: 20px;
      background: url("~@/assets/img/maintain/detail.png") no-repeat left center;
      display: inline-block;
      background-size: 15px;
    }
    .lookmap{
      padding-left: 20px;
      background: url("~@/assets/img/maintain/map.png") no-repeat left center;
      display: inline-block;
      background-size: 15px;
    }
    .gps{
      color: white;
      float: right;
      padding: 0 15px 0 35px;
      /*background-color: #438eff;*/
      border-radius: 10px;
      background: #438eff url("~@/assets/img/maintain/mile.png") no-repeat 15px center;
      background-size: 15px;
      line-height: 30px;
      height: 30px;
      margin-top: 10px;
    }
    .distance{
      float: right;
      margin: 0 5px;
    }
  }
	.detail-bottom{
		position: fixed;
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding: 0 15px;
		left: 0;
		bottom: 0;
		background-color: white;
		border-top: 1px solid #eeeeee;
		font-size: 14px;
		z-index: 16;
		.lookall{
			padding-left: 20px;
			background: url("~@/assets/img/maintain/detail.png") no-repeat left center;
			display: inline-block;
			background-size: 15px;
		}
		.lookmap{
			padding-left: 20px;
			background: url("~@/assets/img/maintain/map.png") no-repeat left center;
			display: inline-block;
			background-size: 15px;
		}
		.gps{
			color: white;
			float: right;
			padding: 0 15px 0 35px;
			/*background-color: #438eff;*/
			border-radius: 10px;
			background: #438eff url("~@/assets/img/maintain/mile.png") no-repeat 15px center;
			background-size: 15px;
			line-height: 30px;
			height: 30px;
			margin-top: 10px;
		}
		.distance{
			float: right;
			margin: 0 5px;
		}
	}
}
</style>

