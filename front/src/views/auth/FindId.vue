<template>
    <v-container>
      <v-container class="pc">
        <v-row justify="center">
          <v-col cols='3'>
            <v-text-field
              label="이메일 입력"
              v-model="email"
              hide-details="auto"
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
export default {
    name : 'findId',
    data (){
      return {
        email : '',
      }
    },
    methods : {
      async sendEmail(){
        if(!this.validationEmail(this.email)){
          alert('이메일 형식에 맞추어 작성해주세요.'); return;
        }
        try{
          await this.$store.dispatch('find_id_send_email', {
            email : this.email
          })
        }catch(err){
          console.log(err);
        }
      },
      validationEmail(str){
        const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return reg.test(str);
      },
    },
    
}
</script>