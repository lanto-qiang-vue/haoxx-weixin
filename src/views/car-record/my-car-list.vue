<template>
  <div id="carList">
    <div class='search'>
      <form action="javascript:return true;">
        <input type="search" placeholder="搜索车牌号码" class="mui-input-clear" v-model='vehicleplatenumber' @keydown="key($event)" style="padding-left: 35px; text-indent: 0;">
      </form>
    </div>
      <div class="carList">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" bottomPullText="加载更多"  ref="loadmore">
          <ul>
            <li @click="goRecordList(item.vin, item.status, item.vehicleplatenumber, item.id, item.ownerType)" class="block mui-table-view-cell mui-transitioning" v-for='(item, index) in carList' :key='index'>
              <!--<div class="mui-slider-right mui-disabled">-->
                <!--<a class="mui-btn mui-btn-red" style="transform: translate(0px, 0px);" v-if="item.binds&&item.binds.length" @click.stop.prevent="removeAuthorize(item.binds)">解除授权</a>-->
                <!--<a class="mui-btn mui-btn-yellow" style="transform: translate(0px, 0px);" @click.stop="deleteVehicle(item.vehicleId)">解绑车辆</a>-->
              <!--</div>-->
              <div class="mui-slider-handle" style="transform: translate(0px, 0px);">
                <div class="title">
                  <img style="width: 15px; height: 15px;" src="~@/assets/img//record/list.png"/>
                  <span>{{ item.vehicleplatenumber }}</span>
                  <img class="arrow" src="~@/assets/img//my/right-arrow.png" width="7px" height="14px">
	                <span class="status" :style="'color:'+showStatus(item.status).color">
	                    {{ showStatus(item.status).text}}</span>
                </div>
                <div class="info">
                  <p>
                    <!--<mt-button size="small" @click.stop="deleteVehicle(item.vehicleId)" type="danger" style="height: 24px; right: 0; top: 3px; font-size: 10px; position: absolute; width: 50px;">解绑</mt-button>-->
                    <span class="text-one-cut" style="display: block; margin-right: 30px;">车架号(VIN)：{{ item.vin }}</span>
                  </p>
                </div>
              </div>
	            <div class="remove">
		            <div class="button" @click.stop.prevent="deleteVehicle(item.id)">解绑</div>
		            <div class="button" v-if="item.self &&item.binds && item.binds.length"
		                 @click.stop.prevent="removeAuthorize(item.binds, item.vehicleplatenumber)">解除授权</div>
	            </div>

            </li>
          </ul>
        </mt-loadmore>
      </div>


    <mt-button @click="sheetVisible=!sheetVisible" type="primary" class="add_car" size="large">新增绑定车辆</mt-button>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
	  <mt-actionsheet
			  :actions="actions2"
			  v-model="sheetVisible2">
	  </mt-actionsheet>
    <mt-popup
      v-model="popupVisible">
      <div style="width: 80vw; border-radius: 3px; max-height: calc(80vh - 40px);">
        <mt-radio
          style="margin-bottom: 8px;"
          v-model="checkedWho"
          align="right"
          :options="authorizers">
        </mt-radio>
        <div style="height: 40px; border-top: 1px solid #ccc;">
          <div class="mint-msgbox-btns">
            <button class="mint-msgbox-btn mint-msgbox-cancel" @click="cancel">取消</button>
            <button class="mint-msgbox-btn mint-msgbox-confirm" @click="confirm">确定</button></div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast, Loadmore, Button, MessageBox, Actionsheet, Popup, Radio } from 'mint-ui'
