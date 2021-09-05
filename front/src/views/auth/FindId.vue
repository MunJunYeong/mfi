<template>
    <v-container>
        <v-row justify="center">
          <v-col cols='4'>
            <v-text-field
                label="이름 입력"
                :rules="rules"
                hide-details="auto"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols='3'>
            <v-text-field
              label="이메일 입력"
              :rules="rules"
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
                :rules="rules"
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
              <router-link to="/auth/findPw">비밀번호찾기</router-link> ㅣ
              <router-link to="/auth/signIn">로그인하기</router-link> ㅣ 
              <router-link to="/auth/signUp">회원가입하기</router-link>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols='5'>
            <div style="text-align: center;">© 2021 MetaphorForInvesting.com. All rights reserved.</div>
          </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name : 'findId',
    
}
</script>