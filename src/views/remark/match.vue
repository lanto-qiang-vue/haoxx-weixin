<template>
<div style="height: 100vh;overflow: auto;">
  <mt-header title="匹配车辆" style="position: fixed;top: 0;width: 100%;z-index: 1"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>
  <img class="compImg" :src="companyDetail.pic||'/static/img/shqxwbig.png'">
  <div class="content" >
    <div class="row">
      <p>{{companyDetail.name}}</p>
      <span style="padding-left: 15px;background-image: url('/static/img/remark/address_gray.png');background-size: 12px auto;background-position: left center;background-repeat: no-repeat">门店地址：{{companyDetail.addr}}</span>
    </div>
    <div class="row" style="margin-bottom: 5px">
      <p>匹配车辆信息</p>
      <!--<span>绑定并注册上海汽修平台，可进行服务点评并查看车辆汽修记录。</span>-->
    </div>
    <div class="row">
      <label>车牌号</label>
      <div class="input">
        <div class="area" style="display: inline-block;font-size: 16px;position: absolute;height: 22px;width: 45px;border-right: 1px solid #bdbdbd" @click="areavisible= true">{{area}}
          <b style="width: 0;height: 0;border-width: 5px;border-style: solid;border-color: black transparent transparent transparent;position: absolute;left: 25px;top: 7px;"></b></div>
        <input placeholder="请输入车牌号" v-model="cardno" @blur="bodyScroll" ref="input" style="padding-left: 50px"/>
      </div>
    </div>
    <!--<div class="row">-->
      <!--<label>手机号</label>-->
      <!--<div class="input">-->
        <!--<input placeholder="请输入手机号" v-model="tel" :readonly="islogin" :class="{readonly: islogin}"/>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="row" v-show="!islogin">-->
      <!--<label>验证码-->
        <!--<em id="code" style="float: right; color: #438eff;font-style: normal" @click="getcode">{{codebutton}}</em>-->
      <!--</label>-->
      <!--<div class="input">-->
        <!--<input placeholder="请输入验证码" v-model="code" />-->
      <!--</div>-->
    <!--</div>-->
    <div id="next" :class="{on: buttonon, button:true}" @click="next">下一步</div>
  </div>

  <!--<pic_verification style="display: none"></pic_verification>-->
  <mt-popup v-model="areavisible"  style="width: 90%" class="areaselect">
    <mt-picker :slots="areaslots" @change="areachange" :showToolbar="true" >
      <div @click="areavisible=false" class="sure">确定</div>
    </mt-picker>
  </mt-popup>

  <mt-popup v-model="remarkvisible" position="right" class="remarkblock">
    <!--<mt-header title="服务点评" style="position: sticky;top: 0;width: 100%;z-index: 100"><mt-button icon="back" slot="left" @click="remarkvisible=false"></mt-button></mt-header>-->
    <div class="remarkhead">
      <h1>您对该门店服务满意吗？</h1>
      <p>以下反馈是匿名的，便于我们记录并沟通改进</p>
      <img src="../../assets/img/remark/chartico.png"/>
    </div>
    <div class="remarkbody">
      <div class="head">{{companyDetail.name|| $route.query.compName}}<em @click="$router.go(-2)">修改</em></div>
      <ul class="remarkstar">
        <li :data-index='index' v-for='(item, index) in satisfaction' :key='index'>
          <div class="left">{{ item.title }}</div>
          <div class="center">
            <img data-index='0' src="/static/img/yellow.png" alt="" @click='chooseLevel($event)'>
            <img data-index='1' src="/static/img/yellow.png" alt="" @click='chooseLevel($event)'>
            <img data-index='2' src="/static/img/yellow.png" alt="" @click='chooseLevel($event)'>
            <img data-index='3' src="/static/img/gray.png" alt="" @click='chooseLevel($event)'>
            <img data-index='4' src="/static/img/gray.png" alt="" @click='chooseLevel($event)'>
          </div>
          <div class="right" id='satisfaction'>一般</div>
        </li>
      </ul>
      <div class="saymore">
        <input v-model="saymore" placeholder="还想再说点什么吗？" readonly="readonly"/>
        <img class="good" @click="remark('good')" src="/static/img/remark/goodon.png"/>
        <img class="bad" @click="remark('bad')" src="/static/img/remark/bad.png"/>
      </div>
      <ul class="tag">
        <li v-for="(item, index) in tags" @click="clicktag(index)" :class="{on: item.checked}">{{item.name}}</li>
      </ul>

      <div id="submit" class="on button" @click="submit">提交点评</div>
    </div>
  </mt-popup>
