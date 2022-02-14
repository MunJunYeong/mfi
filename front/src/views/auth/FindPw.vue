<template>
    <v-container>
      <v-container class="pc">
        <v-row justify="center">
          <v-col cols='4'>
            <v-text-field
                label="이름 입력"
                hide-details="auto"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols='4'>
            <v-text-field
              label="아이디 입력"
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols='3'>
            <v-text-field
              label="이메일 입력"
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols='1'>
            <v-btn
                elevation="2" block
              >인증번호 받기</v-btn>  
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols='4'>
            <v-text-field
                label="인증번호 입력"
                hide-details="auto"
              ></v-text-field>
          </v-col>
        </v-row>    
        <v-row justify="center">
          <v-col cols="4" >
            <v-btn
              elevation="2" block>
              다음
            </v-btn>
          </v-col>      
        </v-row>
        <v-row justify="center">
          <v-col cols='4'>
            <div style="text-align: center;">
              <router-link to="/auth/findId">아이디찾기</router-link> ㅣ
              <router-link to="/auth/signIn">로그인하기</router-link> ㅣ 
              <router-link to="/auth/signUp">회원가입하기</router-link>

            </div>
          </v-col>
        </v-row>
     
     
      </v-container>
      
      <v-container class="mobile">
        <v-row justify="center">
          <v-col cols='10'>
            <v-text-field
                label="이름 입력"
                
                hide-details="auto"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols='10'>
            <v-text-field
              label="아이디 입력"
              
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols='8'>
            <v-text-field
              label="이메일 입력"
              
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols='2'>
            <v-btn
                elevation="2" block
              >인증</v-btn>  
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols='10'>
            <v-text-field
                label="인증번호 입력"
                
                hide-details="auto"
              ></v-text-field>
          </v-col>
        </v-row>    
        <v-row justify="center">
          <v-col cols="4" >
            <v-btn
              elevation="2" block>
              다음
            </v-btn>
          </v-col>      
        </v-row>
        <v-row justify="center">
          <v-col cols='8'>
            <div style="text-align: center;">
              <router-link to="/auth/findId">아이디찾기</router-link> <br>
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
    name : 'findPw',
    
}
</script>