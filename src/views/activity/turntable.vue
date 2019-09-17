<template>
<div class="turntable">
	<img class="f1" src="/img/turntable/bgf1.png"/>
	<img class="f2" src="/img/turntable/bgf2.png"/>
	<img class="f3" src="/img/turntable/bgf3.png"/>
	<img class="title" src="/img/turntable/title.png"/>

	<div class="table">
		<img class="triangle" src="/img/turntable/table3.png"/>
		<canvas class="wheelcanvas" id="wheelcanvas" width="560px" height="560px" style="width: 280px;height: 280px"></canvas>
		<img class="circle" src="/img/turntable/table1.png"/>
		<img class="pointer" src="/img/turntable/table2.png"  @click="click"/>

		<div id="vaptcha" :class="{on: vaptchaShow, vaptcha: true}"></div>
	</div>

	<div class="winners">
		<h3>//////   中奖名单   //////</h3>
		<ul v-if="winners.length">
			<div  class="winnerlist">
				<li v-for="(item, key) in winners" :key="key"
					>恭喜车主{{item.mobile}}获得<span>{{item.awardName}}</span></li>
			</div>
		</ul>

		<a v-else>暂无中奖者</a>
	</div>

	<div class="intro">
		<h3>//////   活动说明   //////</h3>
		<ul>
			<label>活动时间：</label>
			<li>2019年9月21日——2019年9月30日</li>
		</ul>
		<ul>
			<label>活动规则：</label>
			<li>1、活动期间，用户关注微信公众号并登录后即可参与抽奖。</li>
			<li>2、活动期间，每个ID最多只可以抽奖一次。</li>
			<li>3、抽中奖品后，请在24小时内，在“我的” - “我的奖品”列表中“点击领取”并正确填写收件地址等信息。如用户未在抽中奖品后的24小时内及时领取奖品，则奖品自动过期作废；因错填漏填造成的奖品发放错误将由用户承担责任。</li>
			<li>4、奖品将于5个工作日内统一安排寄送，奖品仅限中国大陆地区寄送。</li>
			<li>5、奖品以实物为准。</li>
		</ul>
	</div>

	<div class="bingo" v-show="bingo">
		<div class="mask"></div>
		<div class="block">
			<h1>恭喜您获得{{winname}}!!!</h1>
			<img src="/img/turntable/bingo.png"/>
			<router-link to="/my-awards">立即领取</router-link>
		</div>

		<i class="zmdi zmdi-close-circle-o" @click="bingo= false"></i>
	</div>

	<!--<img class="prize" src="/img/turntable/101.png" id="p101" style="display:none;" />-->
	<!--<img class="prize" src="/img/turntable/102.png" id="p102" style="display:none;" />-->
	<!--<img class="prize" src="/img/turntable/103.png" id="p103" style="display:none;" />-->
	<!--<img class="prize" src="/img/turntable/104.png" id="p104" style="display:none;" />-->
	<!--<img class="prize" src="/img/turntable/105.png" id="p105" style="display:none;" />-->
	<!--<img class="prize" src="/img/turntable/106.png" id="p106" style="display:none;" />-->

	<img v-for="(item, key) in awardCode" :key="key" :src="`/img/turntable/${key}.png`" :id="'p'+ key" style="display:none;"/>
</div>
</template>