</div>
</template>

<script>
  import { Toast, Popup, Header, MessageBox, Navbar, TabItem, IndexList, IndexSection, Radio, Actionsheet } from 'mint-ui'
	export default {
		name: "remark-match",
    data(){
      return{
        companyDetail: {},
        area: "沪",
        cardno: "",
        tel: "",
        code: "",
        buttonon: false,
        codebutton: "获取验证码",
        islogin: false,
        areavisible: false,
        areaslots: [{
          flex: 1,
          values: ['沪','京','津','渝','黑','吉','辽','蒙','冀','新','甘','青','陕','宁','豫','鲁','晋','皖','鄂','湘','苏','川','黔','滇','桂','藏','浙','赣','粤','闽','台','琼','港','澳'],
          className: 'areas',
        }],

        remarkvisible: false,
        satisfaction: [    //满意度
          {title: '履约情况', level: ''},
          {title: '服务态度', level: ''},
          {title: '维修质量', level: ''},
          {title: '维修速度', level: ''},
          {title: '维修价格', level: ''}
        ],
        promise: 3,           // 履约情况
        serviceQuality: 3,    // 服务态度
        repairQuality: 3,     // 维修质量
        repairSpeed: 3,       // 维修速度
        repairPrice: 3,       // 维修价格
        saymore: '',
        please: 0,
        tags: [
          {name: '价格实惠', checked: false},
          {name: '服务热情', checked: false},
          {name: '维修时间短', checked: false},
          {name: '有WIFI', checked: false},
          {name: '维修工位多', checked: false},
          {name: '客休区大', checked: false},
          {name: '客餐丰富可口', checked: false},
          {name: '索赔方便', checked: false},
          {name: '上门取车', checked: false},
        ]
      }
		},
    watch: {
      cardno(val){
        this.cardno= this.cardno.toUpperCase()
        this.checkval()

      },
      tel(val){
        this.checkval()
      },
      code(val){
        this.checkval()
      },
      '$route'(to){
        if(to.query.show=='yes') this.remarkvisible=true
        else this.remarkvisible=false
      },
    },
    created(){
		  // console.log(this.$route)
		  // console.log(this.$router)
      if(this.$route.query.show=='yes') this.remarkvisible=true
	    if(this.$route.query.corpId){
		    this.axios({
			    method: 'get',
			    baseURL: '/repairproxy',
			    url: '/micro/search/company/repair/'+this.$route.query.corpId ,
		    }).then(res => {
			    this.companyDetail = res.data
		    })
	    }

      // this.checklogin()
    },
    methods:{
      getcode(){
        let reg = /^1[3|4|5|7|8][0-9]{9}$/, self= this, timer=null, number= 60;
        if(this.codebutton!="获取验证码") return
        if(!reg.test(this.tel.trim())){
          Toast("请输入正确手机号")
          return
        }
        this.axios({
          method: 'post',
          url: '/message/sms/sendsmscaptcha',
          headers: {
            'Content-type': 'application/json'
          },
          data: JSON.stringify({
            businessType: "10",
            cid: this.$store.state.picVerification.imageToken,
            code: this.$store.state.picVerification.YZM,
            mobile: this.tel,
            systemToken: localStorage.getItem("SYSTEMTOKEN")
          })
        }).then(res=>{
            if(res.data.code === '0'){
              Toast('验证码发送成功,请及时查收!')
            }else {
              Toast(res.data.status)
              clearInterval(timer)
              self.codebutton="获取验证码"
            }
        })
        timer= setInterval(()=>{
          self.codebutton= number+'秒后再获取'
          number--
          if(number==0) {
            clearInterval(timer)
            self.codebutton="获取验证码"
          }
        }, 1000)
      },
      areachange(index, values){
        // console.log(values)
        this.area=values[0]
      },
      checklogin(){
        let userinfo= localStorage.getItem("USERINFO")
        if(userinfo){
          this.islogin=true
          this.tel=JSON.parse(userinfo).telphone
        }
      },
      checkval(){
        let reg = /^1[3|4|5|7|8][0-9]{9}$/,flag=false,
          regcar= /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/, carcode= this.area+this.cardno.trim();
        // if(!this.islogin){
        //   if(regcar.test(carcode) && this.code.trim() && reg.test(this.tel.trim())){
        //     flag=true
        //   }else{
        //     flag=false
        //   }
        // }else{
        //   if(regcar.test(carcode) && reg.test(this.tel.trim())){
        //     flag=true
        //   }else{
        //     flag=false
        //   }
        // }

        if(regcar.test(carcode) ){
          flag=true
        }else{
          flag=false
        }

        this.buttonon=flag
        return flag
      },
      next(){
      	// for(let key in MessageBox){
      	// 	console.log('MessageBox', key)
        // }
        if(!this.checkval()) return
	      this.axios.get('/comment/maintain/checkUserVehicle?vehicleNum='+this.area+ this.cardno.trim()).then(res => {
			console.log('res.data', res.data)
			if(Boolean(res.data)){
				this.$router.push({path: '/remarkMatch', query: { corpId: this.$route.query.corpId, show: 'yes' }})
			}else{
				MessageBox({message: '为保证点评真实性，请绑定该车辆后进行点评！', closeOnClickModal: false,
				   confirmButtonText: '前往绑定', cancelButtonText: '修改车牌', showCancelButton: true}).then(action => {
				// console.log('action', action)
				   switch (action){
				      case 'confirm':{
					      this.$router.push({path: '/my-car-list', query: {showBind: true}})
				      	break
				      }
				      case 'cancel':{
					      this.cardno= ''
					      this.$refs.input.focus()
					      break
				      }
				   }
				})
			}
	      })
	      this.bodyScroll()
      },
	    bodyScroll(){
		    if($('body').scrollTop()!= 0 ) $('body').scrollTop(0)
	    },
      chooseLevel(e){
        let imgs = e.target.parentNode.children
        let next=[], previous=[]
        let satisfaction = e.target.parentNode.nextElementSibling
        switch(e.target.parentNode.parentNode.getAttribute('data-index')){
          case '0':
            this.promise=Number(e.target.getAttribute('data-index'))+1;
            break;
          case '1':
            this.serviceQuality=Number(e.target.getAttribute('data-index'))+1;
            break;
          case '2':
            this.repairQuality=Number(e.target.getAttribute('data-index'))+1;
            break;
          case '3':
            this.repairSpeed=Number(e.target.getAttribute('data-index'))+1;
            break;
          case '4':
            this.repairPrice=Number(e.target.getAttribute('data-index'))+1;
            break;
        }
        switch(e.target.getAttribute('data-index')){
          case '0':
            satisfaction.innerText='极差';
            break;
          case '1':
            satisfaction.innerText='失望';
            break;
          case '2':
            satisfaction.innerText='一般';
            break;
          case '3':
            satisfaction.innerText='满意';
            break;
          case '4':
            satisfaction.innerText='惊喜';
            break;
        }
        for(let i=0; i<imgs.length; i++){
          if(i>Number(e.target.getAttribute('data-index'))){
            next.push(imgs[i])
          }else {
            previous.push(imgs[i])
          }
        }
        for(let i=0; i<next.length; i++){
          next[i].setAttribute('src','/static/img/gray.png')
        }
        for(let i=0; i<previous.length; i++){
          previous[i].setAttribute('src','/static/img/yellow.png')
        }
        console.log(this.promise,this.serviceQuality,this.repairQuality,this.repairSpeed,this.repairPrice);
      },
      remark(item){
        if(item=='good'){
          this.please=0
          $(".good").attr('src','/static/img/remark/goodon.png')
          $(".bad").attr('src','/static/img/remark/bad.png')
          this.tags=[
            {name: '价格实惠', checked: false},
            {name: '服务热情', checked: false},
            {name: '维修时间短', checked: false},
            {name: '有WIFI', checked: false},
            {name: '维修工位多', checked: false},
            {name: '客休区大', checked: false},
            {name: '客餐丰富可口', checked: false},
            {name: '索赔方便', checked: false},
            {name: '上门取车', checked: false},
          ]
        }else{
          this.please=1
          $(".good").attr('src','/static/img/remark/good.png')
          $(".bad").attr('src','/static/img/remark/badon.png')
          this.tags=[
            {name: '乱收费', checked: false},
            {name: '维修时间长', checked: false},
            {name: '态度差', checked: false},
            {name: '不专业', checked: false},
            {name: '维修区杂乱', checked: false},
            {name: '需要返工', checked: false},
          ]
        }
      },
      clicktag(index){
        this.tags[index].checked= !this.tags[index].checked
      },
      submit(){
        let self= this, tag= [];
        for (let i in this.tags){
          if(this.tags[i].checked) tag.push(this.tags[i].name)
        }
        let url= '/comment/maintain',
          param={
            "attitude": this.serviceQuality,
            "companyId": this.$route.query.corpId,
            "extraDetails": this.saymore,
            "keepAppointment": this.promise,
            "level": this.please,
            "needSave": true,
            "price": this.repairPrice,
            "quality": this.repairQuality,
            "speed": this.repairSpeed,
            "tags": tag,
            "vehicleNum": this.area+ this.cardno.trim(),
            'needJudgeVehicleExist': false,
            'openId': localStorage.getItem("QXWOPENID"),
            'unionid': localStorage.getItem("UNIONID")
          };
          if(this.$route.query.repairId){
            param.repairId= this.$route.query.repairId
            param.vehicleNum= this.$route.query.vehicleplatenumber
            delete param.weixinId
            delete param.unionid
          }

        this.axios({
          method: 'post',
          url: url,
          data: param
        }).then(res => {
          if(res.data.code=='0'){

            Toast('点评成功')
            // setTimeout(function () {
              // if(!this.$route.query.repairId){
               // self.$router.replace({path: '/remarkDetail', query: { id: res.data.commentId }})
            self.$router.replace({path: '/home'}) //去掉点评玩分享页面
              // }else{
              //   self.$router.replace({path: '/my'})
              // }

            // },500)

          } else if(res.data.code=='000004'){
            self.$router.go(-1)
            Toast('此车牌近期已有点评');
          }
        })
      }
    },
		beforeRouteLeave (to, from, next) {
			MessageBox.close()
			next()
		}
}
</script>

