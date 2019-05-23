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
				<img src="~@/assets/img/history/正常保养.png"/>
				<p>正常保养</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li>
				<img src="~@/assets/img/history/非火烧.png"/>
				<p>非火烧</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li>
				<img src="~@/assets/img/history/非泡水.png"/>
				<p>非泡水</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li class="err">
				<img src="~@/assets/img/history/里程数.png"/>
				<p>里程数</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li>
				<img src="~@/assets/img/history/安全气囊无弹开.png"/>
				<p>安全气囊无弹开</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li>
				<img src="~@/assets/img/history/无发动机维修.png"/>
				<p>无发动机维修</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
			<li>
				<img src="~@/assets/img/history/无变速箱维修.png"/>
				<p>无变速箱维修</p>
				<i class="zmdi zmdi-check-circle"></i>
				<i class="zmdi zmdi-alert-circle"></i>
			</li>
		</ul>
	</div>
	<div class="block">
		<div class="title">车主爱惜度</div>
		<ul class="form-list">
			<li><label>最后一次保养时间</label><p>2019-03-23</p></li>
			<li><label>最后一次保养时间</label><p>2019-03-23</p></li>
			<li><label>最后一次保养时间</label><p>2019-03-23</p></li>
			<li><label>最后一次保养时间</label><p>2019-03-23</p></li>
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
@import "./history.less";
.history-simple{
	.tags{
		padding-top: 20px;
		padding-right: 15px;
		overflow: hidden;
		li{
			width: 25%;
			float: left;
			text-align: center;
			color: #666666;
			margin-bottom: 20px;
			position: relative;
			padding: 0 5px;
			img{
				width: 36px;
				height: 36px;
				object-fit: contain;
				margin-bottom: 10px;
			}
			p{
				font-size: 12px;
			}
			i{
				font-size: 18px;
				position: absolute;
				top: -5px;
				right: 5px;
				color: #52C41A;
				&.zmdi-alert-circle{
					display: none;
					color: #FE8636;
				}
			}
			&.err{
				i{
					display: none;
					&.zmdi-alert-circle{
						display: inline-block;
					}
				}
			}
		}
	}
}
</style>
