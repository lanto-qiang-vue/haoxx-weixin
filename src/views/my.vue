<template>
<div class="my">
	<div class="above">
		<div class="head">
			<img :src="'/img/head.png'"/>
			<!--<span>183***1358</span>-->
			<span>{{userinfo.nickName}}</span>
		</div>
		<div class="button">
			<router-link tag="div" to="/"><span>1</span><p>我的卡券</p></router-link>
			<router-link tag="div" to="/my-reservation"><span>2</span><p>我的预约</p></router-link>
			<i></i>
		</div>
	</div>
	<ul class="list">
		<router-link tag="li" to="/my-car-list">我的爱车 <i></i></router-link>
		<router-link tag="li" to="/my-remark">我的点评 <i></i></router-link>
		<router-link tag="li" to="/accredit-bind">更改授权 <i></i></router-link>
		<router-link tag="li" to="/setting">设置 <i></i></router-link>
		<li @click="logout">退出</li>
	</ul>
</div>
</template>

<script>
export default {
	name: "my",
	computed:{
		userinfo(){
			return this.$store.state.user.userinfo
		}
	},
	methods:{
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
	.above{
		padding: 17px 12px;
		background:linear-gradient(133deg,#FF8E20 0%,#FF7324 100%,#F76B1C 100%);
		.head{
			height: 45px;
			line-height: 45px;
			font-size: 20px;
			color: white;
			img{
				height: 100%;
				width: auto;
				border-radius: 100%;
				/*border: 2px solid white;*/
				margin-right: 10px;
			}
		}
		.button{
			margin-top: 30px;
			position: relative;
			color: white;
			overflow: hidden;
			&>div{
				width: 50%;
				float: left;
				text-align: center;
				span{
					font-size: 20px;
					font-weight: 600;
				}
				p{
					color: white;
					font-size: 12px;
				}
			}
			i{
				display: block;
				width: 1px;
				height: 30px;
				background-color: white;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
	.list{
		padding-left: 15px;
		li{
			padding-left: 15px;
			height: 55px;
			line-height: 54px;
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
				width: 10px;
				height: 10px;
				color: #999;
				transform: translateY(-50%) rotate(-45deg);
			}
		}
	}

}

</style>
<style lang="less">
.error-red{
	color: red;
}
</style>