<style scoped lang='less'>
.compImg{
  width: 100%;
	max-height: 200px;
  margin-top: 40px;
}
  .content{
    width: 100%;
    padding: 15px;
    .row{
      margin-bottom: 20px;
      position: relative;
      p{
        font-size: 16px;
        color: black;
        margin-bottom: 0;
      }
      span{
        font-size: 12px;
        color: #b3b3b3;
      }
      label{
        width: 100%;
        display: block;
        font-size: 13px;
      }
      .input{
        margin-top: 5px;
        padding-bottom: 5px;
        border-bottom: 1px solid #eeeeee;
        input{
          width: 100%;
          font-size: 16px;
        }
        input::-webkit-input-placeholder{
          color:#bdbdbd;
        }
        .readonly{
          color: #888;
        }
      }
    }
  }
  .button{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: white;
    background-color: #c4dffe;
    border-radius: 5px
  }
.button.on{
  background-color: #438eff;
}
  .remarkblock{
    width: 100%;
    height: 100vh;
    overflow: auto;
    .remarkhead{
      /*margin-top: 40px;*/
      border-bottom: 10px solid #f8f8f8;
      padding: 10px 90px 10px 15px;
      position: relative;
      h1{
        font-size: 20px;
        font-weight: 300;
        line-height: 30px;
        white-space: nowrap;
      }
      p{
        margin: 0;
        line-height: 30px;
        white-space: nowrap;
        letter-spacing: -1px;
        font-size: 12px;
      }
      img{
        width: 85px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto 5px auto auto;
      }
    }
    .remarkbody{
      padding: 15px;
      .head{
        font-size: 16px;
        position: relative;
        padding-right: 30px;
        em{
          position: absolute;
          right: 0;
          color: #666666;
          font-style: normal;
          font-size: 14px
        }
      }
      .remarkstar{
        margin: 10px 0;
        font-weight: 300;
        font-size: 14px;
        li {
          padding: 8px 0;
          .left {
            float: left;
            width: 80px;
            color: #666666;
          }
          .center {
            float: left;
            width: 140px;
            height: auto;
            padding: 0;
            img {
              width: 20px;
              height: auto;
              border: 0;
              border-radius: 0;
              margin-right: 3px;
            }
          }
          .right {
            text-align: center;
            color: #999999;
          }
        }
      }
      .saymore{
        position: relative;
        /*margin-top: 30px;*/
        margin-bottom: 10px;
        input{
          border: 0;
          height: 30px;
          line-height: 30px;
        }
        .good,.bad{
          width: 30px;
          position: absolute;
        }
        .good{
          right: 40px;
        }
        .bad{
          right: 0;
        }
      }
      .tag{
        margin-bottom: 10px;
        font-size: 14px;
        li{
          display: inline-block;
          padding: 5px 10px;
          background-color: #f4f4f4;
          color: #666666;
          border-radius: 5px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        li.on{
          background-color: #ff8327;
          color: white;
        }
      }
    }
  }

</style>
<style>
  .areaselect .picker-toolbar{
    position:  absolute;
    bottom: -40px;
    width: 100%;
  }
  .areaselect .picker-toolbar .sure{
    margin-top: 5px;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    color: white;
    background-color: #438eff;
    height: 40px;
    line-height: 40px;
  }
</style>
