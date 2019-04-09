<template>
<div :class="['countdown-button', {[disableClass]: disable}]" @click="click">
{{showText}}
</div>
</template>

<script>
export default {
	name: "countdown-button",
	props:{
		seconds:{
			default: 60
		},
		text:{
			default: ''
		},
		disableClass:{
			default: 'off'
		},
        phone:{
		    default:"",
        },
        url:{
		    default:"",
        }
	},
	data(){
		return{
			timer: null,
			showText: '',
			disable: false,
		}
	},
	mounted(){
		this.showText= this.text
	},
	methods:{
		click(){
			if(!this.disable){
                this.axiosHxx.post(this.url,{telphone:this.phone,access_token:localStorage.getItem("token")}).then(res => {
                    if(res.data.success){
                        this.$toast({
                            message: '验证码已发送',
                            iconClass: 'icon icon-success'
                        });
                        this.disable= true;
                        this.$emit('click',res.data.data.telSession);
                        this.startTimers();
                    }
                })
			}
		},
		enable(){
			this.disable= false
		},
		startTimers(){
			let times= this.seconds
			this.disable= true
			this.showText= times+'s'
			this.timer = setInterval(()=>{
				times--
				this.showText= times+'s'
				if(times<=0){
					clearInterval(this.timer)
					this.showText= this.text
					this.disable= false
				}
			}, 1000)
		}
	}
}
</script>

<style scoped lang="less">

</style>
