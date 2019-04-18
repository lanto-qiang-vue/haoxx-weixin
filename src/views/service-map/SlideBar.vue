<template>
<div class="slide-bar" ref="slide">
  <!--<div class="real-touch-bar"></div>-->
  <div class="touch-bar" ><i></i></div>
  <div class="slide-body">
    <slot></slot>
  </div>
</div>
</template>

<script>
// let bodyScrollTop= function(){
// 	if($('body').scrollTop()!= 0 ) $('body').scrollTop(0)
// }
export default {
	name: "slide-bar",
    props: [ 'minHeight', 'toLocation', 'pageLocation', 'action', 'bottom'],
    data(){
		return {
        timer: null,
        first: true,
        minTop: 80,
		docHeight: 0,
		touchBarHeight: 20
      }
    },
    computed: {
		calcMinHeight(){
			return this.minHeight+ (this.bottom|| 0)
		}
    },
    watch:{
      toLocation(val){
	      this.resize(this.pageLocation[val], 10)
      },
	    calcMinHeight(val){
		    this.resize(val, 10)
	    }
    },
    mounted(){
		// setTimeout(()=>{
			this.docHeight=  document.body.offsetHeight
			this.resize(this.pageLocation[this.toLocation], 10)
		// },100)

		// console.log('docHeight', this.docHeight)
		// console.log('this.pageLocation[this.toLocation]', this.pageLocation[this.toLocation])

      // this.$emit('toLocation', this.location)
      let self=this
      let dom= $(this.$refs.slide)
      let touchBarHeight= self.touchBarHeight //bar高度（20）
      let startY= 0
      let endY= 0
      let domY= 0
      let isMove= false
      let moveY=0
      // console.log(touchBarHeight)
      // $(dom).css({transform: 'translateY('+ (docHeight- this.setBodyHeight - touchBarHeight) + 'px)'})
      // $(dom).css({transform: 'translateY('+ this.slideState.minTop+ 'px);'})
      dom.bind('touchstart',function(startE){


        // console.log('touchstart')
      // dom.children('.real-touch-bar').bind('touchstart',function(startE){
        startY= startE.originalEvent.targetTouches[0].pageY;
        domY = parseInt(dom.css('transform').split(',')[5])
        isMove= false
        moveY=0
        document.body.addEventListener('touchmove',self.noscroll,{ passive: false });
        $(document).bind('touchmove',function(e){
          // console.log('touchmove')
          if(e.originalEvent.targetTouches[0].pageY>startY) isMove= 'down'
          if(e.originalEvent.targetTouches[0].pageY<startY) isMove= 'up'

          // console.log(isMove)
          //移动位置
          let y = e.originalEvent.targetTouches[0].pageY - (startY- domY);
          let height= self.docHeight- y - touchBarHeight

          if(height> self.docHeight- self.minTop){
            height= self.docHeight- self.minTop -touchBarHeight
          }else if(height< self.calcMinHeight){
            height= self.calcMinHeight
          }

          if(y< self.minTop) y= self.minTop
          if(y> self.docHeight- self.calcMinHeight -touchBarHeight) y= self.docHeight- self.calcMinHeight -touchBarHeight

          // console.log('touchmove', dom)
          $(dom).css({transform: 'translateY('+ y+ 'px)'})
          self.resize(height, 100, true)
          self.$emit('maintainListBlur')
        });

      });
      $(document).bind('touchend',function(endE){
        // console.log('touchend')
        $(document).unbind('touchmove');
        endY= endE.originalEvent.changedTouches[0].pageY
        // console.log('move', endY- startY)
        if(isMove){
          // console.log('startY, endY', startY, endY)
          self.autoMove(endY- startY, isMove, self.docHeight- parseInt(dom.css('transform').split(',')[5])- touchBarHeight)
          // self.resize(this.docHeight- self.slideState.minTop -touchBarHeight, 0)
          // self.resize(1, 0)
          isMove=false
        }
        document.body.removeEventListener('touchmove', self.noscroll,false)
	      // $(document).unbind('touchmove');
      });

      // document.body.addEventListener('touchend', bodyScrollTop)
	    $("body").bind('touchend', this.bodyScrollTop)

      window.onresize = function(){
        if( document.body.offsetHeight== (self.docHeight)) self.$emit('maintainListBlur')
        self.resize(self.docHeight- self.minTop -touchBarHeight)
      }
    },
	activated(){
		this.resize(this.pageLocation[this.toLocation], 0)
	},
    deactivated(){
			// console.log(1)
	    this.removeEvent()
    },
	beforeDestroy(){
	    // console.log(2)
	    this.removeEvent()
    },
	beforeRouteLeave (to, from, next) {
		// console.log(3)
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`
		this.removeEvent()
		next()
	},
    methods:{
	    removeEvent(){

		    document.body.removeEventListener('touchmove', this.noscroll,false)
		    $("body").unbind('touchend')
		    $(document).unbind('touchstart');
		    $(document).unbind('touchend');
		    $(document).unbind('touchmove');
	    },
      bodyScrollTop(){
		  if($('body').scrollTop()!= 0 ) $('body').scrollTop(0)
      },
      noscroll(evt) {
        if(!evt._isScroller) {
          if (!this.translateY) event.preventDefault();
        }
      },
	    resetHeight(){
		    this.resize(this.pageLocation[this.toLocation], 50)
	    },
	    // changeLocation(val){
		 //    // console.log('slide-bar.location', val)
	    //
		 //    this.resize(this.pageLocation[this.toLocation], 10)
		 //    this.$emit('toLocation', val)
	    // },
      resize(height, time, noToMove){
        // console.log('resize.height,this.minHeight', height, this.minHeight)
        let self= this
        let timeout= (time=== undefined? 500: time)
        let touchBarHeight= self.touchBarHeight
        let calcHeight= 0
        if(height> this.docHeight- this.minTop -touchBarHeight){
          calcHeight= this.docHeight- this.minTop -touchBarHeight
        }else if(height< this.calcMinHeight){
          calcHeight= this.calcMinHeight
        }else calcHeight= height

        // console.log('calcHeight', calcHeight)
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
          // self.bodyHeight= height
          // self.$store.commit('setSlideBodyHeight', calcHeight)
            self.$emit('bodyHeight', (calcHeight - (self.bottom|| 0)));
          // self.$store.commit('reSetSlideBodyHeight', height)
        }, timeout);
        if(!noToMove){

          console.log('this.docHeight- calcHeight- touchBarHeight', this.docHeight, calcHeight, touchBarHeight)
          $(this.$refs.slide).css({
	          transform: 'translateY('+ (this.docHeight- calcHeight- touchBarHeight ) + 'px)'})
          // self.$store.commit('reSetSlideBodyHeight', calcHeight)
        }
      },

      /**
       * @param {moveNumber} 滑动间距
       * @param {upOrDown} 滑动方向
       * @param {height} 滑动至高度
       * @returns {}
       * @description 分层滑动
       */
	autoMove(moveNumber, upOrDown, height){
		let arr= this.pageLocation, index=0
		// console.log('moveNumber, upOrDown, height, arr', moveNumber, upOrDown, height, arr)
		if(Math.abs(moveNumber)< 50){
			this.resize(this.pageLocation[this.toLocation], 10)
		}else{
			if (upOrDown=='up') {
				for (let i in arr){
					if(height> arr[i]) index= parseInt(i) + 1
				}
				// console.log('index.up', index, arr[index])
				this.resize(arr[index], 10)
				this.$emit('toLocation', index)
			} else {
				for (let i in arr){
					if(height> arr[i]) index= parseInt(i)
				}
				// console.log('index.down', index, arr[index])
				this.resize(arr[index], 10)
				this.$emit('toLocation', index)
			}
		}
	},
},

}
</script>

<style scoped lang='less'>
.slide-bar{
  overflow: visible;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  background-color: white;
  z-index: 11;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 -1px 10px #d8d9d8;
  height: 100vh;
  /*transition: all 0.1s;*/
  .real-touch-bar{
    width: 100%;
    height: 34px;
    position: absolute;
    left: 0;
    top: -8px;
    z-index: 1;
  }
  .touch-bar{
    width: 100%;
    height: 20px;
    position: relative;
    i{
      display: inline-block;
      width: 40px;
      height: 4px;
      background-color: #f9f9f9;
      border: 1px solid #e4e4e4;
      border-radius: 20px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .slide-body{
    width: 100%;
    height: calc(100% - 20px);
    overflow: visible;
  }
}
</style>
