<template>
    <v-container>
      <v-container class="pc">
        <v-row justify="center">
          <v-col cols='3'>
            <v-text-field
              label="이메일 입력"
              v-model="email"
              hide-details="auto"
              v-on:keyup.enter="sendEmail"
            ></v-text-field>
          </v-col>
          <v-col cols='1'>
            <v-btn
                elevation="2" block v-on:click="sendEmail()"
              >이메일 받기</v-btn>  
          </v-col>
        </v-row>
  
        <v-row justify="center">
          <v-col cols='4'>
            <div style="text-align: center;">
              <router-link to="/auth/findPw">비밀번호찾기</router-link> ㅣ
              <router-link to="/auth/signIn">로그인하기</router-link> ㅣ 
              <router-link to="/auth/signUp">회원가입하기</router-link>
            </div>
          </v-col>
        </v-row>      
      </v-container>

      <v-container class="mobile">
        <v-row justify="center">
          <v-col cols='8'>
            <v-text-field
              label="이메일 입력"
              v-model="email"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols='2'>
            <v-btn
                elevation="2" block v-on:click="sendEmail()"
              >이메일 받기</v-btn>  
          </v-col>
        </v-row>
  
        <v-row justify="center">
          <v-col cols='8'>
            <div style="text-align: center;">
              <router-link to="/auth/findPw">비밀번호찾기</router-link> <br>
              <router-link to="/auth/signIn">로그인하기</router-link> <br>
              <router-link to="/auth/signUp">회원가입하기</router-link>
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
    .pc{
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
import {signValidation} from '../../utils/validation/index';
export default {
    name : 'findId',
    data (){
      return {
        email : '',
      }
    },
    methods : {
      async sendEmail(){
        let res;
        if(!signValidation.validationEmail(this.email)){
          alert('이메일 형식에 맞추어 작성해주세요.'); return;
        }
        try{
          res = await this.$store.dispatch('find_id_send_email', {
            email : this.email
          })
        }catch(err){
          if(err.message=== 'wrong email'){
            alert('이메일이 존재하지 않습니다. 다시 확인해주세요.'); return;
          }else {
            alert(err.message); return;
          }
        }
        if(res){
          alert('사용자님의 이메일로 아이디를 발송했습니다.');
          history.back();
        }
      },
    },
    
}
</script>