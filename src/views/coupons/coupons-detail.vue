<template>
<div class="coupons-detail">
	<ul class="coupons-list">
		<li>
			<div class="content">
				<div class="left">
					<p>修车抵用券</p>
					<span>有效期：2019.03.15-2019.03.15</span>
				</div>
				<i></i>
				<div class="right">
					<!--<div class="button on">查看详情</div>-->
					<div class="tag">
					<p>{{useList[use - 1]}}</p>
					</div>
					<!--<div class="times">-->
					<!--<p>已核销数</p>-->
					<!--<span>1690</span>-->
					<!--</div>-->
				</div>
			</div>
		</li>
	</ul>
	<Form class="common-form" :label-width="100" label-position="left" ref="form">
		<FormItem label="验证二维码" class="top-position">
			<div class="content">
				<!--<img id="qrcode" src="/static/img/coupons/head.png"/>-->
				<img id="qrcode" :src="img"/>
			</div>
		</FormItem>
		<FormItem label="优惠券兑换码">
			<Input v-model="detail.code" :readonly="true"></Input>
		</FormItem>
		<FormItem label="使用日期" v-show="use == 2">
			<Input v-model="detail.spendingDate" :readonly="true"></Input>
		</FormItem>
		<FormItem label="使用门店" v-show="use == 2">
			<Input v-model="detail.spendingCompanyName" :readonly="true"></Input>
		</FormItem>
		<FormItem label="门店地址" v-show="use == 2">
			<Input v-model="detail.spendingCompanyAddress" :readonly="true"></Input>
		</FormItem>
		<FormItem label="适用门店">
			<router-link tag="span" :to="'/coupons-coms?id='+detail.companyIds" class="ivu-input half select"></router-link>
		</FormItem>
	</Form>
	<Form class="common-form" :label-width="100" label-position="left" ref="form">
		<FormItem label="使用细则" ></FormItem>
		<FormItem class="top-position">
			<div class="content">
				<p class="coupons-rules">1､ 优惠券有使用期限限制，过了有效期不能使用；</p>
				<p class="coupons-rules">2､ 订单中包含特价商品时不能使用优惠券，优惠券不能与其他优惠（如促销活动）同时使用；</p>
				<p class="coupons-rules"> 3､ 优惠券只能抵扣订单金额，优惠金额超出订单金额部分不能再次使用，不能兑换现金；</p>
				<p class="coupons-rules"> 4､ 每个订单只能使用一张优惠券；</p>
			</div>
		</FormItem>
	</Form>
</div>
</template>
<script>
import qrcode from '~/public/static/lib/qrcode.js'
export default {
	name: "coupons-detail",
	data(){
		return{
		    code:'',
			use:1,
			// 1 已领取 2 已使用 3 已过期
			useList:['已领取','已使用','已过期'],
			detail:{
				name: 'ssssxxxx',
				code:'',
                companyIds:'',
			},
			img: ''
		}
	},
	methods:{
	    getList(code){
            this.axios.get('/promotion/user_coupon/'+code).then(res=>{
                  this.detail = res.data;
			});
		}
	},
	mounted(){
		this.detail.code = this.$route.query.code || '';
		this.use = this.$route.query.use;
		let qr = new qrcode({
            text: window.location.origin+'/#'+'/check-coupons?code='+this.detail.code
		});
        this.img =  qr.toDataURL("image/png");
        this.getList(this.detail.code);
	},
}
</script>

<style scoped lang="less">
.coupons-detail{
	min-height: 100vh;

	.common-form{
		border-bottom: 10px solid #F3F3F3;
		 .ivu-form-item .ivu-form-item-content > *{
			text-align: center;
			img{
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
.coupons-detail{
	.common-form .ivu-form-item .ivu-form-item-label{
		color: #666666;
	}
}
</style>
