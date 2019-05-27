<template>
    <div class="car-list">
        <div class='search'>
            <search placeholder="搜索车牌号码" @enter="enter" v-model="vehicle" ref="search"></search>
        </div>
        <div class="load-more">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"
                         bottomPullText="加载更多" ref="loadmore">
                <ul class="list">
                    <li>
                        <div class="box-top">
                            <div style="float:left;"><b>沪A12345</b></div>
                            <div class="check">审核通过<i
                                    class="icon"></i></div>
                            <div style="clear:both;"></div>
                        </div>
                        <div class="content">
                            <p><label>车架号&nbsp;：</label>LGS37123456HG8876</p>
                            <div class="unbind">解绑</div>
                        </div>
                        <div class="content">
                            <p><label>所有人&nbsp;：</label>张三</p>
                            <div :class="['button']">
                                设为本人车辆
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="box-top">
                            <div style="float:left;"><b>沪A12345</b></div>
                            <div class="check">审核通过<i
                                    class="icon"></i></div>
                            <div style="clear:both;"></div>
                        </div>
                        <div class="content">
                            <p><label>车架号&nbsp;：</label>LGS37123456HG8876</p>
                            <div class="unbind">解绑</div>
                        </div>
                        <div class="content">
                            <p><label>所有人&nbsp;：</label>张三</p>
                            <div :class="['button','self']">
                                本人车辆&nbsp;&nbsp;&nbsp;<i class="zmdi zmdi-check-circle"></i>
                            </div>
                        </div>
                    </li>

                </ul>
            </mt-loadmore>
        </div>
        <div class="common-submit">
            <router-link class="on" to="/bind-car">新增绑定车辆</router-link>
        </div>
    </div>
</template>

<script>
import Search from '@/components/common-search.vue'
export default {
	name: "car-list",
	components: { Search},
	data(){
		return{
			vehicle: '',
			list: [
			],
			page: 1,
			total: 0,
			allLoaded: false
		}
	},
	methods:{
		getList(flag){
			this.axiosHxx.post( '/hxxdc/vehicle/bind/list', {
				page: this.page,
				offset: 10,
			},{baseURL: '/hxx-gateway-proxy'}).then( (res) => {
				if(flag) this.$refs.loadmore.onBottomLoaded()
				else this.list=[]
				this.total= res.data.total
				if(res.data.data&&res.data.data.length){
					let arr= res.data.data
					this.list= this.list.concat(arr)
					if(this.list.length>=res.data.total){
						this.allLoaded=true
					}else{
						this.allLoaded=false
					}
				}else{
					this.allLoaded=true
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
                    padding: 10px 15px;
                    p {
                        color: #666666;
                        label {
                            color: #999999;
                        }
                    }
                    .icon {
                        position: absolute;
                        right: 0px;
                        top: 50%;
                        border-right: 1px solid;
                        border-bottom: 1px solid;
                        width: 10px;
                        height: 10px;
                        color: #999;
                        transform: translateY(-50%) rotate(-45deg);
                    }
                    .box-top {
                        width: 100%;
                        border-bottom: 1px solid #D9D9D9;
                        padding-bottom: 5px;
                        .check {
                            float: right;
                            color: #666666;
                            position: relative;
                            padding-right: 20px;
                        }
                    }
                    .content {
                        line-height: 30px;
                        padding-top: 4px;
                        position: relative;
                        .unbind {
                            color: red;
                            position: absolute;
                            right: 20px;
                            top: 4px;
                        }
                        .button {
                            position: absolute;
                            right: 20px;
                            top: 7px;
                            border-radius: 10px;
                            border: 1px solid #666666;
                            width: 117px;
                            text-align: center;
                            line-height: 24px;
                        }
                        .self{
                          top:4px;border:1px solid #FF9738;color:#FF9738;
                        }
                    }
                }
            }
        }
    }
</style>
