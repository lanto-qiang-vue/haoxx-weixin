<template>
  <div class="detail-bottom" v-show="show=='maintainDetail'">
    <div class="lookall" @click="changeState(true)" v-show="location== 0">查看详情</div>
    <div class="lookmap" @click="changeState(false)" v-show="location== 1">显示地图</div>
    <div class="gps" @click="$emit('openMap', maintainDetail)">导航</div>
    <div class="distance">距离您 {{maintainDetail.distance?maintainDetail.distance.toFixed(1):0}}km</div>
  </div>
</template>

<script>
	export default {
		name: "maintain-bottom",
    props: ['location'],
    data(){
	  return{
        documentHeight: $(document).height()
      }
    },
    computed: {
      show(){
        return this.$store.state.app.slideState.showBody
      },
      maintainDetail(){
        return this.$store.state.app.maintainDetail
      },
      showAll(){
        return this.$store.state.app.slideState.setBodyHeight < this.documentHeight*.5
      }
    },
    watch:{
      // location(val){
      //   this.$emit('toLocation', val)
      // }
    },
    methods:{
      changeState(state){
        // state? this.$store.commit('reSetSlideBodyHeight', this.documentHeight):
        //   this.$store.commit('reSetSlideBodyHeight', this.$store.state.slideState.minHeight)
        console.log('open', state)
        if(state){
          this.$emit('toLocation', 1)
        }else{
          this.$emit('toLocation', 0)
        }

      }
    }
	}
</script>

<style scoped lang='less'>
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
</style>
