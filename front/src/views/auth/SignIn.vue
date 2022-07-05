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
</style>
<script>
  import VueCookies from "vue-cookies";
  import {signValidation} from '../../utils/validation/index';
  export default {
    name: 'SignIn',
    
    props : {
      
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
        let res;

        const preorderId = signValidation.checkId(this.id);
        if(preorderId.message){
          alert('[아이디] ' +preorderId.message); return;
        }
        const preorderPw = signValidation.checkPw(this.pw);
        if(preorderPw.message){
          alert('[비밀번호] ' +preorderPw.message); return;
        }

        try {
          res = await this.$store.dispatch('auth_login', {
            id : this.id,
            pw : this.pw,
          })
        } catch (err) {
          console.log(err)
          alert('통신 오류');
        }
        //아이디 저장하기 + 쿠키에 id 값이 없다면 
        if(this.saveId && !VueCookies.isKey('id') ){
          VueCookies.set('id', this.id);
          VueCookies.set('saveId', true);
        }
        //아이디 저장하기를 안하는데 쿠키가 있을 경우엔 전부 초기화
        if(!this.saveId && VueCookies.isKey('id')){
          VueCookies.remove('id');
          VueCookies.remove('saveId');
        }
        
        if(res.message === 'isLogin'){
          let flag = confirm('다른 기기에서 로그인 중입니다.' + '\n' + '강제 로그아웃 하고 현재 기기에서 로그인 하시겠습니까?');
          if(flag){
            try{
              await this.$store.dispatch('auth_force_login', {
                id : this.id,
                pw : this.pw
              })
            }catch(err){
              alert('통신 오류');
            }
          }
          return;
        }else if(res.message){
          alert(res.message);
        }
      }
    },
  }
</script>
