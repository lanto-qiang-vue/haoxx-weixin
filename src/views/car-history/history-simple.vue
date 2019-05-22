<template>
<div class="history-simple">
	<div class="block">
		<div class="title">车辆档案</div>
		<ul class="form-list">
			<li><label>车架号</label><p>LSV**********3753</p></li>
			<li class="next"><label>排除重大事故</label>
				<p>106项<i class="fa fa-check-circle-o"></i></p>
				<p>5项<i class="zmdi zmdi-alert-circle-o"></i></p>
			</li>
		</ul>
	</div>
	<div class="block">
		<div class="title">车史报告</div>
		<ul class="tags">
			<li>
				<img />
				<p>正常保养</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default {
	name: "history-simple",

}
</script>

<style scoped lang="less">
.history-simple{
	.block{
		border-bottom: 10px solid #F3F3F3;
		padding: 10px 0 0 15px;
		.title{
			padding-left: 8px;
			position: relative;
			height: 20px;
			line-height: 20px;
			font-size: 16px;
			color: #333333;
			&:before{
				content: '';
				width: 4px;
				height: 18px;
				background-color: #FE8636;
				border-radius: 4px;
				position: absolute;
				left: 0;
				top: 1px;
			}
		}
		.form-list{
			li{
				line-height: 40px;
				border-bottom: 1px solid #EEEEEE;
				font-size: 14px;
				padding-right: 20px;
				position: relative;
				&.next:after{
					content: '';
					position: absolute;
					right: 10px;
					top: 15px;
					border-right: 1px solid #999999;
					border-bottom: 1px solid #999999;
					width: 10px;
					height: 10px;
					transform: rotate(-45deg);
				}
				&:last-child{
					border-bottom: none;
				}
				label{
					color: #666666;
				}
				p{
					float: right;
					margin: 0 5px;
					color: #999999;
					i{
						vertical-align: middle;
						font-size: 20px;
						margin-left: 5px;
					}
					.fa{
						color: #52C41A;
						-webkit-text-stroke: 1px white;
					}
					.zmdi{
						color: #FE8636;
					}
				}
			}
		}
	}
}
</style>
