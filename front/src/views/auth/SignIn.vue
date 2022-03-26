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
            >
            </v-text-field>
            <br>
            <!-- 로그인버튼 -->
            <v-btn
              elevation="2" block
              v-on:click="login"
              @keyup.enter="login"
            >로그인</v-btn>              
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
            >
            </v-text-field>
            <br> <br>
            <v-btn
              elevation="2" block
              v-on:click="login"
              @keyup.enter="login"
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

  export default {
    name: 'SignIn',
    
    props : {
      
    },
    data() {
      return{
        id : '',
        pw : '',
        show1: false, show2 : false,
      }
    },
    methods: {
      async login(){
        let res;
        try {
          res = await this.$store.dispatch('auth_login', {
            id : this.id,
            pw : this.pw
          })
        } catch (err) {
          alert('통신 오류');
        }
        if(res.message){
          alert(res.message);
        }
      }
    },
  }
</script>