export default {
  name: 'carList',
  data() {
    let _this = this
    return {
      carList: [],
      lastPage: false,
	    page: 1,
	    limit: 10,
	    total: 0,
      vehicleplatenumber: '',
      loadMoreBtn: false,
      userRoleId: null,
      allLoaded: false,
      sheetVisible: false,
      sheetVisible2: false,
      actions: [{
        name: '绑定本人车辆',
        method(){
          _this.sheetVisible2= true
        }
      }, {
        name: '绑定他人车辆',
        method(){
          _this.$router.push('/carOwner-centre/bind-car/bind-other-car')
        }
      }],
	    actions2: [{
		    name: '个人车辆',
		    method(){
			    _this.$router.push('/bind-my-car')
		    }
	    }, {
		    name: '企业车辆',
		    method(){
			    _this.$router.push('/bind-my-car-com')
		    }
	    }],
      popupVisible: false,
      checkedWho: '',
      authorizers: [],
      authorizers1: [],
	    removeAuthNo: ''
    }
  },
	mounted() {
		this.getData()
		if(this.$route.query && this.$route.query.showBind){
			this.sheetVisible= true
			history.replaceState(null, null, window.location.origin + window.location.hash.split('?')[0])
		}
	},
  methods: {
    goRecordList(vin, status, vehicleplatenumber, id, ownerType) {
      if(status != 2){

	      this.$router.push({
		      path: ownerType==1? '/bind-my-car': '/bind-my-car-com',
		      query: {id:id}
	      })
        return
      }
      if(vin) {
        this.$router.push({
          path: '/recordList',
          query: {id:vin, vehicleplatenumber: vehicleplatenumber}
        })
      } else {
        Toast('该车暂无维修记录')
      }

    },
	  key(e){
		  if ( e.keyCode == 13 || e=='search') {
			  this.page=1
			  this.carList=[]
			  this.getData()
		  }
	  },
    getData(flag){
	    this.axios.post('/vehicle/owner/queryVehicelist', {
		    "cartype": "",
		    "page": this.page,
		    "pageSize": 10,
		    "vehiclePlateNumber": this.vehicleplatenumber,
	    }).then( (res) => {
		    this.total= res.data.total
		    if(res.data.items&&res.data.items.length){
			    let arr= res.data.items
			    this.carList=this.carList.concat(arr)

			    if(this.carList.length>=res.data.total){
				    this.allLoaded=true
			    }else{
				    this.allLoaded=false
			    }
			    if(flag) this.$refs.loadmore.onBottomLoaded()
		    }else{
			    this.allLoaded=true
		    }
	    })
    },

    // 上拉加载更多
    loadBottom() {
	    this.page++
	    this.getData(true)
    },

	  showStatus(status){
    	let obj={}, sta= status? parseInt(status): null
		  switch (sta){
			  case 1: {
				  obj.text= '待审核'
				  obj.color= 'orange'
				  break
			  }
			  case 2: {
				  obj.text= '审核通过'
				  obj.color= 'green'
				  break
			  }
			  case 3: {
				  obj.text= '审核不通过'
				  obj.color= 'red'
				  break
			  }
		  }
		  return obj
	  },
    // 输入车牌号进行搜索

    deleteVehicle(id) {
      MessageBox.confirm('确定解绑?').then(action => {
        this.axios({
          method: 'post',
          url: '/vehicle/carfile/remove-bind/'+ id,
        }).then(res => {
            if(res.data.code === '0') {
              Toast('解绑成功!');
	            this.page=1
	            this.carList=[]
	            this.getData()
            } else {
              Toast(res.data.status);
            }
          })
      })
    },

    removeAuthorize(data, vehi){
      this.popupVisible = true
      this.authorizers1=data
      this.authorizers=[]
      data.map(item=>{
        this.authorizers.push("解除授权账号:"+item.mobile)
      })
	    this.removeAuthNo= vehi
    },

    cancel(){
      this.popupVisible=!this.popupVisible
    },

    confirm(){
      let _this = this
      this.popupVisible=!this.popupVisible
      let userId= ''
        for(let i = 0; i < _this.authorizers1.length; i++){
          if(_this.authorizers1[i].mobile == _this.checkedWho.split(':')[1]){
	          userId=  _this.authorizers1[i].binduserid
          }
        }

      this.axios({
        method: 'post',
        url: '/scan/relieve',
        data: {
		    "userId": userId,
		    "vehicleNumber": this.removeAuthNo
	    }
      }).then(res=>{
        if(res.data.code==='0'){
          Toast('取消授权成功')
	        this.page=1
	        this.carList=[]
	        this.getData()
        }else {
          Toast(res.data.status)
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
  #carList {
  background-color: #f8f8f8;
  height: 100vh;
  overflow: auto;
  /*position: relative;*/
    .add_car{
      position: fixed; left: 0;bottom: 0; border-radius: 0; border: none; width: 100%;
    }
    .carList{
	    height: 100vh;
      padding: 50px 0 40px 0;
      overflow: auto;
    }
  .search {
    padding: 8px 12px;
    position: fixed;
    width: 100%;
    background: #fff;
    z-index: 10;
    left: 0;
    top: 0;
    form {
      input {
        background: url(~@/assets/img//record/search.png) no-repeat 10px 10px;
        font-size: 14px;
        background-color: #eee;
        background-size: 18px 18px;
        text-indent: 20px;
        border-radius: 5px;
        outline: none;
        border: none;
        width: 100%;
        height: 35px;
        position: relative;
        text-align: left;
        margin-bottom: 0;
      }
      span {
        position: absolute;
        top: 8px;
        right: 12px;
        height: 35px;
        width: 50px;
        line-height: 35px;
        text-align: center;
      }
    }
  }
  .block {
    width: 100%;
    padding: 0 10px;
    border-top: 10px solid #f8f8f8;
    background-color: #fff;
    .title {
      width: 100%;
      border-bottom: 1px solid #f8f8f8;
      height: 30px;
      overflow: hidden;
      img {
        margin-top: 7px;
      }
      .arrow {
        float: right;
      }
      span {
        font-size: 16px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        margin-left: 5px;
      }
	    .status{
			font-size: 12px;
		    margin-right: 5px;
		    float: right;
	    }
    }
    .info {
      padding: 10px 0;
      color: #676767;
      margin: 0;
      p {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        margin-bottom: 0;
        .right {
          float: right;
        }
      }
      form {
         &:after, &:before {
            height: 0;
          }
        font-size: 14px;
        .mui-input-row {
          label {
            padding: 11px 0;
            width: 60px;
          }
          input {
            float: left;
            font-size: 14px;
            padding-left: 10px;
          }
        }
      }
    }
	  .remove{
		  font-size: 12px;
		  position: absolute;
		  right: 10px;
		  bottom: 10px;
		  .button{
			  font-size: 12px;
			  height: 26px;
			  line-height: 26px;
			  padding: 0 6px;
			  margin-left: 5px;
			  border-radius: 5px;
			  color: white;
			  background-color: #ed4014;
		  }
	  }

  }
	  .mui-table-view-cell:after{
		  height: 0;
	  }
}
</style>
