<template>
<div style="height: 100vh;overflow: auto;background-color: #f8f8f8;" class="my-remark">
	<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="上拉加载更多"  topLoadingText="更新中" ref="loadmore">
		<ul class="content">
			<li @click="click(item.id, item.pass,  item.status, item.hasComplaint)" v-for="(item, index) in list" :key="index">
				<div class="head">点评日期：{{item.createDate | FormatDate}} <span>评分：<em>{{item.avgScore}}</em></span></div>
				<img v-show="item.status &&item.status.toString()=='1'" src="/img/remark/无效信息.png"/>
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
        userId: '',
        page: 1,
        list: [],
        allLoaded: false,
      }
		},
    created(){
      this.getList(false)
      // this.getList2(false)
    },
    methods:{
      loadBottom(){
        this.page++
        this.getList(true)
      },
	  getList(flag){
        this.axiosQixiu.get('/review/shop/cartalk_hxx/query/userId',{params:{
		        page: this.page-1,
		        platform: 'cartalk_hxx'
	        },hxxtoken: true}).then(res => {
            // console.log(res.data)
            if(res.data.content&&res.data.content.length){
              this.list=this.list.concat(res.data.content)
              // this.list=res.data.comments
              if(this.list.length>=res.data.totalElements){
                this.allLoaded=true
              }
              if(flag) this.$refs.loadmore.onBottomLoaded()
            }else{
              this.allLoaded=true
            }


        })
      },
      click(id, pass, status, hasComplaint){
        let self= this
        // if(status!='无效点评')
        if(status.toString()!='1'){
	         this.$router.push({path:'/remark-detail', query:{id: id}})
        } else{
			if(hasComplaint) {
				// this.$router.push({path:'/myComplaint'})
				this.$router.push({path:'/remark-detail', query:{id: id,
						// complaint: 'yes'
				}})
			}else{
				// MessageBox({
				// 	title: '点评无效',
				// 	message: '很遗憾，系统未查到您的维修记录，本次点评无效。您可点击反馈，向管理部门和维修企业反馈维修记录未能及时正确上传的情况。',
				// 	showCancelButton: true,
				// 	confirmButtonText: '反馈'
				// }).then(action => {
				// 	if(action=='confirm')
				// 		self.$router.push({path:'/upComplain', query:{id: id}})
				// 	// console.log(action)
				// })
			}

        }

      },
      click2(id){
        this.$router.push({path:'/remark-detail', query:{id: id}})
      }
    }
	}
</script>

<style scoped lang='less'>
.my-remark{


.content{
  li{
    background-color: white;
    margin-bottom: 15px;
    padding: 0 15px;
    /*font-weight: 200;*/
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

