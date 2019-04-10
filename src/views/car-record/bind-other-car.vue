<template>
  <div id="bind-other-car">
    <div class="content">
      <div class="tit">信息填写</div>
      <div style="border-bottom: 15px solid #f8f8f8;">
        <mt-field label="车主手机号" type="tel" placeholder="输入手机号" v-model="tel"></mt-field>
        <mt-field label="车牌号" placeholder="输入车牌号" type="text" v-model="vehicleNumber"></mt-field>
        <mt-cell title="跟车主关系">
          <span style="color: #999" @click="sheetVisible=!sheetVisible">{{ relationship }}<span style="font-size: 20px; margin-left: 5px;" class="mui-icon mui-icon-arrowright"></span></span>
        </mt-cell>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between; width: 70%; margin: 30px auto 10px;">
          <div style="height: 1px; width: calc((100% - 120px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; right: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
          <div style="color: #666; font-size: 17px;">注意事项</div>
          <div style="height: 1px; width: calc((100% - 120px) / 2); background-color: #ddd; position: relative; margin-top: 9px;">
            <i style="position: absolute; bottom: -1.5px; left: 0; width: 4px; height: 4px; border-radius: 2px; background-color: #ddd;"></i>
          </div>
        </div>
        <p style="margin: 0 30px;">绑定非本人车辆时，此车辆必须在本平台上已进行成功绑定，否则您将无法绑定该车辆。信息填写完整后，平台将给车主发送短信验证码，您即可获取并绑定该车辆。</p>
      </div>
    </div>
    <div class="submit" @click="submit">
      <mt-button type="primary" size="large" style="width: 100%; border-radius: 0;">提交</mt-button>
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible"
      cancelText="">
    </mt-actionsheet>
    <mt-popup v-model="popupVisible" style="width: 70vw; border-radius: 8px; background-color: #fff; overflow: hidden;">
      <div class="captcha">
        <h4 style="text-align: center; margin: 15px 0 15px; font-weight: normal;">输入验证码</h4>
        <p style="text-align: center;">已发送短信验证码到车主手机</p>
        <div class="haha">
          <input type="tel" v-model.trim="captcha" maxlength="6">
          <ul>
            <li id="li1"></li>
            <li id="li2"></li>
            <li id="li3"></li>
            <li id="li4"></li>
            <li id="li5"></li>
            <li id="li6"></li>
          </ul>
        </div>
        <div class="mint-msgbox-btns" style="border-top: 1px solid #ccc;">
          <button class="mint-msgbox-btn mint-msgbox-cancel" @click="popupVisible=!popupVisible">取消</button>
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="confirm">确定</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import { Field, Button, Toast, Cell, MessageBox, Actionsheet, Popup } from 'mint-ui'
  export default{
    name: "bindOtherCar",
    data(){
      return {
        tel: '',
        vehicleNumber: '',
        relationship: '家人',
        relation: 1,
        sheetVisible: false,
        popupVisible: false,
        captcha: '',
        actions: [{
          name: '家人',
          method: () => {
            this.relationship = '家人'
            this.relation = 1
          }
        },
        {
          name: '亲戚',
          method: () => {
            this.relationship = '亲戚'
            this.relation = 2
          }
        },
        {
          name: '朋友',
          method: () => {
            this.relationship = '朋友'
            this.relation = 3
          }
        },
        {
          name: '同事',
          method: () => {
            this.relationship = '同事'
            this.relation = 4
          }
        }]
      }
    },

    watch:{
      captcha(newVal, oldVal){
        $('#li1').html(newVal.substr(0,1))
        $('#li2').html(newVal.substr(1,1))
        $('#li3').html(newVal.substr(2,1))
        $('#li4').html(newVal.substr(3,1))
        $('#li5').html(newVal.substr(4,1))
        $('#li6').html(newVal.substr(5,1))
      }
    },

    methods: {
      submit(){
        if(this.tel===''){
          return Toast('手机号不能为空')
        }else if(this.vehicleplatenumber===''){
          return Toast('车牌号不能为空')
        }
        this.axios({
          url: '/scan/authorize',
          method: 'post',
          data: {
            relation: this.relation,
            telephone: this.tel,
            vehicleNumber: this.vehicleNumber
          }
        }).then(res=>{
          if(res.data.code==='0'){
            this.popupVisible = !this.popupVisible
          }else{
            Toast(res.data.status)
          }
        })
      },

      confirm(){
        if(this.captcha.length != 6){
           return Toast('短信验证码为6位数字')
        }
        this.axios({
          url: '/scan/authorize',
          method: 'post',
          headers: {'Content-type': 'application/json'},
          data: JSON.stringify({
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            captcha: this.captcha,
            relation: this.relation,
            telephone: this.tel,
            vehicleNumber: this.vehicleNumber
          })
        }).then(resp=>{
          console.log(resp);
          if(resp.data.code==='0'){
            this.popupVisible = !this.popupVisible
            Toast('绑定成功')
            this.$router.push('/my-car-list')
          }else if(resp.data.code==='130506'){
            Toast(resp.data.status)
          }else{
            Toast(resp.data.status)
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  #bind-other-car {
    height: 100vh;
    position: relative;
    background-color: #fff;
    .content {
      height: calc(100vh - 40px);
      .tit {
        line-height: 40px;
        background-color: #f8f8f8;
        text-indent: 15px;
      }
    }
    .submit {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
    .captcha {
      .haha {
        position: relative;
        overflow: hidden;
        input {
          position: absolute;
          left: 0;
          top: 0;
          width: 200%;
          height: 100%;
          margin-left: -100%;
          background-color: #f00;
          opacity: 0;
        }
        ul {
          width: 75%;
          margin: 15px auto 35px;
          display: flex;
          justify-content: space-between;
          li {
            width: 12%;
            height: 40px;
            line-height: 40px;
            font-weight: 700;
            font-size: 24px;
            color: #4285f4;
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
            border-bottom: 1px solid #ccc;
            text-align: center;
          }
        }
      }
    }
  }
</style>

<style lang='less'>
  #bind-other-car {
    .content {
      a {
        &:active {
          color: #000;
        }
        input {
          margin-bottom: 0;
          border: none;
          text-align: right;
        }
      }
    }
  }
</style>
