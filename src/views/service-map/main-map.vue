<template>
<div id="allmap" >
	<div class='search'>
	    <div class="fixGuide" v-show="showCenter=='simple'">
		    <img class="point" src="/img/maintain/center-point.png"/>
	    </div>
		<div class="fixGuide" v-show="showCenter=='all'">
			<img src="/img/maintain/center-location.png"/>
			<div class="fixGuideClick" @click="goLatePoint">{{centerName}}</div>
		</div>

		<div id="container"></div>
	 </div>

	<maintain-list v-if="hasList" ref="maintainList" :nowLnglat="nowLnglat"
	               @renderMap="renderMap" @goMap="goMap"></maintain-list>
	<maintain-detail v-if="type=='maintain'" ref="maintainDetail" @goMap="goMap"></maintain-detail>
</div>
</template>

<script>
import { Toast,  Actionsheet, Indicator } from 'mint-ui'
import maintainDetail from '@/views/service-map/maintainDetail.vue'
import maintainList from '@/views/service-map/maintainList'
export default {
    name: 'maintain-map',
	components: {maintainDetail,  maintainList },
	props:[ 'type'],
    data() {
		return {
			map: null,
			geolocation: null,
			markerClustererPoint: [],
			markerClusterer: null,
			markers: [],

			defaultLnglat:{
				lng: '121.480236',
				lat: '31.236301'
			},
			nowLnglat:{
			  lng: '121.480236',
			  lat: '31.236301'
			},
		}
    },

    computed: {
    	locationLnglat(){
    		if(this.successLocation){
    			return {
				    lng: this.$store.state.app.location.lng,
				    lat: this.$store.state.app.location.lat,
				    success: true
			    }
		    }else{
    			return {
    				lng: this.defaultLnglat.lng,
				    lat: this.defaultLnglat.lat,
				    success: false
			    }
		    }
	    },
	    successLocation(){
		    return !!this.$store.state.app.location.lng
	    },
    	hasList(){
    		let has= false
    		switch (this.type){
			    case 'maintain':{
				    has= true
			    }
		    }
		    return has
	    },
	    showCenter(){
		    let show= ''
		    switch (this.type){
			    case 'rescue-map':{
			    	break
			    }
			    case 'base-map':{
				    show= 'simple'
				    break
			    }
			    default:{
				    show= 'all'
			    }
		    }
		    return show
	    },
	    centerName(){
		    let name= ''
		    switch (this.type){
			    case 'base-map':
			    case 'school-map':{
				    name= '查找最近驾校'
				    break
			    }
			    default :{
				    name= '查找最近维修点'
			    }
		    }
		    return name
	    },
	    needPanTo(){
    		let need= true
    		if(this.$route.query.compId){
			    need= false
		    }
		    return need
	    }
    },

    mounted(){
	    console.log('maintain.mounted')
    	this.bodyNoScoll()
	    this.init()
    },

    methods: {
    	init(){
			Indicator.open({
				text: '请稍候...',
				spinnerType: 'snake'
			});
			this.map= new AMap.Map('container',{
				center: new AMap.LngLat(this.locationLnglat.lng, this.locationLnglat.lat),
				zoom: 14,
			});
			// 同时引入工具条插件，比例尺插件和鹰眼插件
			AMap.plugin(['AMap.ToolBar',], () => {
			// 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
				let tool= new AMap.ToolBar({
					locate: false,
					position: 'LT',
					offset: new AMap.Pixel(0,55)
				})
				tool.on('zoomchanged',(obj) => {
				// console.log('zoomchanged.obj', obj)
				// return false
				})
				this.map.addControl(tool);
			});

			this.map.on('complete', () => {
				Indicator.close()
				if(this.successLocation){
					this.localFinish()
				}else this.getLocation()
			});

			this.map.on('dragend', () => {
				let center= this.map.getCenter()
				this.nowLnglat.lng= center.lng
				this.nowLnglat.lat= center.lat

				if(this.hasList) this.$refs.maintainList.dragend()
			});

	    },
	    localFinish(){
		    this.nowLnglat.lng= this.locationLnglat.lng
		    this.nowLnglat.lat= this.locationLnglat.lat

		    if(this.needPanTo){
			    this.map.panTo(new AMap.LngLat(this.nowLnglat.lng, this.nowLnglat.lat))
		    }
		    if(this.hasList){
			    this.getCompList(true, true)
		    }
	    },
	    getLocation(){
		    if(this.map){
			    AMap.plugin('AMap.Geolocation', () => {
				    this.geolocation = new AMap.Geolocation({
					    buttonPosition: 'RT',
					    buttonOffset: new AMap.Pixel(10,40),
					    timeout: 2000,
					    panToLocation: this.$route.query&&this.$route.query.special=='base'? false: true
				    });
				    this.map.addControl(this.geolocation);
				    this.geolocation.getCurrentPosition();
				    AMap.event.addListener(this.geolocation, 'complete', (result)=>{
				    	// console.log('result', result)
					    this.map.clearMap()
					    this.$store.commit('setLocation', {
						    lng: result.position.lng,
						    lat: result.position.lat
					    })
					    this.localFinish()

					    // this.map.setCenter(result.position)

				    });//返回定位信息
				    AMap.event.addListener(this.geolocation, 'error', (err)=>{
					    this.map.clearMap()
				    	// console.log('err', err)
					    this.localFinish()
				    });      //返回定位出错信息


			    });
		    }
	    },
	    getCity(){
		    AMap.plugin('AMap.CitySearch', () => {
			    let city = new AMap.CitySearch();
			    city.getLocalCity((status, result)=>{
				    // console.log('getLocalCity', status, result)
				    if(status== 'complete'){

				    }else{

				    }
			    })
		    });
	    },

	    getCompList(clearPoint, clearList){
		    this.$refs.maintainList.getCompList(clearPoint, clearList)
	    },


      bodyNoScoll(){
        let overscroll = function(el) {
          el.addEventListener('touchstart', function() {
            let top = el.scrollTop
              ,totalScroll = el.scrollHeight
              ,currentScroll = top + el.offsetHeight;
            if(top === 0) {
              el.scrollTop = 1;
            }else if(currentScroll === totalScroll) {
              el.scrollTop = top - 1;
            }
          });

          el.addEventListener('touchmove', function(evt) {
            if(el.offsetHeight < el.scrollHeight)
              evt._isScroller = true;
          });
        }
        // overscroll(document.querySelector('.slide-bar'));
        document.body.addEventListener('touchmove', this.noscroll, { passive: false })
        // document.getElementById("allmap").addEventListener('touchmove', this.noscroll, { passive: false })
      },
      noscroll(evt) {
        if(!evt._isScroller) {
          evt.preventDefault();
        }
      },

	clearMap(){
		if(this.map){
		    if(this.markerClusterer ) {
			    this.markerClusterer.clearMarkers();
			    this.markerClusterer.setMap(null);
			    this.markerClusterer= null
		    }
		    this.map.clearMap()
		}
	},
	renderMap(markers, renderMarker){
		this.clearMap()

		if(markers){
			if(renderMarker){
			//renderMarker为true代表无聚合点，目前学车基地是无聚合点
			this.markers= markers
			}else{
			this.markerClustererPoint= markers
			}
		}

		if(this.markers.length) this.map.add(this.markers)
		if(this.markerClustererPoint.length){
			let style={
				url: '/img/maintain/position-num.png',
				size: new AMap.Size(30, 30),
				imageOffset:new AMap.Pixel(-5,-5),
				textColor: '#fff',
				textSize: 14
			}
			AMap.plugin(["AMap.MarkerClusterer"],() => {
				this.markerClusterer= new AMap.MarkerClusterer(this.map, this.markerClustererPoint,{styles:[style, style, style]});
		      // console.log('renderMap() over')
		  });
		}
	  // history.replaceState(null, null, window.location.origin + window.location.hash.split('?')[0])
	},


	goLatePoint(){
		if(this.markerClustererPoint.length){
			this.map.panTo(new AMap.LngLat(this.markerClustererPoint[0].getExtData().lon,
			this.markerClustererPoint[0].getExtData().lat))
		}else if(this.markers.length){
			this.map.panTo(new AMap.LngLat(this.markers[0].getExtData().lon,
			this.markers[0].getExtData().lat))
		}

	},


	goMap(item){

		this.nowLnglat.lng= item.lon
		this.nowLnglat.lat= item.lat
		this.map.panTo(new AMap.LngLat(this.nowLnglat.lng, this.nowLnglat.lat))

	},


    },
	activated(){
		// console.log('maintain.activated')
		this.bodyNoScoll()
	},
	beforeRouteUpdate (to, from, next) {
	// 在当前路由改变，但是该组件被复用时调用
	// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
	// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
	// 可以访问组件实例 `this`
	// this.getCompList(true, true)
		next()
	},
	beforeRouteLeave (to, from, next) {
	// 导航离开该组件的对应路由时调用
	// 可以访问组件实例 `this`
		document.body.removeEventListener('touchmove', this.noscroll,false)
		next()
	},
	deactivated(){
		document.body.removeEventListener('touchmove', this.noscroll,false)
	},
	beforeDestory(){
		document.body.removeEventListener('touchmove', this.noscroll,false)
	},

}
</script>
<style scoped>
  body{
   /*touch-action: none*/
  }
