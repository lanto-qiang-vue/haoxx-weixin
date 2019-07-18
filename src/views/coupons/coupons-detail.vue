<template>
<div class="coupons-detail">
	<ul class="coupons-list">
		<li>
			<div class="content">
				<div class="left">
					<p>{{(detail.name|| '') + discTest}}</p>
					<span>有效期：{{formatDate(detail.begin_time)}}-{{formatDate(detail.end_time)}}</span>
					<span style="margin: 0" v-show="license">限用车牌：{{license}}</span>
				</div>
				<i></i>
				<div class="right">
					<div class="right">
						<div class="type">
							<h3>{{detail.coupontype}}</h3>
							<p>{{useList[parseInt(detail.isuse)]}}</p>
						</div>
					</div>
				</div>
			</div>
		</li>
	</ul>
	<Form class="common-form" :label-width="90" label-position="left" ref="form">
		<!--<FormItem label="验证二维码" class="top-position" >-->
		<FormItem label="验证二维码" class="top-position" v-show="detail.isuse == 1 && img">
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
		<FormItem label="使用途径" v-show="detail.way">
			<span class="line">{{detail.way}}</span>
		</FormItem>
		<FormItem label="预约门店">
			<router-link tag="span" class="ivu-input half select"
			             :to="`/coupons-coms?road_license=${detail.ROAD_LICENSE}&coupon=${query.code}`"></router-link>
		</FormItem>
	</Form>
	<Form class="common-form" :label-width="100" label-position="left" ref="form">
		<FormItem label="使用细则" ></FormItem>
		<FormItem class="top-position" v-if="detail.content">
			<div class="text" v-html="detail.content.replace(/\n/g, '<br/>')">
			<!--<div class="text" v-html="text">-->
				<!--<p class="coupons-rules">1､ 优惠券有使用期限限制，过了有效期不能使用；</p>-->
				<!--<p class="coupons-rules">2､ 订单中包含特价商品时不能使用优惠券，优惠券不能与其他优惠（如促销活动）同时使用；</p>-->
				<!--<p class="coupons-rules">3､ 优惠券只能抵扣订单金额，优惠金额超出订单金额部分不能再次使用，不能兑换现金；</p>-->
				<!--<p class="coupons-rules">4､ 每个订单只能使用一张优惠券；</p>-->
			</div>
		</FormItem>
	</Form>
</div>
</template>
<script>
import qrcode from '~/public/lib/qrcode.js'
import {formatDate, getLocation} from '@/util.js'
export default {
	name: "coupons-detail",
	data(){
		return{
			detail:{},
			useList:['未领用','可使用','已使用','已过期'],
			img: '',
		}
	},
	computed:{
		query(){
			return this.$route.query
		},
		license(){
			return this.detail.note? this.detail.note.license: ''
		},
		discTest(){
			let num= parseFloat(this.detail.discount|| 0), text=''
			if(this.detail.use_type== 10561003){
				text= num*10 + '折'
			}else if(this.detail.use_type== 10561004){
				text= num + '元'
			}
			return text
		}
	},
	mounted(){
		getLocation().then((success)=>{
			if(success){
				let qr = new qrcode({
					text: JSON.stringify({
						code: this.query.code,
						...this.$store.state.app.location
					})
				});
				this.img =  qr.toDataURL("image/png");
			}else{
				this.$toast('请打开定位后刷新，获取二维码')
			}
		})

		this.getData()
	},
	methods:{
	    getData(){
		    // Promise.all([ this.axiosHxx.post('/operate/coupon/returncouponmsg', {
			 //    code: this.query.code,
			 //    BUSINESS_TYPE: 1
		    // }), getLocation()]).then(([resData, locationSuccess ]) => {
			 //    if(resData.data.success){
				//     this.detail= resData.data.data
				//     if(locationSuccess){
				// 	    let qr = new qrcode({
				// 		    text: JSON.stringify({
				// 			    code: this.query.code,
				// 			    ...this.$store.state.app.location
				// 		    })
				// 	    });
				// 	    this.img =  qr.toDataURL("image/png");
				//     }else{
				// 	    this.$toast('请打开定位获取二维码')
				//     }
			 //    }
		    // });
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
	.orange{
		background-color:#ffaa6a;
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
