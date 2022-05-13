import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCookies from "vue-cookies";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080", {
  withCredentials: true,
});


socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("numberConnections", (data) => {
  console.log(data);
});



const axios = require('./lib/axios');

Vue.config.productionTip = false
Vue.prototype.$http = axios;

//이걸로 this.$cookie 안되는 ?
Vue.prototype.$cookie = VueCookies;
Vue.use(VueCookies);

const init  = async () => {
  
  //토큰 유효성 검사
  const settingVerifyToken = async () => {
    let token = localStorage.getItem('accessToken');
    if(token !== null){
      await store.dispatch('get_user_data', token);
    }
  }
  await settingVerifyToken();

  // 방문자 수 확인 쿠키 : cookie가 없을 경우에 쿠키 생성
  if (!VueCookies.isKey("visitor")){
    store.dispatch('create_visitor'); 
  }

  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

try{
  init();
}catch(err){
  console.log(err)
}
