<template>
<div class="discounts-list">
    <mt-datetime-picker
            ref="picker"
            type="date"
            @confirm="callback"
            v-model="pickerValue">
    </mt-datetime-picker>
    <div class="head">
		<div class="area" @click="openPicker">核销日期&nbsp;&nbsp;{{time}}</div><div v-show="time!= ''" @click="time = '',list = [],page = 1,getList(false)">x</div>
	</div>
    <mt-loadmore :bottom-method="loadMore" :bottom-all-loaded="allLoaded" :autoFill="false"
                 bottomPullText="加载更多"   ref="loadmore">
        <div style="clear:both;"></div>
    <div class="menu" v-for="item in list">
        <div class="use-header">
            <span class="use-header-left">{{item.name}}</span>
        </div>
        <Form class="common-form " :label-width="90"  label-position="left" ref="form">
            <FormItem label="有效期">
                <Input :value="item.startDate + '-' + item.endDate" placeholder="" :readonly="true"></Input>
            </FormItem>
            <FormItem label="优惠券兑换码">
                <Input :value="item.code" :readonly="true" placeholder="输入优惠券兑换码" class="form-input"></Input>
            </FormItem>
            <FormItem label="核销时间">
                <Input :value="item.spendingDate" placeholder="" :readonly="true"></Input>
            </FormItem>
        </Form>
    </div>
    </mt-loadmore>
</div>
</template>

<script>
import { MessageBox,DatetimePicker } from 'mint-ui';
export default {
	name: "coupons-use-detail",
	data(){
		return{
			detail: {
				code: '',
                date:'2019.03.15-2019.03.18'
			},
            pickerValue:new Date(),
            time:'',
			list:[],
            id:'',
			page: 1,
			total: 0,
			allLoaded: false,
		}
	},
	watch:{
		
	},
	mounted(){
		this.id = this.$route.query.id || "";
		this.getList(false);
	},
	methods:{
        loadMore(){
            this.page++;
            this.getList(true);
        },
	    getList(flag){
            let params={
                page: this.page-1,
                size: 10,
                type:this.id,
                spendingDate:this.time,
            }
            // /promotion/consume/coupon/query/company
            this.axios.get('/promotion/consume/coupon/query/company',{params:params}).then(res=>{
                this.total = res.data.totalElements
                if (res.data.content && res.data.content.length) {
                    this.list = this.list.concat(res.data.content)
                    if (this.list.length >= res.data.totalElements) {
                        this.allLoaded = true
                    } else {
                        this.allLoaded = false
                    }
                    if (flag) this.$refs.loadmore.onBottomLoaded()
                } else {
                    this.allLoaded = true
                }
            });
        },
        callback(value){
            this.time = this.toString(value);
            this.list = [];
            this.page = 1;
            this.getList(false);
        },
        toString(date){
            if(date == "") return "";
            return date.getFullYear() + "-" + this.fill((date.getMonth() + 1)) + "-" + this.fill(date.getDate());
        },
        fill(val){
	        if(parseInt(val) < 10) return '0'+val;
	        return val;
        },
        openPicker() {
            this.$refs.picker.open();
        }
	}
}
</script>

<style scoped lang="less">
.ivu-form-item-label{
                    color: #666  !important;
                }
.discounts-list{
	height: 100vh;
	overflow: auto;
	background-color: #F3F3F3;
	.head{
		padding: 7px 15px;
		width: 100%;
		background-color: white;
        overflow:hidden;
        margin-bottom:8px;
		.area{
			color: #333333;
			font-size: 14px;
			position: relative;
			float: left;
			padding-right: 12px;
			line-height: 26px;
			margin-right: 20px;
			&:after{
				position: absolute;
				right: 0;
				top: 10px;
				content: '';
				width: 0;
				height: 0;
				border-width: 4px;
				border-style: solid;
				border-color: #9A9A9A transparent transparent;
			}
		}
	}
    .menu{
        background: white;
        margin-bottom: 8px;
        .common-form{
            border-bottom: 0;
            .ivu-form-item:last-child{
                border-bottom: none;
            }
            
                .ivu-form-item-label{
                    color: #666  !important;
                }
            
            
            
            .form-input{
                width: 100%;
                padding-right: 82px;
            }
        }
        .use-header{
            overflow: hidden;
            padding: 10px 15px 5px 15px;
            span{
                font-weight:400;
                height:22px;
                line-height:22px;
            }
            .use-header-left{
                float: left;
                font-size:16px;
                color:rgba(51,51,51,1);
            }
            .use-header-right{
                float: right;
                font-size:14px;
                color:rgba(102,102,102,1);
            }
        }
    }

}

</style>
<style lang="less">

.discounts-list{
    .common-form .ivu-form-item .ivu-form-item-label{
        color: #666;
    }
}

</style>
