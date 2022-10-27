<template>
  <v-container>
    <v-container class="pc">
      <v-row justify="center">
        <v-col cols='4'>
          <div>
            <v-text-field
              label="아이디 입력"
              v-model="id"
              hide-details="auto"
            >
            </v-text-field>
            <v-text-field
              label="비밀번호 입력"
              v-model="pw"
              hide-details="auto"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              v-on:keyup.enter  ="login"
            >
            </v-text-field>
            <br>

            <!-- 로그인버튼 -->
            <v-btn
              elevation="2" block
              v-on:click="login"
            >로그인
            </v-btn>  
            <v-checkbox
              v-model="saveId"
              :label="`아이디 저장하기`"
            ></v-checkbox>
          </div>
        </v-col>
      </v-row>
      <br><br>
      <v-row justify="center">
        <v-col cols='4'>
          <div style="text-align: center;">
            <router-link to="/auth/findId">아이디찾기</router-link> ㅣ
            <router-link to="/auth/findPw">비밀번호찾기</router-link> ㅣ 
            <router-link to="/auth/signUp">회원가입</router-link>
          </div>
        </v-col>
      </v-row>
      <!-- 네이버 로그인
      <v-row justify="center" >
        <v-col cols='3' class="authLogin" >
          <div id="naver_id_login"></div>
        </v-col>
      </v-row> -->
      <!-- 카카오 로그인
      <v-row justify="center" >
        <v-col cols='3' class="authLogin">
          <router-link to="/home">
              <v-img  src="@/assets/kakao_login.png"  class="image" />
          </router-link>
        </v-col>
      </v-row> -->
      <br><br>
    </v-container>
    <v-container class="mobile">
      <v-row justify="center">
        <v-col cols='8'>
          <div>
            <v-text-field
              label="아이디 입력"
              v-model="id"
              hide-details="auto"
            >
            </v-text-field>
            <v-text-field
              label="비밀번호 입력"
              v-model="pw"
              hide-details="auto"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              v-on:keyup.enter  ="login"
            >
            </v-text-field>
            <br> <br>
            <v-btn
              elevation="2" block
              v-on:click="login"
            >로그인</v-btn> 
                     
          </div>
        </v-col>
      </v-row>
      <br><br>
      <v-row justify="center">
        <v-col cols='8'>
          <div style="text-align: center;">
            <router-link to="/auth/findId">아이디찾기</router-link> <br>
            <router-link to="/auth/findPw">비밀번호찾기</router-link> <br>
            <router-link to="/auth/signUp">회원가입</router-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<style scoped>
@media all and (max-width:767px) {
    .pc{
        display: none;
    }
}
@media all and (max-width:1023px) and (min-width:767px) {
    .mobile{
        display: none;
    }
    /* 태블릿은 잘보임 */
}
@media all and (min-width:1024px) {
    .mobile{
        display: none;
    }
}
@media all and (min-width:1268px) {
    .image {
      height: 70px;
    }
}
.authLogin {
  margin-bottom: -10px;
}
.image{
  object-fit: contain;  width: auto; 
}
</style>
<script>
/* eslint-disable */
  import VueCookies from "vue-cookies";
  import {signValidation} from '../../utils/validation/index';
  // import {naverService} from '../../services';
  export default {
    name: 'SignIn',
    props : {
      
    },
    mounted(){
      // naverService.setNaverLogin();
    },
    data() {
      return{
        id : VueCookies.isKey('id')?VueCookies.get('id'):'',
        pw : '',
        show1: false, show2 : false,
        saveId : VueCookies.isKey('saveId')?VueCookies.get('saveId'):false,
      }
    },
    methods: {
      async login(){
        /////////////////////////////////전처리/////////////////////////////////
        // const preorderId = signValidation.checkId(this.id);
        // if(preorderId.message){
        //   alert('[아이디] ' +preorderId.message); return;
        // }
        // const preorderPw = signValidation.checkPw(this.pw);
        // if(preorderPw.message){
        //   alert('[비밀번호] ' +preorderPw.message); return;
        // }
        ///////////////////////////////////////////////////////////////////////
        try{
          await this.$store.dispatch('sign_in', {
            id : this.id,
            pw : this.pw,
            isForce : false
          })
        }catch(err){
          /////////////////////////////////Wrong/////////////////////////////////
          if(err.message === 'wrong id'){
            alert('잘못된 아이디입니다.'); return;
          }
          if(err.message === 'wrong pw'){
            alert('잘못된 비밀번호입니다.'); return;
          }
          if(err.message === 'isLogin'){
            let flag = confirm('다른 기기에서 로그인 중입니다.' + '\n' + '강제 로그아웃 하고 현재 기기에서 로그인 하시겠습니까?');
            if(flag){
              try{
                await this.$store.dispatch('sign_in', {
                  id : this.id,
                  pw : this.pw,
                  isForce : true
                })
              }catch(err){
                alert('통신 오류');
              }
            }
          }
        }
        /////////////////////////////////후처리/////////////////////////////////
        if(this.saveId && !VueCookies.isKey('id') ){
          VueCookies.set('id', this.id);
          VueCookies.set('saveId', true);
        }
        if(!this.saveId && VueCookies.isKey('id')){
          VueCookies.remove('id');
          VueCookies.remove('saveId');
        }
        ///////////////////////////////////////////////////////////////////////
      },
    },
  }
</script>
