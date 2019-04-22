<template>
<div class="map-list">
	<ul class="maintain-type" v-if="mapType=='164'">
		<li v-for="(item, index) in maintainType" :class="{on : tagIsOn('is4s', item.value)}"
		    @click="select('is4s', item.value)" :key="index">{{item.name}}</li>
	</ul>
	<ul class="maintain-type" v-if="mapType=='300' && showHead!='baseMap'">
		<li v-for="(item, index) in schoolPoint" :class="{on : tagIsOn('schoolPoint', item.value)}"
		    @click="select('schoolPoint', item.value)" :key="index">{{item.name}}
			<img v-if="item.value=='300'" src="/img/maintain/icon-school.png"/>
			<img v-if="item.value=='301'" src="/img/maintain/icon-base.png"/>
		</li>
	</ul>
<slide-bar :pageLocation="[ 1, 200, 1000 ]" ref="slideBar"
           v-show="show" :minHeight="45" :toLocation="toLocation" @toLocation="toLocation= $event"
           @bodyHeight="height= $event;calcHeight">
<div class="maintainList">
	<div id="head1" v-show="showHead=='search'">
    <div class="search-input">
    <!--<div class="left" :class="{on: !isFocus&& !search.q}">-->
    <div class="left on">
      <input v-model="search.q" type="search" :placeholder='inputPlaceholder'
             @focus="focus" @blur="isFocus=false" @keydown="key($event)" ref="searchInput"/>
      <!--<div class="query"  @click="toQuery(true)"></div>-->
      <img class="close" v-show="search.q" @click="search.q='';toQuery(true)" src="~@/assets/img/maintain/关闭.png" />
    </div>
    <!--<span @click="cancel" v-show="isFocus || search.q">取消</span>-->
    </div>
	<div v-if="mapType=='164'">
		<div class="button" :class="{show: showBlock=='button'}">
			<div class="area-button"  @click="switchBlock('area-block')"><img src="~@/assets/img/maintain/区域.png" />
				<p>{{getName('area')|| '区域'}}</p></div>
			<div class="sort-button"  @click="switchBlock( 'sort-block')"><img src="~@/assets/img/maintain/排序.png" />
				<p>{{getName('sort')|| '排序'}}</p></div>
			<div class="hot-button"  @click="switchBlock( 'hot-block')"><img src="~@/assets/img/maintain/热搜.png" />
				<p>{{getName('hot')|| '热搜'}}</p></div>
		</div>
		<ul class="area-block" :class="{show: showBlock=='area-block'}">
			<div class="close" @click="switchBlock( 'button')"></div>
			<li v-for="(item, index) in area" :key="index" @click="select('area', item.code)"
			    :class="{on : tagIsOn('area', item.code)}">{{item.name}}</li>
		</ul>
		<ul class="sort-block" :class="{show: showBlock=='sort-block'}">
			<div class="close"  @click="switchBlock('button')"></div>
			<li v-for="(item, index) in sort" :key="index" @click="select('sort', item.value)"
			    :class="{on : tagIsOn('sort', item.value)}">{{item.name}}</li>
		</ul>
		<ul class="hot-block" :class="{show: showBlock=='hot-block'}">
			<div class="close"  @click="switchBlock('button')"></div>
			<li v-for="(item, index) in hot" :key="index" @click="select('hot', item.value)"
			    :class="{on : tagIsOn('hot', item.value)}">{{item.name}}</li>
		</ul>
	</div>
	<div v-if="mapType=='300'">
		<div class="button" :class="{show: showBlock=='button'}">
			<div class="area-button"  @click="switchBlock('area-block')"><img src="~@/assets/img/maintain/区域.png" />
				<p>{{getName('area')|| '区域'}}</p></div>
			<div class="sort-button"  @click="switchBlock( 'sort-block')"><img src="~@/assets/img/maintain/排序.png" />
				<p>{{getName('sort')|| '排序'}}</p></div>
			<div class="hot-button"  @click="switchBlock( 'biz-block')"><img src="~@/assets/img/maintain/驾照.png" />
				<p>{{getName('biz')|| '驾照'}}</p></div>
		</div>
		<ul class="area-block" :class="{show: showBlock=='area-block'}">
			<div class="close" @click="switchBlock( 'button')"></div>
			<li v-for="(item, index) in area" :key="index" @click="select('area', item.code)"
			    :class="{on : tagIsOn('area', item.code)}">{{item.name}}</li>
		</ul>
		<ul class="sort-block" :class="{show: showBlock=='sort-block'}">
			<div class="close"  @click="switchBlock('button')"></div>
			<li v-for="(item, index) in sort" :key="index" @click="select('sort', item.value)"
			    :class="{on : tagIsOn('sort', item.value)}">{{item.name}}</li>
		</ul>
		<ul class="hot-block" :class="{show: showBlock=='biz-block'}">
			<div class="close"  @click="switchBlock('button')"></div>
			<li v-for="(item, index) in biz" :key="index" @click="select('biz', item.value)"
			    :class="{on : tagIsOn('biz', item.value)}">{{item.name}}</li>
		</ul>
	</div>
	</div>
	<div id="head2" v-show="showHead=='base'||showHead=='baseMap'">
		<div class="search-input"><p class="base-head">{{search.base}}驾校基地（{{total}}家驾校）</p>
			<p class="base-head" v-if="schoolBrand">{{schoolBrand}}自用基地</p>
			<p class="base-head" v-else>合用基地</p>
		</div>
	</div>
  <div class="roll" :style="{height: listHeight+'px'}">
    <mt-loadmore :bottom-method="toQuery" :bottom-all-loaded="allLoaded" :autoFill="false"
                 bottomPullText="加载更多"   ref="loadMore">
    <div v-if="mapType=='164'">
      <ul class="history" v-show="maintainListHistory.length">
        <div class="head"><span>最近搜索</span><img @click="clearHistory" src="~@/assets/img/maintain/del.png"/></div>
        <li v-for="(item, index) in maintainListHistory" :key="index" @click="goDetail(item)">
          <div class="picWrap">
            <img :src="item.pic? item.pic.split(',')[0] :'/img/maintain/shqxw.jpg'" />
            <img class="tag" :src="item.is4s?'/img/maintain/tag-4s.png':'/img/maintain/tag-normal.png'"/>
          </div>
          <div class="info">
            <!--<span>{{businessStatus(item.status)}}</span>-->
            <span :class="{rest: !isOpenTime(item.openHours)}">{{isOpenTime(item.openHours)?'营业中': '休息中'}}</span>
            <p>{{ item.name }}
              <!--(<span>{{ item.creditLevel }}</span>)-->
            </p>
            <div class=stars>
              <img src="~@/assets/img/maintain/score_yellow.png"  v-for="index in parseInt(item.rating)||0" :key="'yellow'+index">
              <img src="~@/assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(item.rating))||0" :key="'gray'+index">
              <span v-show="item.rating">{{ item.rating }}分</span>
              <span v-show="!item.rating">暂无评分</span>
            </div>
            <div class="address">
              <span class="miles">{{ item.distance.toFixed(1) }}km</span>
              <span class="address_area">{{ item.addr }}</span>
            </div>
          </div>
        </li>
      </ul>
      <ul class="com-list">
        <div class="head"><span>智能推荐</span></div>
        <li v-for="(item, index) in list" :key="index" @click="goDetail(item)">
          <div class="picWrap">
            <img :src="item.pic? item.pic.split(',')[0] :'/img/maintain/shqxw.jpg'" />
            <img class="tag" :src="item.is4s?'/img/maintain/tag-4s.png':'/img/maintain/tag-normal.png'"/>
          </div>
          <div class="info">
            <!--<span>{{businessStatus(item.status)}}</span>-->
            <span :class="{rest: !isOpenTime(item.openHours)}">{{isOpenTime(item.openHours)?'营业中': '休息中'}}</span>
            <p>{{ item.name }}
              <!--(<span>{{ item.creditLevel }}</span>)-->
            </p>
            <div class=stars>
              <img src="~@/assets/img/maintain/score_yellow.png"  v-for="index in parseInt(item.rating)||0" :key="'yellow'+index">
              <img src="~@/assets/img/maintain/score_gray.png"  v-for="index in (5-parseInt(item.rating))||0" :key="'gray'+index">
              <span v-show="item.rating">{{ item.rating }}分</span>
              <span v-show="!item.rating">暂无评分</span>
            </div>
            <div class="address">
              <span class="miles">{{ item.distance.toFixed(1) }}km</span>
              <span class="address_area">{{ item.addr }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
      <div v-show="allLoaded && total>=10" style="text-align: center; line-height: 30px; background-color: #f8f8f8; font-size: 14px; color: #999;">已经到底啦...</div>
    </mt-loadmore>
  </div>

</div>
</slide-bar>
</div>
</template>

<script>
import SlideBar from '@/views/service-map/SlideBar'
import { Indicator} from 'mint-ui'
import {deepClone} from '@/util.js'
let search= {
		type: '',
		q: '',
		sort:'',
		area: '',
		is4s: '',
		hot: '',
		base: '',
		biz: '',
		schoolPoint: ''
	}
export default {
	name: "maintain-list",
	components: { SlideBar},
	props: [ 'blur', 'nowLnglat', 'type'],
    data(){
		let sotrName= ''
	    switch (this.$route.name){
		    case 'school-map':{
			    sotrName= '评级优先'
			    break
		    }
		    default: {
			    sotrName= '好评优先'
		    }
	    }
		return{
			toLocation: 1,
			height: 0,
            isFocus: false,
		    search:{
			    type: '164',
			    q: '',
			    sort:'',
			    area: '',
			    is4s: '',
			    hot: '',
			    base: '',
			    biz: 'C1',
			    schoolPoint: ''
			},
			total: 0,
			limit: 10,
			page: 1,
			maintainType:[
				{name: '全部', value: ''},
				{name: '4S店', value: 'yes'},
				{name: '维修厂', value: 'no'},
			],
	        area: [{name: '全部', value: ''}],
	        sort:[
				{name: '默认', value: ''},
				{name: '距离优先', value: '_score desc,distance asc'},
				{name: sotrName, value: '_score desc,rating desc,distance asc'},
	        ],
	        hot:[
				{name: '默认', value: ''},
				{name: '宝马', value: '宝马'},
				{name: '奥迪', value: '奥迪'},
				{name: '迈巴赫', value: '迈巴赫'},
				{name: '保时捷', value: '保时捷'},
				{name: '玛莎拉蒂', value: '玛莎拉蒂'},
				{name: '年检', value: '年检'},
				{name: '保养', value: '保养'},
				{name: '车轮', value: '车轮'},
				{name: '发动机', value: '发动机'},
				{name: '汽车美容', value: '汽车美容'},
	        ],
			biz:[
				{name: '全部', value: ''},
				{name: 'A1', value: 'A1'},
				{name: 'A2', value: 'A2'},
				{name: 'A3', value: 'A3'},
				{name: 'B1', value: 'B1'},
				{name: 'B2', value: 'B2'},
				{name: 'C1', value: 'C1'},
				{name: 'C2', value: 'C2'},
				// {name: 'C3', value: 'C3'},
				// {name: 'C4', value: 'C4'},
				{name: 'D', value: 'D'},
				{name: 'E', value: 'E'},
				{name: 'F', value: 'F'},
				// {name: 'M', value: 'M'},
				// {name: 'N', value: 'N'},
				// {name: 'P', value: 'P'},
			],
			schoolPoint:[
				{name: '全部', value: ''},
				{name: '驾校报名', value: '300'},
				{name: '学车基地', value: '301'},
			],
	        showBlock: '',
	        list:[],
			pointList:[],
	        listHeight: 0,
	        timer: null,
	        allLoaded: false,
	        clearList: true,
			loading: true,
			showHead: 'search',
			inputPlaceholder: '搜索：企业名、地址、品牌、服务内容',
			schoolBrand: ''

        }
    },
    computed: {
      q(){
        return this.search.q
      },
      show(){
        return !this.$route.query.compId
      },
	    mapType(){
      	    let type= '164'
		    switch (this.$route.name){
			    case 'base-map':{
			    	this.showHead= 'baseMap'
			    }
			    case 'school-map':{
			    	this.search.sort= '_score desc,rating desc,distance asc'
			    	this.inputPlaceholder= '搜索：驾校名、驾校地址'
				    type= '300'
				    break
			    }
			    default :{
				    type= '164'
			    }
		    }
		    this.search.type= type
			return type
	    },
      maintainListHistory(){
        // console.log('maintainListHistory')
        return this.$store.state.app.maintainListHistory
      },
    },
    watch:{
		show(isShow){
			if(isShow){
				this.calcHeight(this.height)
			}
			// this.$refs.slideBar.resetHeight()
		},
      q(val){
        let flag= true
        // this.search.hot=''
        for (let i in this.hot){
          if(val && this.hot[i].value== val) flag= false
        }
        if (flag) this.search.hot=''
      },
      height(val){
        // console.log('watch.height', val)
        this.calcHeight(val)

      },
      is4s(){
        this.clearList= true
        $(".maintainList .roll").scrollTop(0)
      },
      blur(){
        $('.search-input input').blur()
      },
	    originalLng(){
      	// console.log('originalLng')
      	    this.search.sort= ''
		    this.getCompList(true, true)
	    }
    },
    mounted(){
		// console.log('list.mounted')
		this.getArea()
	    this.getQuery()
      // this.calcHeight(this.height)
      // $(".roll").bind('touchmove',function(e){
      // 	// console.log('.roll-touchmove')
      //   e.stopPropagation();
      // })
	   //  $("body").on('touchmove', '.roll',function(e){
		//     // console.log('.roll-touchmove')
		//     e.stopPropagation();
		// })

	    document.querySelector(".roll").addEventListener("touchmove",function(){
		    event.stopImmediatePropagation();
	    },false);
    },
    activated(){
		// console.log('maintainList.activated')
		  this.getQuery()
    },
    methods:{
		getQuery(){
			// let query= this.$route.query
			// if(query){
			// 	switch(query.special){
			// 		case 'base':{
			// 			console.log('query.item', query.item)
			//
			// 			this.search= deepClone(search)
			// 			this.search.type= '300'
			// 			this.search.sort= '_score desc,rating desc,distance asc'
			// 			this.search.base= query.item.name.replace('驾校基地', '')
			// 			this.showHead= 'base'
			// 			this.getCompList(true, true, true)
			// 			setTimeout(()=>{
			// 				this.$emit('goMap', query.item)
			// 				this.$emit('renderMap', []);
			// 				this.renderMap([query.item], true)
			// 			},100)
			//
			// 		}
			// 		default:{
			//
			// 		}
			// 	}
			// }
			//
			// for(let key in query){
			// 	this.search[key]= this.$route.query[key]
			// }
		},
	    calcQuery(limit){
		    let is164= this.search.type== '164'
		    let query='?fl=pic,type,sid,name,addr,tel,distance,kw,lon,lat,bizScope,brand,category,grade,tag,rating,openHours,licenseNo'+
			    '&q='+ this.search.q +
			    '&page='+ (this.page-1) +','+ (limit ||this.limit)
		    let defaultSort= '_score desc,distance asc'
		    query+= ('&sort='+ (this.search.sort|| defaultSort))
		    if(this.nowLnglat.lng) query+=('&point='+this.nowLnglat.lat+','+this.nowLnglat.lng)
		    let fq='&fq=status:1+AND+tag:hxx+AND+type:'+ this.search.type, is4s=''
		    if(this.search.area && (is164 )) fq+= '+AND+areaKey:'+ this.search.area
		    if(this.search.is4s && is164){
			    is4s= (this.search.is4s=='yes' ? 'kw:4s': '-kw:4s')
			    fq+= '+AND+' + is4s
		    }
		    query += fq

		    return query
	    },
		calcHeight(height, time){
			// let lh= parseInt(height -
			// (document.querySelector(".search-input")?document.querySelector(".search-input").offsetHeight:0) -
			// (document.querySelector(".show")?document.querySelector(".show").offsetHeight: 0))
			let lh=0

			setTimeout(()=>{
				lh= parseInt(height -
					document.querySelector("#head1").offsetHeight- document.querySelector("#head2").offsetHeight)
				this.listHeight= (lh<0 ? 0 : lh)
			},time|| 100)

		},
		  tagIsOn( arrName, val ){
        if (this.search[arrName]==val)  return true
        else return false
      },
      switchBlock(val){
		    this.showBlock= val
        let self= this
        // setTimeout(function () {
          // console.log(document.querySelector(".show").offsetHeight)
          self.calcHeight(self.height)
        // },100)
      },
		select( arrName, val ){
			// console.log('select')
			this.search[arrName]= val
			switch(arrName){
				case 'hot':{
					this.search.q= val
					this.toQuery(true)
					break;
				}
				default :{
					this.toQuery(true)
				}
			}

			this.showBlock= 'button'
			// setTimeout(()=>{
				this.calcHeight(this.height)
			// },500)


		},
		toQuery(clearList){
		    // console.log(clearList)
		    this.clearList= clearList|| false
			// this.$emit('query', this.search, this.clearList);
			this.getCompList(clearList, clearList)
		},
		getCompList(clearPoint, clearList, hidePoint){
		    if(clearList) this.page=1
		    else this.page++
		    let query= this.calcQuery()
		    this.axiosQixiu({
			    baseURL: '/repair-proxy',
			    url: '/micro/search/company'+ query,
			    method: 'get',
		    }).then( (res) => {
		    	this.loading= false
			    let datas= res.data.content
			    if(clearList){
				    this.list= res.data.content
			    }else{
				    this.list= this.list.concat(res.data.content)
			    }
			    if(clearPoint){
				    this.pointList= []
			    }
			    let hasPoint= false
			    for (let i in datas) {
				    if(datas[i].kw.indexOf('4s')>=0) datas[i].is4s= true
				    hasPoint= false
				    for(let j in this.pointList){
					    if(this.pointList[j].sid== datas[i].sid){
						    hasPoint= true
						    break
					    }
				    }
				    if(!hasPoint) this.pointList.push(datas[i])
			    }

			    // this.calcPointList(res.data.content)
			    this.total= res.data.totalElements

			    if(clearList) $(".maintainList .roll").scrollTop(0)
			    if(this.page!=1) this.$refs.loadMore.onBottomLoaded()
			    if (this.list.length>= this.total){
				    this.allLoaded= true
			    }else this.allLoaded= false
			    // this.renderMap()
			    if(!hidePoint) this.renderMap(this.pointList)
		    })
	    },
	    getArea(){
		    this.axiosQixiu.get('/area/query').then( (res) => {
			    this.area.push(...res.data.items)
			    if(this.loading){
				    Indicator.open({
					    text: '请稍候...',
					    spinnerType: 'snake'
				    });
			    }
		    })
	    },
	    getBase(){
			if(this.$route.name=='school-map' && this.search.schoolPoint!= 300){
				this.axiosQixiu({
					baseURL: '/repair-proxy',
					url: '/micro/search/company?fl=sid,type,name,addr,lon,lat,brand&q=&page=0,10&point='+this.nowLnglat.lat+','+this.nowLnglat.lng+'&fq=status:1+AND+type:301',
					method: 'get',
				}).then( (res) => {
					this.renderMap(res.data.content, true)
				})
			}

	    },
	    dragend(){
			// console.log('dragend')
		    switch (this.$route.name){
			    case 'base-map':{
			    	break
			    }
			    default:{
				    this.showHead= 'search'
				    // this.search.schoolPoint= ''
				    // this.search.sort= ''
				    // this.search.base= ''
				    // this.search.area= ''
				    this.getCompList(true, true, this.search.schoolPoint=='301')
				    this.getBase()
			    }
		    }
	    },
      key(e) {
        if ( e.keyCode == 13 || e=='search') {
         this.toQuery(true)
        }
      },
      cancel(){
			// console.log('cancel')
        this.toLocation=0
        this.search.q='';
        this.search.area= ''
        this.search.sort= ''
        this.search. hot= ''
        this.toQuery(true)
      },
      clearHistory(){
        this.$store.commit('setMaintainListHistory', false)
      },
      goDetail(item){
			// let type= item.type.toString()
	      switch (this.type){
		      case 'remark':{
			      this.$router.push({path: '/remark-match', query: { corpId: item.sid }})
			      break;
		      }
		      default :{
			//       // this.$emit('goMap', item)
			//       this.$store.commit('setMaintainListHistory', false)
			      this.$store.commit('setMaintainListHistory', item)
			      this.$router.push({path:'/maintain', query:{compId: item.sid, distance: item.distance}})
		      }
	      }

      },
	    renderMap(pointList, renderMarker){

		    let iconNormal = new AMap.Icon({
			    image: "/img/maintain/icon-normal.png",
			    size: new AMap.Size(30, 30),
			    // imageOffset: new AMap.Size(11, 11),
			    imageSize: new AMap.Size(30, 30),
		    });
		    let icon4s = new AMap.Icon({
			    image: "/img/maintain/icon-4s.png",
			    size: new AMap.Size(30, 30),
			    // imageOffset: new AMap.Size(11, 11),
			    imageSize: new AMap.Size(30, 30),
		    });
		    let iconSchool = new AMap.Icon({
			    image: "/img/maintain/point-school.png",
			    size: new AMap.Size(30, 37),
			    // imageOffset: new AMap.Size(11, 11),
			    imageSize: new AMap.Size(30, 37),
		    });
		    let iconBase = new AMap.Icon({
			    image: "/img/maintain/point-base.png",
			    size: new AMap.Size(30, 37),
			    // imageOffset: new AMap.Size(11, 11),
			    imageSize: new AMap.Size(30, 37),
		    });

		    let markers= []
		    for (let i in pointList){
			    let point= pointList[i]
			    let type= point.type.toString()
			    let routeName= this.$route.name
			    let lngLat= new AMap.LngLat(point.lon|| this.nowLnglat.lng, point.lat|| this.nowLnglat.lat)
			    let marker= null, icon= null, callback= null, zIndex= 100

			    switch (type){
				    default :{
					    icon= point.is4s? icon4s: iconNormal
					    callback= (e)=>{
						    this.showHead= 'search'
						    this.goDetail(e.target.getExtData())
						    this.$emit('goMap', e.target.getExtData())
						    this.calcHeight(this.height)
					    }
				    }
			    }
			    marker= new AMap.Marker({
				    icon: icon,
				    offset: new AMap.Pixel(-16, -16),
				    position: lngLat,
				    extData: point,
				    zIndex: zIndex
			    })

			    marker.on('click', (e) => {
			    	// this.goDetail(e.target.getExtData())
				    callback(e)
			    })
			    markers.push(marker)
		    }

		    // console.log('markers', markers)

		    // if(renderMarker){
			 //    this.$emit('renderMarker', markers);
		    // }else{
			 //    this.$emit('renderClusterer', markers);
		    // }

		    this.$emit('renderMap', markers, renderMarker||false);

	    },
      focus(){
        this.showBlock= 'button'
		    this.isFocus=true

        this.toLocation=2
        // setTimeout(()=>{
          this.calcHeight(this.height)
          $("body").scrollTop(0)
        // },500)
      },
      isOpenTime(timeStr){
		    let sTime=0, eTime=0, now=0;
		    if(!timeStr) return true
        let timeStrs= timeStr.replace(/~/g,'-')
        timeStrs= timeStrs.replace(/ /g,'')
        timeStrs= timeStrs.replace(/：/g,':')
        timeStrs= timeStrs.replace(/;/g,':')
        // console.log(timeStrs)
        if(timeStrs.indexOf('-')<0 ||timeStrs.indexOf(':')<0) return true
        sTime= parseInt(timeStrs.split('-')[0].split(':')[0])*60+ parseInt(timeStrs.split('-')[0].split(':')[1])
        eTime= parseInt(timeStrs.split('-')[1].split(':')[0])*60+ parseInt(timeStrs.split('-')[1].split(':')[1])
        now= (new Date()).getHours()* 60+ (new Date()).getMinutes()
        // console.log(sTime, eTime, now)
        if(sTime <= now && now<= eTime) return true
        else return false
      },
      businessStatus(status){
        switch (status){
          case 1: return '营业中';
          case 2: return '停业';
          case 3: return '注销';
          case 4: return '空壳';
        }
      },
      getName(type){
		    if(!this.search[type]) return ''
		    for (let i in this[type]){
		      if(this.search[type]== (this[type][i].value || this[type][i].code)){
		        return this[type][i].name
          }
        }
      },
		gradeText(grade){
			let text= ''
			switch (grade){
				case 'AAA':{
					text= "质量信誉优良企业"
					break
				}
				case 'AA':{
					text= "质量信誉合格企业"
					break
				}
				case 'A':{
					text= "质量信誉基本合格企业"
					break
				}
				case 'B':{
					text= "质量信誉不合格企业"
					break
				}
				default :{
					text= "质量信誉未评级企业"
					break
				}
			}
			return text
		}
    }
}
</script>

<style scoped lang='less'>
  @blue-color: #FF9738;
  @bottom-border-color: #f2f2f2;
  .maintain-type{
	  width: 100%;
	  height: 30px;
	  line-height: 30px;
	  font-size: 14px;
	  border-bottom: 1px solid #f0f0f0;
	  position: fixed;
	  top: 0;
	  left: 0;
	  background-color: white;
	  li{
		  width: 33%;
		  height: 100%;
		  text-align: center;
		  color:  #9d9d9d;
		  display: inline-block;
		  img{
			  width: 20px;
			  vertical-align: middle;
		  }
	  }
	  li.on{
		  color: black;
	  }
  }
.maintainList>ul *{
  transition: all .5s;
}
.search-input{
  padding: 0 15px 15px 15px;
  border-bottom: 1px solid @bottom-border-color;
  position: relative;
  >*{
    font-size: 0;
  }
  .left{
    width: calc(100% - 40px);
    display: inline-block;
    position: relative;
    input{
      height: 30px;
      width: 100%;
      padding: 5px 10px 5px 28px;
      margin: 0;
      background: #f9f9f9 url("~@/assets/img/maintain/放大镜.png") no-repeat 6px center;
      background-size: 20px;
      border: 1px solid #e7e7e7;
      border-radius: 20px;
      font-size: 14px;
      text-align: left;
    }
    input:focus{
      /*border-color: @blue-color; */
    }
    input::-webkit-input-placeholder{
      color: #dddddd;
      font-size: 12px;
    }
    .query{
      width: 28px;
      height: 30px;
      position: absolute;
      left: 15px;
      top: 0;
    }
    .close{
      width: 16px;
      position: absolute;
      right: 10px;
      top: 7px;
    }
  }
  .left.on{
    width: 100%;
  }
  span{
    line-height: 30px;
    float: right;
    color: @blue-color;
    font-size: 16px;
    width: 40px;
    text-align: center;
  }
	.base-head{
		text-align: center;
		font-size: 14px;
	}
}
  .button{
    display: none;
    padding: 5px 30px 0 30px;
    border-bottom: 1px solid @bottom-border-color;
    width: 100%;
    text-align: center;
    >div{
      width: 25%;
      display: inline-block;
      img{
        height: 30px;
      }
    }
    .area-button{
      float: left;
    }
    .hot-button{
      float: right;
    }
  }
  .area-block, .sort-block, .hot-block{
    display: none;
    padding: 10px 10px 0 10px;
    border-bottom: 1px solid @bottom-border-color;
    min-height: 57px;
    .close{
      width: 24px;
      height: 24px;
      background: url("~@/assets/img/maintain/关闭2.png") no-repeat center center;
      background-size: 100% 100%;
      margin: 0 10px 10px 10px;
      display: inline-block;
      vertical-align: middle;
    }
    li{
      font-size: 12px;
      line-height: 24px;
      padding: 0 10px;
      border: 1px solid #c3c3c3;
      color: #888888;
      border-radius: 5px;
      display: inline-block;
      margin: 0 10px 10px 0;
      vertical-align: middle;
    }
    li.on{
      border-color: @blue-color;
      color: @blue-color;
    }
  }
  .show{
    display: block;
  }
  .roll{
    overflow: auto;
    position: relative;
  }
  .history, .com-list{
    padding: 10px 0 0 10px;
    .head{
      padding-right: 15px;
      line-height: 16px;
      font-size: 13px;
      color: #989898;
      vertical-align: middle;
      img{
        width: 12px;
        float: right;
      }
    }
    li {
      width: 100%;
      overflow: hidden;
      font-size: 13px;
      padding: 15px 10px 15px 0;
      border-bottom: 1px solid @bottom-border-color;
      .picWrap {
        float: left;
        width: 70px;
        height: 70px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .tag{
          width: 24px;
          height: auto;
          position: absolute;
          top: -1px;
          left: 10px;
        }
      }
      .info {
        margin-left: 80px;
        position: relative;
        >span{
          font-weight: 300;
          font-size: 12px;
          line-height: 19px;
          padding: 0 4px;
          color: white;
          background-color: @blue-color;
          position: absolute;
          top: 0;
          right: 0;
          border-radius: 2px;
        }
        >span.rest{
          background-color: #bebec0;
        }
	      >span.orange{
		      background: #fff7e6;
		      border: 1px solid #ffd591;
		      color: #fa8c16;
		      border-radius: 2px;
	      }
        p {
          font-size: 14px;
          margin-bottom: 0;
          margin-right: 30px;
          color: #000;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          span {
            /*color: red;*/
          }
	        small{
		        color: #9B9B9B;
		        font-size: 12px;
	        }
        }
        .stars {
          line-height: 14px;
          vertical-align: middle;
          margin: 6px 0;
          img {
            width: 14px;
            height: 14px;
            margin-right: 3px;
            float: left;
          }
          span {
            color: #989898;
            margin-left: 4px;
          }
        }
        .address {
          color: #666666;
          font-size: 12px;
          .miles {
            float: right;
          }
          .address_area {
            display: block;
            margin-right: 35px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
	      .item{
		      color: #666666;
		      font-size: 13px;
		      /*overflow: hidden;*/
		      /*text-overflow:ellipsis;*/
		      /*white-space: nowrap;*/
		      line-height: 16px;
	      }
      }
    }
    li:last-child{
      border: 0;
    }
  }
  .history{
    border-bottom: 14px solid @bottom-border-color;
  }
</style>
