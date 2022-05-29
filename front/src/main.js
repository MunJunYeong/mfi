import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCookies from "vue-cookies";
import * as socket from "./lib/socket";


Vue.config.productionTip = false;
// .vue 파일에서만 this.$함수이름 : 프로토타입 가능
Vue.prototype.$Vue = Vue;
Vue.prototype.$cookie = VueCookies;
Vue.use(VueCookies);


const init  = async () => {
  await socket.globalInit();
  let token = localStorage.getItem('accessToken');

  //현재 접속자 수
  await store.dispatch('current_user_count');
  if(token !== null){
    await store.dispatch('current_user_data'); //새로고침시에도 돌려주고, 로그인했을 때에도 돌려주기
  }


  //토큰 유효성 검사
  const settingVerifyToken = async () => {
    if(token !== null){
      await store.dispatch('get_user_data', token);
      await socket.chatInit();
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
