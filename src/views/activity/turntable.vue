<template>
<div class="turntable">
	<canvas class="item" id="wheelcanvas" width="300px" height="300px"></canvas>

	<div class="l-captcha" data-site-key="350f17dc9eaeb04ec98267e26521ac78"></div>
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
				restaraunts:["U型枕", "保温杯", "定制笔筒定制笔筒","未中奖", "定制公仔", "充电宝"],				//大转盘奖品名称
				colors:["#ffdc42","#feb012", "#ffdc42", "#feb012", "#ffdc42","#feb012"],					//大转盘奖品区块对应背景颜色
				outsideRadius:150,			//大转盘外圆的半径
				textRadius:130,				//大转盘奖品位置距离圆心的距离
				insideRadius:50,			//大转盘内圆的半径
				startAngle:0,				//开始角度

				bRotate:false				//false:停止;ture:旋转
			}
		}
	},
	beforeMount(){

	},
	mounted(){
		this.drawRouletteWheel()
		setTimeout(()=>{
			this.rotateFn(2)
		},2000)

	},
	methods:{
		rotateFn(item, txt){
			let turnplate= this.turnplate
			var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
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
				callback:function (){

					turnplate.bRotate = !turnplate.bRotate;

				}
			});
		},
		drawRouletteWheel() {
			var canvas = document.getElementById("wheelcanvas");
			let turnplate= this.turnplate
			if (canvas.getContext) {
				//根据奖品个数计算圆周角度
				var arc = Math.PI / (turnplate.restaraunts.length/2);
				var ctx = canvas.getContext("2d");
				//在给定矩形内清空一个矩形
				ctx.clearRect(0,0,300,300);
				//strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
				ctx.strokeStyle = "#FFBE04";
				//font 属性设置或返回画布上文本内容的当前字体属性
				ctx.font = 'bold 18px Microsoft YaHei';
				for(var i = 0; i < turnplate.restaraunts.length; i++) {
					var angle = turnplate.startAngle + i * arc;
					ctx.fillStyle = turnplate.colors[i];
					ctx.beginPath();
					//arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
					ctx.arc(150, 150, turnplate.outsideRadius, angle, angle + arc, false);
					ctx.arc(150, 150, turnplate.insideRadius, angle + arc, angle, true);
					ctx.stroke();
					ctx.fill();
					//锁画布(为了保存之前的画布状态)
					ctx.save();

					//改变画布文字颜色
					var b = i+2;
					if(b%2){
						ctx.fillStyle = "#FFFFFF";
					}else{
						ctx.fillStyle = "#E5302F";
					};

					//----绘制奖品开始----


					var text = turnplate.restaraunts[i];
					var line_height = 22;
					//translate方法重新映射画布上的 (0,0) 位置
					ctx.translate(150 + Math.cos(angle + arc / 2) * turnplate.textRadius, 150 + Math.sin(angle + arc / 2) * turnplate.textRadius);

					//rotate方法旋转当前的绘图
					ctx.rotate(angle + arc / 2 + Math.PI / 2);

					/** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
					if(text.indexOf("盘")>0){//判断字符进行换行
						var texts = text.split("盘");
						for(var j = 0; j<texts.length; j++){
							ctx.font = j == 0?'bold 20px Microsoft YaHei':'bold 18px Microsoft YaHei';
							if(j == 0){
								ctx.fillText(texts[j]+"盘", -ctx.measureText(texts[j]+"盘").width / 2, j * line_height);
							}else{
								ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height*1.2); //调整行间距
							}
						}
					}else if(text.indexOf("盘") == -1 && text.length>4){//奖品名称长度超过一定范围
						text = text.substring(0,4)+"||"+text.substring(4);
						var texts = text.split("||");
						for(var j = 0; j<texts.length; j++){
							ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
						}
					}else{

						//在画布上绘制填色的文本。文本的默认颜色是黑色

						//measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
						ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
					}

					//添加对应图标

					// if(text.indexOf(turnplate.restaraunts[0])>=0){
					// 	var img= document.getElementById("a0");
					// 	// img.onload=function(){
					// 	//     ctx.drawImage(img,-35,20,64,64);
					// 	// };
					// 	ctx.drawImage(img,-35,20,64,64);
					// };
					// if(text.indexOf(turnplate.restaraunts[1])>=0){
					// 	var img= document.getElementById("a1");
					// 	// img.onload=function(){
					// 	//     ctx.drawImage(img,-35,20,64,64);
					// 	// };
					// 	ctx.drawImage(img,-35,20,64,64);
					// };
					// if(text.indexOf(turnplate.restaraunts[2])>=0){
					// 	var img= document.getElementById("a2");
					// 	// img.onload=function(){
					// 	//     ctx.drawImage(img,-25,35,64,64);
					// 	// };
					// 	ctx.drawImage(img,-30,20,64,64);
					// };
					// if(text.indexOf(turnplate.restaraunts[3])>=0){
					// 	var img= document.getElementById("a3");
					// 	// img.onload=function(){
					// 	//     ctx.drawImage(img,-35,20,64,64);
					// 	// };
					// 	ctx.drawImage(img,-35,20,64,64);
					// };
					// if(text.indexOf(turnplate.restaraunts[4])>=0){
					// 	var img= document.getElementById("a4");
					// 	// img.onload=function(){
					// 	//     ctx.drawImage(img,-30,20,64,64);
					// 	// };
					// 	ctx.drawImage(img,-30,20,64,64);
					// };
					// if(text.indexOf(turnplate.restaraunts[5])>=0){
					// 	var img= document.getElementById("a5");
					// 	// img.onload=function(){
					// 	//     ctx.drawImage(img,-35,20,64,64);
					// 	// };
					// 	ctx.drawImage(img,-35,20,64,64);
					// };
					// if(text.indexOf(turnplate.restaraunts[6])>=0){
					// 	var img= document.getElementById("a6");
					// 	// img.onload=function(){
					// 	//     ctx.drawImage(img,-30,20,64,64);
					// 	// };
					// 	ctx.drawImage(img,-30,20,64,64);
					// };
					//
					// if(text.indexOf(turnplate.restaraunts[7])>=0){
					// 	var img= document.getElementById("a7");
					// 	// img.onload=function(){
					// 	//     ctx.drawImage(img,-35,20);
					// 	// };
					// 	ctx.drawImage(img,-35,20);
					// };


					//把当前画布返回（调整）到上一个save()状态之前
					ctx.restore();
					//----绘制奖品结束----
				}
			}
		}
	}
}
</script>

<style scoped>

</style>
