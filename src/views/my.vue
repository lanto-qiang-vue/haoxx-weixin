<template>
<div class="my">
	<div class="above">
		<div class="head">
			<img :src="userinfo.userPic ||'/img/head.png'" @click="$refs.upload.clickBox()"/>
			<span>{{userinfo.nickName}} <i class="fa fa-pencil-square-o" @click="nickName"></i></span>
		</div>
		<div class="button">
			<router-link tag="div" to="/coupons-type"><span>{{couponsNum}}</span><p>我的卡券</p></router-link>
			<router-link tag="div" to="/my-reservation"><span>{{reservationNum}}</span><p>我的预约</p></router-link>
			<div><span>{{money.toFixed(2)}}<i></i></span><p>我的奖励</p></div>
		</div>
	</div>

	<ul class="list">
		<router-link tag="div" to="/etc-promoter" v-show="userinfo.isEtcPromoters" class="etc-promoter">
			<img src="~@/assets/img/obu/icon-v.png"/><span>ETC分享·30元专属特权奖励</span>
			<span class="more">查看详情</span><i></i>
		</router-link>
		<router-link tag="li" to="/my-awards">我的奖品 <i></i></router-link>
		<router-link tag="li" :to="myCarPath">我的爱车 <i></i></router-link>
		<router-link tag="li" to="/my/car-report" v-show="showReport">我的车史报告 <i></i></router-link>
		<router-link tag="li" to="/my-forum">我的车谈 <i></i></router-link>
		<router-link tag="li" to="/my-remark">我的点评 <i></i></router-link>
		<!--<router-link tag="li" to="/accredit-bind">更改授权 <i></i></router-link>-->
		<router-link tag="li" to="/setting">设置 <i></i></router-link>

	</ul>
	<div class="logout" @click="logout">退出</div>
	<popup-input ref="popupInput"></popup-input>
	<upload-img  ref="upload" backend="hxx" @done="getImg"></upload-img>
</div>
</template>

<script>
import PopupInput from '@/components/popup-input.vue'
import UploadImg from '@/components/compress-upload.vue'
// import { cityIsSupport} from '@/util'
export default {
	name: "my",
	components: {PopupInput, UploadImg},
	data(){
		return{
			couponsNum: 0,
			reservationNum: 0,
			myCarPath: '/car-list',
			showReport: false,
			money: 0
		}
	},
	computed:{
		userinfo(){
			return this.$store.state.user.userinfo
		},
		isShanghai(){
			return this.$store.state.app.city && this.$store.state.app.city.regionId
				&& this.$store.state.app.city.regionId.toString().substring(0, 3)=='310'
		},
		// cityIsSupport
	},
	mounted(){
		this.init()
	},
	methods:{
		init(){
			this.axiosHxx.post('/operate/coupon/mycoupons', {USER_ID:this.$store.state.user.userinfo.userId}).then(res => {
				if(res.data.success){
					let list= res.data.data
					for(let i in list){
						this.couponsNum+= parseInt(list[i].canuse)
					}
				}
			})

			this.axiosHxx.post('/operate/appoint/orders', {
				page: 1,
				limit: 1,
			}).then(res=>{
				this.reservationNum= res.data.total
			})

			this.axiosHxx.post('/cartalk/userinfo/queryRewardmoney',{}, {baseURL: '/hxx-gateway-proxy'}).then(res=>{
				if(res.data.success && res.data.data.rewardMoney){
					this.money= res.data.data.rewardMoney
				}
			})
			this.axiosQixiu.post( '/hxxdc/vehicle/bind/list', {
				pageNo: 1,
				pageSize: 1,
			},{hxxtoken: true}).then( (res) => {
				if(res.data.code=='0' &&res.data.total>0){
					this.myCarPath= '/car-list'
				}else{
					this.myCarPath= '/bind-car'
				}
			})
			this.axiosQixiu.get( '/hxxdc/activity/check/1',{hxxtoken: true, notoast: true}).then( (res) => {
				if(res.data.code=='0'){
					if(res.data.item) this.showReport= true
				}
			})
		},
		nickName(){
			this.$refs.popupInput.popup({title: '修改昵称', value: this.userinfo.nickName, maxlength: 10}).then(({status, value})=>{
				console.log(status, value)
				if(status){
					if(value){
						this.axiosHxx.post('/operate/account/updateNickName',{newName: value}).then(res=>{
							if(res.data.success){
								this.$store.commit('setNickName', value);
							}
						})
					}else{
						this.$toast('请输入内容');
					}
				}
			})
		},
		getImg({url, base64}){
			this.axiosHxx.post('/cartalk/userinfo/updateUserpic',{
				pic: url
			}, {baseURL: '/hxx-gateway-proxy'}).then(res=>{
				if(res.data.success){
					this.$store.commit('changeUserInfo', {userPic: base64});
					this.$toast('头像修改成功');
				}
			})
		},
		logout(){
			this.$messagebox({ message: '确定退出吗？', confirmButtonClass:'error-red',
				confirmButtonText:'退出', showCancelButton: true}).then(action => {
				switch (action){
					case 'confirm':{
						this.$store.commit('logout');
						this.$router.push('/login')
						break
					}
				}
			})
		}
	}
}
</script>

