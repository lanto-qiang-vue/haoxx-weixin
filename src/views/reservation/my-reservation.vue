<template>
<div class="my-reservation">
	<ul class="select">
		<li @click="clickDatetime">{{ dates || '预约时间'}}<i class="fa fa-caret-down"></i></li>
		<li @click="showRadio=true">{{typeLabel || '预约类型'}}<i class="fa fa-caret-down"></i></li>
	</ul>
	<mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
	             bottomPullText="加载更多"   ref="loadmore">
		<ul class="list">
			<li v-for="item in list" tag="a" @click="go(item)">
				<div class="head">
					<label>{{ unit[item.REPAIR_TYPE]}}</label>
					<span class="status">{{unit[item.STATUS]}}</span>
				</div>
				<p><label>预约时间：</label>{{`${item.ORDER_DATE} ${item.ORDER_TIME}`}}</p>
				<p><label>车牌号：</label>{{item.PLATE_NUM}}</p>
			</li>
		</ul>
	</mt-loadmore>

	<mt-datetime-picker
			ref="datetime"
			@cancel="date='';list=[];getList(false)"
			@confirm="date= $event;list=[];getList(false)"
			:startDate="new Date('2019/1/1')"
			:endDate="endDate"
			type="date"
			year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日">
	</mt-datetime-picker>

	<mt-popup v-model="showRadio"
	          position="bottom"
	          style="width: 100%"
	          pop-transition="popup-fade" >
		<div class="popupBlock">
			<mt-radio
					@click.native="showRadio= false"
					align="right"
					v-model="type"
					:options="typeList">
			</mt-radio>
		</div>
	</mt-popup>
</div>
</template>

<script>
import SelectRadio from '@/components/select-radio.vue'
import { formatDate} from '@/util.js'
export default {
	name: "my-reservation",
	components: {SelectRadio },
	data(){
		return{
			list:[],
			date: '',
			type:'',
			page: 1,
			total: 0,
			allLoaded: false,
			showRadio: false
		}
	},
	computed:{
		typeList(){
			let list= this.$store.state.user.unit, typeList=[{label: '全部', value: '0', checked: false}]
			for(let key in list){
				if(key.substring(0,4)=='1019'){
					typeList.push({
						value: key,
						label: list[key],
						checked: false
					})
				}
			}
			return typeList
		},
		typeLabel(){
			let label= ''
			if(this.type && this.typeList.length){
				for(let i in this.typeList){
					if(this.typeList[i].value== this.type){
						label= this.typeList[i].label
						break
					}
				}
			}
			return label
		},
		dates(){
			return formatDate(this.date)
		},
		endDate(){
			let now=new Date(), end=new Date();
			end.setFullYear(now.getFullYear()+1);
			return end
		},
		unit(){
			return this.$store.state.user.unit
		}
	},
	watch:{
		type(val){
			this.list= []
			this.getList(false)
		}
	},
	mounted(){
		this.getList(false)
	},
	methods:{
	    go(item){
	      this.$router.push({path:'/reservation-detail', query:{ ...item}});
		},
		getList(flag){
			let data={
				page: this.page,
				limit: 10,
				date: formatDate(this.date).replace(/\//g,'-'),
				repairType: this.type=='0'? '': this.type
			}
			// if(this.selected) params.hasRead= this.selected
			this.axiosHxx.post('/operate/appoint/orders', data).then(res=>{
				this.total= res.data.total
				if(res.data.data&&res.data.data.length){
					this.list=this.list.concat(res.data.data)
					// this.list=res.data.comments
					if(this.list.length>=res.data.total){
						this.allLoaded=true
					}else{
						this.allLoaded=false
					}
					if(flag) this.$refs.loadmore.onBottomLoaded()
				}else{
					this.$toast('暂无数据')
					this.allLoaded=true
				}
			})
		},
		loadMore(){
			this.page++
			this.getList(true)
		},
		clickDatetime(){
	    	this.$refs.datetime.open()
		},
	}
}
</script>

<style scoped lang="less">
.my-reservation{
	height: 100vh;
	overflow: auto;
	/*background-color: #F3F3F3;*/
	.select{
		position: fixed;
		top: 0;
		left: 0;
		border-bottom: 1px solid #EDEDED;
		width: 100%;
		padding: 0 10px;
		background-color: white;
		z-index: 1;
		li{
			color: #666666;
			margin-right: 10px;
			line-height: 40px;
			float: left;
			position: relative;
			font-size: 14px;
			i{
				margin-left: 5px;
			}
		}
	}
	.list{
		margin-top: 40px;
		padding-left: 15px;
		li{
			background-color: white;
			border-bottom: 1px solid #EDEDED;
			padding: 10px 0;
			.head{
				line-height: 30px;
				font-size: 14px;
				font-weight: 600;
				color: #333333;
				label{
					color: #666666;
				}
				.status{
					float: right;
					color: #FF9738;
					margin-right: 15px;
					padding-right: 10px;
					position: relative;
					&:after{
						content: '';
						position: absolute;
						right: 0;
						top: 50%;
						border-right: 1px solid;
						border-bottom: 1px solid;
						width: 8px;
						height: 8px;
						color: #999;
						transform: translateY(-50%) rotate(-45deg);
					}
				}
			}
			p{
				font-size: 13px;
				line-height: 22px;
				color: #666666;
				label{
					/*color: #999999;*/
				}
			}
		}
	}
}
</style>
<style lang="less">
.my-reservation{
	.select{
		.select-radio {
			width: auto;
			label{
				line-height: 40px;
			}
		}
	}
}
</style>
