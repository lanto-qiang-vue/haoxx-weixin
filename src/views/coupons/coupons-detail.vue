<template>
<div class="coupons-detail">
	<ul class="coupons-list">
		<li>
			<div class="content">
				<div class="left">
					<p>{{detail.name}}</p>
					<span>有效期：{{formatDate(detail.begin_time)}}-{{formatDate(detail.end_time)}}</span>
					<span style="margin: 0" v-if="license">限用车牌：{{license}}</span>
				</div>
				<i></i>
				<div class="right">
					<!--<div class="button on">查看详情</div>-->
					<div class="tag">
					<p>{{useList[parseInt(detail.type)]}}</p>
					</div>
					<!--<div class="times">-->
					<!--<p>已核销数</p>-->
					<!--<span>1690</span>-->
					<!--</div>-->
				</div>
			</div>
		</li>
	</ul>
	<Form class="common-form" :label-width="90" label-position="left" ref="form">
		<!--<FormItem label="验证二维码" class="top-position" >-->
		<FormItem label="验证二维码" class="top-position" v-show="detail.isuse == 1">
			<div class="content">
				<img id="qrcode" :src="img"/>
			</div>
		</FormItem>
		<FormItem label="优惠券兑换码">
			<Input v-model="detail.code" :readonly="true"></Input>
		</FormItem>
		<FormItem label="使用日期" v-show="detail.isuse == 2">
			<Input v-model="detail.spending_time" :readonly="true"></Input>
		</FormItem>
		<FormItem label="使用门店" v-show="detail.isuse == 2">
			<span class="line">{{detail.tenantName}}</span>
		</FormItem>
		<FormItem label="门店地址" v-show="detail.isuse == 2">
			<span class="line">{{detail.tenantAdd}}</span>
		</FormItem>
		<FormItem label="适用门店">
			<router-link tag="span" :to="'/coupons-coms?road_license='+detail.ROAD_LICENSE" class="ivu-input half select"></router-link>
		</FormItem>
	</Form>
	<Form class="common-form" :label-width="100" label-position="left" ref="form">
		<FormItem label="使用细则" ></FormItem>
		<FormItem class="top-position">
			<div class="content">
				<p class="coupons-rules">1､ 优惠券有使用期限限制，过了有效期不能使用；</p>
				<p class="coupons-rules">2､ 订单中包含特价商品时不能使用优惠券，优惠券不能与其他优惠（如促销活动）同时使用；</p>
				<p class="coupons-rules">3､ 优惠券只能抵扣订单金额，优惠金额超出订单金额部分不能再次使用，不能兑换现金；</p>
				<p class="coupons-rules">4､ 每个订单只能使用一张优惠券；</p>
			</div>
		</FormItem>
	</Form>
</div>
</template>
<script>
import qrcode from '~/public/lib/qrcode.js'
import {formatDate} from '@/util.js'
export default {
	name: "coupons-detail",
	data(){
		return{
			detail:{},
			useList:['未领用','已领取','已使用','已过期'],
			img: ''
		}
	},
	computed:{
		query(){
			return this.$route.query
		},
		license(){
			return this.detail.note? this.detail.note.license: ''
		}
	},
	mounted(){
		let qr = new qrcode({
			text: window.location.origin
		});
		this.img =  qr.toDataURL("image/png");
		this.getData()
	},
	methods:{
	    getData(){
		    this.axiosHxx.post('/operate/coupon/returncouponmsg', {
			    code: this.query.code,
			    BUSINESS_TYPE: 1
		    }).then(res => {
				if(res.data.success){
					this.detail= res.data.data
				}
		    })
		},
		formatDate: formatDate
	},
}
</script>

<style scoped lang="less">
.coupons-detail {
    min-height: 100vh;
    .common-form {
        border-bottom: 10px solid #F3F3F3;
        .content {
            text-align: center;
            img {
                width: 160px;
                height: 160px;
                margin-bottom: 10px;
            }
        }
    }
}

@import "./coupons.less";
</style>
<style lang="less">
    .coupons-detail {
        .common-form .ivu-form-item .ivu-form-item-label {
            color: #666666;
        }
    }
</style>
