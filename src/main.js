import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from './axios.js'
import MintUI from 'mint-ui'
import VueImg from 'v-img'
import '@/assets/font-awesome/css/font-awesome.min.css'
import 'iview/dist/styles/iview.css';
import 'mint-ui/lib/style.css'
import '@/assets/common.less'
import '@/fliters.js'
import '@/auth.js'
import { Input, Form, FormItem } from 'iview';

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueImg);

Vue.prototype.axiosHxx = axios.axiosHxx;
Vue.prototype.axiosQixui = axios.axiosQixui;

Vue.component('Input', Input);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