<style scoped lang="less">
.my{
	height: 100%;
	background-color: #F8F8F8;
	overflow: auto;
	.above{
		padding: 17px 12px;
		background:linear-gradient(133deg,#FF8E20 0%,#FF7324 100%,#F76B1C 100%);
		.head{
			height: 45px;
			line-height: 45px;
			font-size: 20px;
			color: white;
			img{
				height: 45px;
				width: 45px;
				object-fit: cover;
				border-radius: 100%;
				/*border: 2px solid white;*/
				margin-right: 10px;
			}
			i{
				font-size: 16px;
			}
		}
		.button{
			margin-top: 30px;
			position: relative;
			color: white;
			overflow: hidden;
			&>div{
				width: 33%;
				float: left;
				text-align: center;
				position: relative;
				span{
					font-size: 20px;
					font-weight: 600;
					i{
						font-style:normal;
						font-size: 16px;
						margin-left: 2px;
					}
				}
				p{
					color: white;
					font-size: 12px;
				}
				&:before{
					content: '';
					display: block;
					width: 1px;
					height: 30px;
					background-color: white;
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
				}
				&:last-child:before{
					display: none;
				}
			}

		}
	}
	.list{
		background-color: white;
		padding-left: 15px;
		li{
			padding-left: 15px;
			/*height: 41px;*/
			line-height: 40px;
			color: #333333;
			font-size: 16px;
			border-bottom: 1px solid #EDEDED;
			position: relative;
			i{
				position: absolute;
				right: 20px;
				top: 50%;
				border-right: 1px solid;
				border-bottom: 1px solid;
				width: 8px;
				height: 8px;
				color: #999;
				transform: translateY(-50%) rotate(-45deg);
			}
		}
		.etc-promoter{
			line-height: 35px;
			background: #EED7AD;
			box-shadow:0 2px 2px 0 rgba(255,218,191,0.44);
			border-radius:5px;
			padding: 0 10px;
			margin-top: 5px;
			left: -8px;
			/*margin-right: 10px;*/
			position: relative;
			*{
				vertical-align: middle;
			}
			img{
				width: 20px;
				margin-right: 5px;
			}
			span{
				color: #333333;
				font-size: 14px;
				font-weight: 600;
			}
			.more{
				line-height: 20px;
				font-weight: 400;
				font-size: 12px;
				position: absolute;
				right: 20px;
				top: 50%;
				color: #333333;
				transform: translateY(-50%);
			}
			i{
				position: absolute;
				right: 10px;
				top: 50%;
				border-right: 1px solid;
				border-bottom: 1px solid;
				width: 8px;
				height: 8px;
				color: #333333;
				transform: translateY(-50%) rotate(-45deg);
			}
		}
	}
	.logout{
		background-color: white;
		margin-top: 20px;
		line-height: 40px;
		text-align: center;
		color: #F4333C;
		font-size: 16px;
		border-bottom: 1px solid #EDEDED;
		border-top: 1px solid #EDEDED;
	}

}

</style>
<style lang="less">
.error-red{
	color: red;
}
</style>
