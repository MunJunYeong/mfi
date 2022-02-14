<template>
  <v-container>
    <v-container class="pc">
      <v-row justify="center">
        <v-col cols='3'>
          <v-text-field
              label="아이디 입력"
              v-model="id"
              :rules="idRules"
              hide-details="auto"
              :readonly="overlapId"
            ></v-text-field>
        </v-col>
        <v-col cols='1'>
          <v-btn
              elevation="2" block
              v-on:click="checkId"
            >중복확인</v-btn>
        </v-col>
      </v-row>
      <br>

      <v-row justify="center">
        <v-col cols='4'>
          <div>
            <v-text-field
              label="비밀번호 입력"
              v-model="pw"
              :rules="pwRules"
              hide-details="auto"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-text-field
              label="비밀번호 재확인"
              v-model="checkPw"
              :rules="checkPwRules"
              hide-details="auto"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols='3'>
          <v-text-field
              label="닉네임 입력"
              v-model="nickName" 
              :rules="checknickNameRules"
              hide-details="auto"
              :readonly="overlapNickName"
            ></v-text-field>
        </v-col>
        <v-col cols='1'>
          <v-btn
              elevation="2" block
              v-on:click="checkNickName"
            >중복확인</v-btn>
        </v-col>
      </v-row>
      <br>
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
              elevation="2" block v-on:click="checkEmail()"
            >인증하기</v-btn>  
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="4" >
          <v-btn
            elevation="2" block
            v-on:click="signUp()" >
            회원가입 하기
          </v-btn>
        </v-col>      
      </v-row>
      <v-row justify="center">
        <v-col cols='4'>
          <div style="text-align: center;">
            <router-link to="/auth/findId">아이디찾기</router-link> ㅣ
            <router-link to="/auth/findPw">비밀번호찾기</router-link> ㅣ 
            <router-link to="/auth/signIn">로그인하기</router-link>
          </div>
        </v-col>
      </v-row>
      <br>
      <v-row justify="center">
        <v-col cols='5'>
          <div style="text-align: center;">© 2021 MetaphorForInvesting.com. All rights reserved.</div>
        </v-col>
      </v-row>    
    </v-container>
    
    <v-container class="mobile">
      <v-row justify="center">
        <v-col cols='8'>
          <v-text-field
              label="아이디 입력"
              v-model="id"
              :rules="idRules"
              hide-details="auto"
              :readonly="overlapId"
            ></v-text-field>
        </v-col>
        <v-col cols='2'>
          <v-btn
              elevation="4" block
              v-on:click="checkId"
            >중복</v-btn>
        </v-col>
      </v-row>
      <br>

      <v-row justify="center">
        <v-col cols='10'>
          <div>
            <v-text-field
              label="비밀번호 입력"
              v-model="pw"
              :rules="pwRules"
              hide-details="auto"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-text-field
              label="비밀번호 재확인"
              v-model="checkPw"
              :rules="checkPwRules"
              hide-details="auto"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols='8'>
          <v-text-field
              label="닉네임 입력"
              v-model="nickName" 
              :rules="checknickNameRules"
              hide-details="auto"
              :readonly="overlapNickName"
            ></v-text-field>
        </v-col>
        <v-col cols='2'>
          <v-btn
              elevation="2" block
              v-on:click="checkNickName"
            >중복</v-btn>
        </v-col>
      </v-row>
      <br>
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
              elevation="2" block v-on:click="checkEmail()"
            >인증</v-btn>  
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="6" >
          <v-btn
            elevation="2" block
            v-on:click="signUp()" >
            회원가입 하기
          </v-btn>
        </v-col>      
      </v-row>
      <v-row justify="center">
        <v-col cols='4'>
          <div style="text-align: center;">
            <router-link to="/auth/findId">아이디찾기</router-link> <br>
            <router-link to="/auth/findPw">비밀번호찾기</router-link> <br>
            <router-link to="/auth/signIn">로그인하기</router-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    
  }
</script>
<script>
const { VUE_APP_BACKEND_HOST } = process.env;
  import axios from 'axios';

  const checkEng = /[a-zA-Z]/;
  const checkNum = /[0-9]/; 
  const checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;

  export default {
    name: 'signUp',
    data () {
      return {
        id : '',
        pw : '',
        checkPw : '',
        nickName : '',
        email : '', 
        show1: false, show2 : false,
        idRules: [
          value => !!value || '영어, 숫자 합쳐서 6글자 이상 만들어주세요.',
          value => (checkEng.test(value) && checkNum.test(value) && value.length >= 6) || '영어,숫자 6글자 이상',
          // value =>this.checkIdDuplicate(value)
        ],
        pwRules : [
          value => !!value || '영어, 숫자, 특수기호를 합쳐서 6글자 이상 만들어주세요.',
          value => (checkEng.test(value) && checkNum.test(value) && checkSpe.test(value) && value.length >= 6) || '영어,숫자, 특수기호 6글자 이상',
        ],
        checkPwRules : [
          value => !!value || '비밀번호가 일치하지 않습니다.',
          value => value  === this.pw || '비밀번호가 일치하지 않습니다.'
        ],
        checknickNameRules : [
          value => !!value || '3글자 이상 만들어주세요.',
          value => (value.length >= 3) || '3글자 이상 만들어주세요.',
        ],
        overlapId: false,
        overlapNickName: false,
        checkEmail: false,
      }
    },

    methods : {
      // 중복 아이디 확인 axios
      async checkId(){
        this.overlapId = await axios.post(VUE_APP_BACKEND_HOST+'/checkId', {
          id : this.id
        }).then(res =>{
          if(res.data.value === "true"){
            let result = confirm("아이디를 사용하시겠습니까?");
            if(result){
              return  true;
            }else {
              return false;
            }
          }else {
            alert(res.data.message);
            return false;
          }
        })
      },
      // 중복 닉네임 확인 axios
      async checkNickName(){
        this.overlapNickName = await axios.post(VUE_APP_BACKEND_HOST+ '/checkNickName', {
          nickName : this.nickName
        }).then(res=>{
          if(res.data.value === 'true'){
            let result = confirm("닉네임을 사용하시겠습니까?");
            if(result){
              return true;
            }else {
              return false;
            }
          }else {
            alert(res.data.message);
            return false;
          }
        })
        console.log('1');
      },
      // async checkEmail(){
      //   this.checkEmail = await axios.post(VUE_APP_BACKEND_HOST + 'checkEmail', {
          
      //   } )
      // },

      // 회원가입 axious
      async signUp(){
        if(this.pw !== this.checkPw){
          alert('비밀번호가 일치하지 않습니다.!');
        }else  if(this.overlapId && this.overlapNickName){
          await axios.post(VUE_APP_BACKEND_HOST+ '/signUp', {
            id : this.id,
            pw : this.pw,
            nickName : this.nickName,
            email : this.email
          }).then(res => {
            if(res.data.message){
              alert(res.data.message);
              return;
            }
            alert('회원가입이 성공적으로 완료됐습니다!');
            // location.href='/home'
            history.back();
            return;
          })
        }else if(!this.overlapId && !this.overlapNickName){
          alert('아이디, 닉네임 중복확인을 해주세요');
          return;
        }else if(!this.overlapId) {
          alert('아이디 중복확인을 해주세요');
          return;
        }else if(!this.overlapNickName){
          alert('닉네임 중복확인을 해주세요');
          return;
        }else {
          alert('통신 오류');
          console.log(res);
          return;
        }
      }
    },
  }
</script>

<style scoped>
  v-textarea[readonly="readonly"] {
    background-color: yellowgreen
}
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