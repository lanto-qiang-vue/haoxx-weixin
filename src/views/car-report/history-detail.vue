<template>
<div class="history-detail">
	<div class="block piece">
		<div class="title">车身损伤分析</div>
		<ul class="form-list">
			<div class="sub-title">事故维修排查</div>
			<li><label>车架号</label><p>LSV**********3753</p></li>
			<li class="next"><label>排除重大事故</label>
				<p>106项<i class="fa fa-check-circle-o"></i></p>
				<p>5项<i class="zmdi zmdi-alert-circle-o"></i></p>
			</li>
		</ul>
	</div>
	<div class="block piece">
		<div class="title">维修保养记录明细</div>
		<ul class="timeline">
			<li>
				<div class="head">
					<p>2019-03-23</p>
					153035公里
					<span>保养</span>
				</div>
				<p>细节：A6 3.0 4F80VL机油机滤更换与全面检查</p>
				<p>门店：衡虎汽车有限公司</p>
			</li>
			<li>
				<div class="head">
					<p>2019-03-23</p>
					153035公里
					<span>保养</span>
				</div>
				<p>细节：A6 3.0 4F80VL机油机滤更换与全面检查</p>
				<p>门店：衡虎汽车有限公司</p>
			</li>
		</ul>
	</div>

	<mt-popup
			v-model="popupVisible"
			position="right"
			popup-transition="popup-fade">
		<div class="block popup-block">
			<ul class="form-list">
				<li><label>车架号</label><p>LSV**********3753</p></li>
				<li class="next"><label>排除重大事故</label>
					<p>106项<i class="fa fa-check-circle-o"></i></p>
					<p>5项<i class="zmdi zmdi-alert-circle-o"></i></p>
				</li>
			</ul>
		</div>
	</mt-popup>

</div>
</template>

<script>
export default {
	name: "history-detail",
	data(){
		return {
			popupVisible: true
		}
	}
}
</script>

<style scoped lang="less">
@import "./report.less";
.history-detail{
	.timeline{
		margin: 10px 0;
		padding: 0 20px;
		position: relative;
		&:before{
			content: '';
			display: block;
			width: 2px;
			height: 100%;
			background-color: #FE8636;
			left: 18px;
			top: 0;
			position: absolute;
		}
		li{
			padding-left: 10px;
			margin-bottom: 20px;
			position: relative;
			&:before{
				content: '';
				display: block;
				width: 8px;
				height: 8px;
				background-color: white;
				border: 1px solid #FE8636;
				border-radius: 100%;
				position: absolute;
				left: -5px;
				top: 6px;
			}
			&:last-child{
				margin: 0;
			}
			.head{
				line-height: 20px;
				font-size: 14px;
				color: #333333;
				text-align: center;
				p{
					float: left;
				}
				span{
					float: right;
					color: #FE8636;
				}
			}
			>p{
				margin-top: 5px;
				line-height: 16px;
				color: #666666;
			}
		}
	}

	.popup-block{
		height: 100vh;
		background-color: white;
		width: 80vw;
		overflow: auto;
		padding-top: 0;
		border: 0;
	}
}
</style>
