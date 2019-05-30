<template>
    <div class="car-list">
        <div class='search'>
            <search placeholder="搜索车牌号码" @enter="enter" v-model="vehicle" ref="search"></search>
        </div>
        <div class="load-more" :style="showButton?{}:{paddingBottom: 0}">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"
                         bottomPullText="加载更多" ref="loadmore">
                <ul class="list">
                    <li v-for="(item, key) in list" :key="key" @click="$emit('select', item)">
                        <div class="head">
                            {{item.vehiclePlateNumber}}
	                        <!--<span class="status">审核通过</span>-->
                        </div>
                        <p>
	                        <label>车架号：</label>{{item.vin}}
                            <a class="unbind" @click="unbind(item, key)" v-if="showButton">删除</a>
                        </p>
                        <p>
	                        <label>所有人：</label>{{item.ownerName}}
	                        <a class="button on" v-show="item.self" @click="self(item, key)" v-if="showButton">
		                        本人车辆<i class="zmdi zmdi-check-circle"></i>
	                        </a>
	                        <a class="button" v-show="!item.self" @click="self(item, key)" v-if="showButton">设为本人车辆</a>
                        </p>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
        <div class="common-submit" v-if="showButton">
            <router-link class="on" to="/bind-car">添加爱车</router-link>
        </div>
    </div>
</template>

<script>
import Search from '@/components/common-search.vue'
export default {
	name: "car-list",
	components: { Search},
	props: {
		'showButton': {
			default: true
		},
	},
	data(){
		return{
			vehicle: '',
			list: [],
			page: 1,
			total: 0,
			allLoaded: false
		}
	},
	mounted(){
		this.getList()
	},
	methods:{
		getList(flag){
			this.axiosQixiu.post( '/hxxdc/vehicle/bind/list', {
				vehiclePlateNumber: this.vehicle,
				pageNo: this.page,
				pageSize: 10,
			},{hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					if(flag) this.$refs.loadmore.onBottomLoaded()
					else this.list=[]
					this.total= res.data.total
					if(res.data.items&&res.data.items.length){
						let arr= res.data.items
						this.list= this.list.concat(arr)
						if(this.list.length>=res.data.total){
							this.allLoaded=true
						}else{
							this.allLoaded=false
						}
					}else{
						this.allLoaded=true
					}
				}
			})
		},
		unbind(item, key){
			this.$messagebox.confirm('确定删除?').then(action => {
				// console.log('action', action)
				this.axiosQixiu.post( '/hxxdc/vehicle/remove/bind/'+ item.id, {},{hxxtoken: true}).then( (res) => {
					if(res.data.code=='0'){
						this.list.splice(key, 1)
						// this.getList()
					}
				})
			});
		},
		self(item, key){
			let status= !item.self
			this.axiosQixiu.post( '/hxxdc/vehicle/self', {
				id: item.id,
				self: status
			},{hxxtoken: true}).then( (res) => {
				if(res.data.code=='0'){
					this.list[key].self= status
				}
			})
		},
		enter(){
			this.page= 1
			this.getList()
		},
		loadBottom() {
			this.page++
			this.getList(true)
		},
	}
}
</script>

<style scoped lang="less">
.car-list {
    background-color: #fff;
    height: 100vh;
    overflow: auto;
    width: 100%;
    box-sizing: border-box;
    .search {
        width: 100%;
        background: #fff;
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 5px 15px;
        /*border-bottom: 10px #F3F3F3 solid;*/
    }
    .load-more {
        height: 100vh;
        padding-top: 40px;
        padding-bottom: 60px;
        overflow: auto;
        .list {
            border-top: 10px solid #F3F3F3;
            li {
	            border-bottom: 10px solid #F3F3F3;
	            font-size: 14px;
	            padding: 10px 0 10px 15px;
                .head{
					color: #333333;
	                font-size: 16px;
	                padding-right: 15px;
	                border-bottom: 1px solid #D9D9D9;
	                line-height: 30px;
	                .status{
		                display: inline-block;
		                font-size: 14px;
		                color: #666666;
		                float: right;
		                position: relative;
		                padding-right: 15px;
		                /*line-height: 24px;*/
		                &:after{
			                content: '';
			                position: absolute;
			                right: 5px;
			                top: 10px;
			                border-right: 1px solid #999999;
			                border-bottom: 1px solid #999999;
			                width: 10px;
			                height: 10px;
			                transform: rotate(-45deg);
		                }
	                }
                }
                p {
	                line-height: 30px;
                    color: #666666;
	                padding-right: 15px;
	                overflow: hidden;
                    label {
                        color: #999999;
                    }
	                .unbind{
		                float: right;
		                color: #F4333C;
	                }
	                .button{
		                display: inline-block;
		                float: right;
		                color: #666666;
		                line-height: 24px;
		                border: 1px solid #666666;
		                padding: 0 15px;
		                border-radius: 18px;
		                margin-top: 2px;
		                i{
			                display: none;
			                font-size: 16px;
			                margin-left: 5px;
		                }
		                &.on{
			                color: #FF9738;
			                border: 1px solid #FF9738;
			                i{
				                display: inline-block;
			                }
		                }
	                }
                }
            }
        }
    }
}
</style>