<script>
import './awardRotate'
import { splitByLength} from '@/util'
export default {
	name: "turntable",
	data(){
		return{
			turnplate:{
				restaraunts:["应急电源", "无线吸尘器", "燃油系统清洗剂","发动机保护剂", "防滑垫", "谢谢参与"],				//大转盘奖品名称
				// colors:["#9B23F4","#FDEC49","#9B23F4","#FDEC49","#9B23F4","#FDEC49"],					//大转盘奖品区块对应背景颜色
				colors:["#fc9110","#FDEC49","#fc9110","#FDEC49","#fc9110","#FDEC49"],					//大转盘奖品区块对应背景颜色
				outsideRadius:140,			//大转盘外圆的半径
				textRadius:110,				//大转盘奖品位置距离圆心的距离
				insideRadius: 20,			//大转盘内圆的半径
				startAngle:0,				//开始角度
				bRotate:false				//false:停止;ture:旋转
			},
			awardCode:{
				'101':{
					name: '应急电源',
					index: 0
				},
				'102':{
					name: '无线吸尘器',
					index: 1
				},
				'103':{
					name: '燃油系统清洗剂',
					index: 2
				},
				'104':{
					name: '发动机保护剂',
					index: 3
				},
				'105':{
					name: '防滑垫',
					index: 4
				},
				'106':{
					name: '谢谢参与',
					index: 5
				},
			},
			vaptchaShow: false,
			vaptchaObj: null,
			vaptchaToken: '',
			winners: [],
			winname: '',
			bingo: false,
			timer: null
		}
	},
	beforeMount(){

	},
	mounted(){
		setTimeout(()=>{
			this.drawRouletteWheel()
		}, 500)
		this.vaptcha()
		this.getWinner()
	},
	beforeRouteLeave (to, from, next) {
		window.clearInterval(this.timer)
		this.timer= null
		next(); //正常执行手机返回键也是正常返回上一个路由
	},
	methods:{
		vaptcha(){
			window.vaptcha({
				vid: '5d808098fc650fd878051c82', // 验证单元id
				type: 'embed', // 显示类型 点击式
				container: '#vaptcha' // 按钮容器，可为Element 或者 selector
			}).then( (vaptchaObj)=> {

				this.vaptchaObj= vaptchaObj

				this.vaptchaObj.listen('pass', ()=> {
					this.vaptchaShow= false
					// 验证成功进行后续操作
					this.vaptchaToken= this.vaptchaObj.getToken()
					this.axiosQixiu.post('/lucky-draw/draw', {
						activityKey: "20190917",
						token: this.vaptchaToken
					}, {baseURL: '/laozhao-api', noIndicator: true, hxxtoken: true}).then(res=>{
						let key= res.data.awardKey
						if(key){
							this.rotateFn(this.awardCode[key].index +1 , this.awardCode[key].name)
						}
					})
					console.log('this.vaptchaToken', this.vaptchaToken)
				})

				this.vaptchaObj.render()
			})
		},
		getWinner(){
			this.axiosQixiu.get('/lucky-draw/getLatestRecords?pageIndex=1&pageSize=30',
				{baseURL: '/laozhao-api', noIndicator: true}).then(res=>{
				if(res.data.rows && res.data.rows.length){
					this.winners= res.data.rows
					this.timer= this.setSroll()
				}
			})
		},
		setSroll() {
			let arr= this.winners, arr1= this.winners
			if(arr.length<4){
				arr1= [...arr, ...arr, ...arr]
			}
			if(arr1.length<7){
				this.winners=[...arr1, ...arr1]
			}
			let sroll= setInterval(()=>{
				// console.log($(".list").position().top+"::"+$(".list .group:first-child").height())

				let thisTop= $(".winnerlist").position().top

				if($(".winnerlist").position().top+$(".winnerlist:first-child").height()<=96){
					$(".winnerlist").css({"top":"0"})
					thisTop=0
				}else{

				}
				$(".winnerlist").animate({top:(thisTop-24)+"px"},"fast")
			},1000)
			return sroll
		},
		rotateFn(item, name){
			let turnplate= this.turnplate
			let angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
			if(angles<270){
				angles = 270 - angles;
			}else{
				angles = 360 - angles + 270;
			}
			$('#wheelcanvas').stopRotate();
			$('#wheelcanvas').rotate({
				angle:0,
				animateTo:angles+1800,
				duration:8000,
				callback: ()=>{
					turnplate.bRotate = !turnplate.bRotate;

					if(item==6){
						this.$toast('很遗憾，您未中奖')
					}else{
						this.winname= name
						this.bingo= true
					}
				}
			});
		},
		drawRouletteWheel() {
			let canvas = document.getElementById("wheelcanvas");
			let turnplate= this.turnplate
			if (canvas.getContext) {
				//根据奖品个数计算圆周角度
				let arc = Math.PI / (turnplate.restaraunts.length/2);
				let ctx = canvas.getContext("2d");
				ctx.scale(2, 2);
				//在给定矩形内清空一个矩形
				ctx.clearRect(0,0,280,280);
				//strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
				ctx.strokeStyle = "#FFBE04";
				//font 属性设置或返回画布上文本内容的当前字体属性

				for(let i = 0; i < turnplate.restaraunts.length; i++) {
					ctx.font = 'bold 14px Microsoft YaHei';
					let angle = turnplate.startAngle + i * arc;
					ctx.fillStyle = turnplate.colors[i];
					ctx.beginPath();
					//arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
					ctx.arc(140, 140, turnplate.outsideRadius, angle, angle + arc, false);
					ctx.arc(140, 140, turnplate.insideRadius, angle + arc, angle, true);
					ctx.stroke();
					ctx.fill();
					//锁画布(为了保存之前的画布状态)
					ctx.save();

					//改变画布文字颜色
					let b = i+2;
					if(b%2){
						ctx.fillStyle = "#9B23F4";
					}else{
						ctx.fillStyle = "#FFFFFF";
					};

					//----绘制奖品开始----


					let text = turnplate.restaraunts[i];
					let line_height = 22;
					//translate方法重新映射画布上的 (0,0) 位置
					ctx.translate(140 + Math.cos(angle + arc / 2) * turnplate.textRadius, 140 + Math.sin(angle + arc / 2) * turnplate.textRadius);

					//rotate方法旋转当前的绘图
					ctx.rotate(angle + arc / 2 + Math.PI / 2);

					let top= 0

					/** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
					// if(text.indexOf("盘")>0){//判断字符进行换行
					// 	let texts = text.split("盘");
					// 	for(let j = 0; j<texts.length; j++){
					// 		ctx.font = j == 0?'bold 20px Microsoft YaHei':'bold 18px Microsoft YaHei';
					// 		if(j == 0){
					// 			ctx.fillText(texts[j]+"盘", -ctx.measureText(texts[j]+"盘").width / 2, j * line_height);
					// 		}else{
					// 			ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height*1.2); //调整行间距
					// 		}
					// 	}
					// }else

						if(text.indexOf("盘") == -1 && text.length>7){//奖品名称长度超过一定范围
						text = text.substring(0,7)+"||"+text.substring(7);
						let texts = text.split("||");
						for(let j = 0; j<texts.length; j++){
							top=  j * line_height * .8
							ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, top+5);
						}
					}else{
						//在画布上绘制填色的文本。文本的默认颜色是黑色
						//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
						ctx.fillText(text, -ctx.measureText(text).width / 2, 0 +5);
					}

					//添加对应图标
					// let awarr= this.awardCode
					// for(let key in awarr){
					// 	if(awarr[key].index== i){
					// 		let img= document.getElementById('p'+ key);
					// 		let x=0, y=0, w=0 ,h=0
					// 		switch(key){
					// 			case '101':{
					// 				x= -30, y= 30
					// 				w= 60; h= 20
					// 				break
					// 			}
					// 			case '102':{
					// 				x= -12, y= 30
					// 				w= 28; h= 46
					// 				break
					// 			}
					// 			case '103':{
					// 				x= -12, y= 30
					// 				w= 28; h= 50
					// 				break
					// 			}
					// 			case '104':{
					// 				x= -12, y= 30
					// 				w= 28; h= 50
					// 				break
					// 			}
					// 			case '105':{
					// 				x= -23, y= 30
					// 				w= 45; h= 45
					// 				break
					// 			}
					// 			case '106':{
					// 				x= -20, y= 30
					// 				w= 45; h= 45
					// 				break
					// 			}
					// 		}
					//
					//
					// 		ctx.drawImage(img, x, y, w, h);
					//
					// 		// let img=new Image();
					// 		// img.οnlοad=()=>{
					// 		// 	ctx.drawImage(img, -20, 35, img.width, img.height);
					// 		// };
					// 		// img.src= `/img/turntable/${key}.png`;
					// 	}
					// }

					let awarr= this.awardCode
					for(let key in awarr){
						ctx.font = 'normal 12px Microsoft YaHei';
						if(awarr[key].index== i){
							let x=0, y=0, w=0 ,h=0, txt=""
							top+= 20
							switch(key){
								case '101':{
									ctx.font = 'normal 10px Microsoft YaHei';
									txt= "(充电/照明/启动汽车)"
									ctx.fillText(txt, -ctx.measureText(txt).width / 2, top);
									ctx.font = 'normal 12px Microsoft YaHei';
									txt= "价值368元*1台"
									top+= 16
									ctx.fillText(txt, -ctx.measureText(txt).width / 2, top);
									break
								}
								case '102':{
									txt= "(车家两用)"

									ctx.fillText(txt, -ctx.measureText(txt).width / 2, top);
									txt= "价值198元*1台"
									top+= 16
									ctx.fillText(txt, -ctx.measureText(txt).width / 2, top);
									break
								}
								case '103':{
									txt= "价值98元*1瓶"
									top+= 10
									ctx.fillText(txt, -ctx.measureText(txt).width / 2, top);
									break
								}
								case '104':{
									txt= "价值98元*1瓶"
									top+= 10
									ctx.fillText(txt, -ctx.measureText(txt).width / 2, top);
									break
								}
								case '105':{
									txt= "价值10元*1张"
									top+= 10
									ctx.fillText(txt, -ctx.measureText(txt).width / 2, top);
									break
								}
								case '106':{
									let img= document.getElementById('p'+ key);
									x= -20, y= 18
									w= 45; h= 45
									ctx.drawImage(img, x, y, w, h);
									break
								}
							}



							// let img=new Image();
							// img.οnlοad=()=>{
							// 	ctx.drawImage(img, -20, 35, img.width, img.height);
							// };
							// img.src= `/img/turntable/${key}.png`;
						}
					}

					//把当前画布返回（调整）到上一个save()状态之前
					ctx.restore();
					//----绘制奖品结束----
				}
			}
		},
		click(){
			if(!this.$store.state.user.hxxtoken){
				this.$router.push({path: '/login', query: { redirect: this.$route.fullPath }})
				return
			}else{
				this.vaptchaShow= true
				this.vaptchaObj.reset()
			}
		}
	}
}
</script>

<style scoped lang="less">
.turntable{
	overflow: hidden;
	position: relative;
	min-height: 100vh;
	background: #260451  url("/img/turntable/bg.jpg") top center no-repeat;
	background-size: cover;
	&:before{
		content: '';
		position: absolute;
		display: block;
		border: 2px solid white;
		margin: 20px 10px;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.title{
		width: 80%;
		display: block;
		margin: 20% auto 0;
		position: relative;
	}
	.table{
		position: relative;
		overflow: visible;
		width: 320px;
		height: 320px;
		padding: 20px;
		margin: 30px auto;
		.wheelcanvas{
			position: relative;
		}
		.circle{
			position: absolute;
			width: 100%;
			height: auto;
			left: 0;
			top: 0;
			z-index: 1;
		}
		.pointer{
			width: 80px;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 95px;
			z-index: 1;
		}
		.triangle{
			width: 200px;
			position: absolute;
			bottom: -40px;
			left: 50%;
			transform: translateX(-50%);
		}
		.vaptcha{
			width: 280px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border: 6px solid white;
			border-radius: 2px;
			z-index: 0;
			opacity: 0;
			&.on{
				z-index: 100;
				opacity: 1;
			}
		}
	}
	.f1{
		position: absolute;
		width: 100%;
		top: 0;
		right: 0;
	}
	.f2{
		position: absolute;
		bottom: 30%;
		left: 10px;
	}
	.f3{
		position: absolute;
		bottom: 20%;
		right: 10px;
	}

	.winners, .intro{
		width: 80%;
		margin: 40px auto;
		color: white;
		overflow: hidden;
		h3{
			font-size: 14px;
			text-align: center;
			font-weight: 400;
			margin-bottom: 10px;
		}
	}
	.winners{
		margin-top: 60px;
		padding: 20px;
		background-color: #3C1E63;
		border-radius: 20px;
		h3{
			font-style:italic;
			background:linear-gradient(0deg,rgba(254,233,6,1) 0%, rgba(247,197,52,1) 100%);
			-webkit-background-clip:text;
			-webkit-text-fill-color:transparent;
		}
		ul{
			height: 72px;
			overflow: hidden;
			position: relative;
			.winnerlist{
				position: absolute;
				width: 100%;
				left: 0;
				top: 0;
				li{
					line-height: 24px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					span{
						margin-left: 5px;
						color: #FFE610;
					}
				}
			}

		}

		a{
			display: block;
			text-align:  center;
		}
	}
	.intro{
		ul{
			padding-left: 60px;
			position: relative;
			label{
				line-height: 18px;
				position: absolute;
				left: 0;
				top: 0;
			}
			li{
				line-height: 18px;
				margin-bottom: 5px;
			}
		}
	}
	.bingo{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 101;
		top: 0;
		left: 0;
		text-align: center;
		.mask{
			background-color: #111111;
			opacity: .7;
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
		}
		.block{
			width: 320px;
			margin: 50px auto;
			position: relative;
			h1{
				font-size: 20px;
				font-weight: 800;
				font-style:italic;
				color:rgba(255,255,255,1);
				background:linear-gradient(0deg,rgba(254,233,6,1) 0%, rgba(247,197,52,1) 100%);
				-webkit-background-clip:text;
				-webkit-text-fill-color:transparent;
				text-align: center;
				position: absolute;
				top: 20px;
				left: 0;
				width: 100%;
			}
			img{
				width: 100%;
			}
			a{
				display: inline-block;
				font-size: 16px;
				padding: 8px 30px;
				border-radius: 40px;
				color: #FF2602;
				background-color: #FFE610;
				position: absolute;
				bottom: 10px;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		i{
			font-size: 44px;
			color: #CCCCCC;
			position: relative;
		}
	}
}

</style>
