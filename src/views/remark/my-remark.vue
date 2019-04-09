<template>
<div style="height: 100vh;overflow: auto;background-color: #f8f8f8;" id="my-remark">
  <!--<mt-header title="我的点评" style="position: fixed;top: 0;width: 100%;z-index: 100"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>-->
  <!--<mt-navbar v-model="selected" style="position: fixed;top: 0;width: 100%;z-index: 100">-->
    <!--<mt-tab-item id="1">根据车牌号评价</mt-tab-item>-->
    <!--<mt-tab-item id="2">根据维修记录评价</mt-tab-item>-->
  <!--</mt-navbar>-->
  <!--<mt-tab-container v-model="selected">-->
    <!--<mt-tab-container-item id="1">-->
      <!--<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">-->
        <!--<ul class="content" style="margin-top: 55px">-->
          <!--<li @click="click(item.repairState, item.id, item.hasComplaint, item.level)" v-for="(item, index) in list" :key="index">-->
            <!--<div class="head">点评日期：{{item.createTime | FormatDate}} <span>评分：<em>{{item.userAvgScore}}</em></span></div>-->
            <!--<img v-show="item.repairState=='无效点评'" src="../../assets/img/remark/无效信息.png"/>-->
            <!--<img v-show="item.repairState=='有效点评'&& item.level==0" src="../../assets/img/remark/过期信息.png"/>-->
            <!--<div class="info">评分详情：-->
              <!--履约：{{item.keepAppointment}}-->
              <!--态度：{{item.attitude}}-->
              <!--质量：{{item.quailty}}-->
              <!--速度：{{item.speed}}-->
              <!--价格：{{item.price}}-->
            <!--</div>-->
            <!--<div class="info">门店名称：{{item.companyName}}</div>-->
            <!--<div class="info">门店地址：{{item.companyAddress}}</div>-->
            <!--<div class="info">维修车牌：{{item.vehicleNum}}</div>-->
            <!--<div v-show="item.hasComplaint" class="complainted">已反馈</div>-->
          <!--</li>-->
        <!--</ul>-->
        <!--<div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">没有更多啦...</div>-->
      <!--</mt-loadmore>-->
    <!--</mt-tab-container-item>-->
    <!--<mt-tab-container-item id="2">-->

      <!--<mt-loadmore :bottom-method="loadBottom2" :bottom-all-loaded="allLoaded2" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore2">-->
        <!--<ul class="content" style="margin-top: 55px">-->
          <!--<li @click="click2(item.id)" v-for="(item, index) in list2" :key="index">-->
            <!--<div class="head">点评日期：{{item.createTime | FormatDate}} <span>评分：<em>{{item.userAvgScore}}</em></span></div>-->
            <!--&lt;!&ndash;<img v-show="item.repairState=='无效点评'" src="../../assets/img/remark/无效信息.png"/>&ndash;&gt;-->
            <!--&lt;!&ndash;<img v-show="item.repairState=='有效点评'&& item.level==0" src="../../assets/img/remark/过期信息.png"/>&ndash;&gt;-->
            <!--<div class="info">评分详情：-->
              <!--履约：{{item.keepAppointment}}-->
              <!--态度：{{item.attitude}}-->
              <!--质量：{{item.quailty}}-->
              <!--速度：{{item.speed}}-->
              <!--价格：{{item.price}}-->
            <!--</div>-->
            <!--<div class="info">门店名称：{{item.companyName}}</div>-->
            <!--<div class="info">门店地址：{{item.companyAddress}}</div>-->
            <!--<div class="info">维修车牌：{{item.vehicleNum}}</div>-->
            <!--&lt;!&ndash;<div v-show="item.hasComplaint" class="complainted">已反馈</div>&ndash;&gt;-->
          <!--</li>-->
        <!--</ul>-->
        <!--<div v-show="allLoaded2" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">没有更多啦...</div>-->
      <!--</mt-loadmore>-->
    <!--</mt-tab-container-item>-->
  <!--</mt-tab-container>-->

	<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">
		<ul class="content">
			<li @click="click(item.id, item.pass,  item.status, item.hasComplaint)" v-for="(item, index) in list" :key="index">
				<div class="head">点评日期：{{item.createDate | FormatDate}} <span>评分：<em>{{item.avgScore}}</em></span></div>
				<img v-show="item.status &&item.status.toString()=='1'" src="../../assets/img/remark/无效信息.png"/>
				<div class="info">评分详情：
					履约：{{item.keepAppointment}}
					态度：{{item.attitude}}
					质量：{{item.quailty}}
					速度：{{item.speed}}
					价格：{{item.price}}
				</div>
				<div class="info">门店名称：{{item.companyName}}</div>
				<div class="info">门店地址：{{item.companyAddress}}</div>
				<div class="info">维修车牌：{{item.vehicleNum}}</div>
				<div v-show="item.hasComplaint" class="complainted">已反馈</div>
			</li>
		</ul>
		<div v-show="allLoaded" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">没有更多啦...</div>
	</mt-loadmore>