</style>

<style lang='less'>
  .mint-indicator {
    position: absolute;
    z-index: 11;
  }
  #allmap {
    overflow: hidden;
	  width: 100%;
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  .amap-toolbar, .amap-touch-toolbar .amap-zoomcontrol, .amap-logo, .amap-geolocation-con, .amap-copyright{
		  z-index: 10!important;
	  }
    .company_type_list {
      width: 240px;
      background-color: #70b8ef;
      :before, :after {
        height: 0;
      }
      li {
        color: #fff;
        text-align: center;
        font-size: 14px;
        border-bottom: 1px solid #fff;
      }
      li:last-child {
        border: none;
      }
    }

    .search {
      position: relative;
      overflow: hidden;
      /*height: calc(100% - 50px);*/
      height: 100%;
      .fixGuide {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        img {
          position: absolute;
          width: 100px;
          top: 0;
          left: 0;
          transform: translate(-50%, -100%);
          pointer-events: none;
        }
	      .point{
		      width: 20px;
	      }
        .fixGuideClick{
          width: 100px;
          height: 24px;
	        line-height: 24px;
          position: absolute;
          left: -50px;
          top: -66px;
	        font-size: 12px;
	        color: white;
	        font-weight: 300;
	        text-align: center;
        }
      }


      #container {
        width: 100%;
        height: 100%
      }

    }

  }
</style>