</div>
</template>

<script>
  import { Toast, MessageBox} from 'mint-ui'
	export default {
		name: "my-remark",
    data(){
      return{
        selected: '1',

        userId: '',
        page: 1,
        list: [],
        allLoaded: false,

        page2: 1,
        list2: [],
        allLoaded2: false
      }
		},
    created(){
      this.userId=JSON.parse(localStorage.getItem("USERINFO")).userId
      this.getList(false)
      // this.getList2(false)
    },
    methods:{
      loadBottom(){
        this.page++
        this.getList(true)
      },
      loadBottom2(){
        this.page2++
        this.getList2(true)
      },
	  getList(flag){
		    let self=this
		  let page=this.page-1;
        this.axios({
          method: 'get',
          url: '/comment/maintain/query/userId?size=10&page='+page,
        }).then(res => {
            // console.log(res.data)
            if(res.data.content&&res.data.content.length){
              self.list=self.list.concat(res.data.content)
              // self.list=res.data.comments
              if(self.list.length>=res.data.totalElements){
                self.allLoaded=true
              }
              if(flag) self.$refs.loadmore.onBottomLoaded()
            }else{
              self.allLoaded=true
            }


        })
      },
      getList2(flag){
        let self=this
        this.axios({
          method: 'post',
          url: '/comment/getComments/repair?accessToken='+ localStorage.getItem("ACCESSTOKEN"),
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify({
            userId: this.userId,
            page: this.page2,
            pageSize: 10,
          })
        }).then(res => {
          if(res.data.code=='0'){
            // console.log(res.data)
            if(res.data.comments&&res.data.comments.length){
              self.list2=self.list2.concat(res.data.comments)
              // self.list=res.data.comments
              if(self.list2.length>=res.data.count){
                self.allLoaded2=true
              }
              if(flag) self.$refs.loadmore2.onBottomLoaded()
            }else{
              self.allLoaded2=true
            }

          } else{
            Toast(res.data.status);
          }

        })
      },
      click(id, pass, status, hasComplaint){
        let self= this
        // if(status!='无效点评')
        if(status.toString()!='1'){
	         this.$router.push({path:'/remarkDetail', query:{id: id}})
        } else{
			if(hasComplaint) {
				// this.$router.push({path:'/myComplaint'})
				this.$router.push({path:'/remarkDetail', query:{id: id,
						// complaint: 'yes'
				}})
			}else{
				MessageBox({
					title: '点评无效',
					message: '很遗憾，系统未查到您的维修记录，本次点评无效。您可点击反馈，向管理部门和维修企业反馈维修记录未能及时正确上传的情况。',
					showCancelButton: true,
					confirmButtonText: '反馈'
				}).then(action => {
					if(action=='confirm')
						self.$router.push({path:'/upComplain', query:{id: id}})
					// console.log(action)
				})
			}

        }

      },
      click2(id){
        this.$router.push({path:'/remarkDetail', query:{id: id}})
      }
    }
	}
</script>

<style scoped lang='less'>
.content{
  li{
    background-color: white;
    margin-bottom: 15px;
    padding: 0 15px;
    font-weight: 200;
    position: relative;
    .head{
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eeeeee;
      margin-bottom: 10px;
      position: relative;
      span{
        position: absolute;
        right: 0;
        em{
          font-style: normal;
          color: #ff9738;
        }
      }
    }
    .info{
      font-size: 12px;
      /*height: 30px;*/
      line-height: 30px;
      z-index: 1;
      position: relative;
    }
    img{
      position: absolute;
      width: 100px;
      padding-top: 40px;
      top: 0;
      bottom: 0;
      right: 15px;
      margin: auto 0;
      /*opacity: .7;*/
      z-index: 0;
    }
    .complainted{
      color: white;
      position: absolute;
      right: 15px;
      bottom: 5px;
      padding: 5px;
      background-color: green;
    }
  }
  li:last-child{
    margin-bottom: 0;
  }

}

</style>
<style>
  .mint-msgbox-message{
    font-size: 13px;
    color: black;
    /*font-weight: 300;*/
    line-height: 25px;
  }
</style>

