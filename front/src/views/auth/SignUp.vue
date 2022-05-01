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
              :rules="checkNickNameRules"
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
      <!-- 이메일 -->
      <v-row justify="center">
        <v-col cols='3'>
          <v-text-field
            label="이메일 입력"
            v-model="email"
            hide-details="auto"
            :readonly="overlapEmail"
          ></v-text-field>
        </v-col>
        <v-col cols='1'>
          <v-btn
              elevation="2" block v-on:click="sendEmail()"
            >인증번호 받기</v-btn>  
        </v-col>
      </v-row>
      <!-- 이메일 인증번호 -->
      <v-row justify="center" v-if="authEmailIf">
        <v-col cols='3'>
          <v-text-field
            label="인증번호 입력"
            v-model="authEmail"
            hide-details="auto"
            :readonly="overlapAuthentication"
          ></v-text-field>
        </v-col>
        <v-col cols='1'>
          <v-btn
              elevation="2" block v-on:click="checkAuthEmail()"
            >확인</v-btn>  
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
    </v-container>
    
    <!-- mobile version -->
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
              :rules="checkNickNameRules"
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
            <!-- 이메일 -->
      <v-row justify="center">
        <v-col cols='8'>
          <v-text-field
            label="이메일 입력"
            v-model="email"
            hide-details="auto"
            :readonly="overlapEmail"
          ></v-text-field>
        </v-col>
        <v-col cols='2'>
          <v-btn
              elevation="2" block v-on:click="sendEmail()"
            >인증번호</v-btn>  
        </v-col>
      </v-row>
      <!-- 이메일 인증번호 -->
      <v-row justify="center" v-if="authEmailIf">
        <v-col cols='8'>
          <v-text-field
            label="인증번호 입력"
            v-model="authEmail"
            hide-details="auto"
            :readonly="overlapAuthentication"
          ></v-text-field>
        </v-col>
        <v-col cols='2'>
          <v-btn
              elevation="2" block v-on:click="checkAuthEmail()"
            >확인</v-btn>  
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
        <v-col cols='8'>
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
        ],
        pwRules : [
          value => !!value || '영어, 숫자, 특수기호를 합쳐서 6글자 이상 만들어주세요.',
          value => (checkEng.test(value) && checkNum.test(value) && checkSpe.test(value) && value.length >= 6) || '영어,숫자, 특수기호 6글자 이상',
        ],
        checkPwRules : [
          value => !!value || '비밀번호가 일치하지 않습니다.',
          value => value  === this.pw || '비밀번호가 일치하지 않습니다.'
        ],
        checkNickNameRules : [
          value => !!value || '3글자 이상 만들어주세요.',
          value => (value.length >= 3) || '3글자 이상 만들어주세요.',
        ],
        overlapId: false,
        overlapNickName: false,
        overlapEmail : false,
        checkEmail: false,
        authEmailIf : false,
        authEmail : '',
        overlapAuthentication : false,
      }
    },

    methods : {
      // 중복 아이디 확인 axios
      async checkId(){
        let checkEng = /[a-zA-Z]/;
        let checkNum = /[0-9]/; 
        let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if(!this.id){
          alert('ID를 입력해주세요.'); return;
        }
        if(checkKor.test(this.id) || !checkEng.test(this.id) || !checkNum.test(this.id)){
          alert('영어와 숫자를 사용해주세요.'); return;
        }
        if(this.id.length <6){
          alert('최소 6글자 이상 입력해주세요.'); return;
        }
        this.overlapId = await axios.post(VUE_APP_BACKEND_HOST+'/checkid', {
          id : this.id
        }).then(res =>{
          if(res.data.value === "true"){
            let result = confirm("사용가능한 아이디입니다. 아이디를 사용하시겠습니까?");
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
        if(this.nickName.length <3){
          alert('3글자 이상 입력해주세요.')
          return false;
        }
        this.overlapNickName = await axios.post(VUE_APP_BACKEND_HOST+ '/checknickname', {
          nickName : this.nickName
        }).then(res=>{
          if(res.data.value === 'true'){
            let result = confirm("사용가능한 닉네임입니다. 닉네임을 사용하시겠습니까?");
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
      },
      
      //이메일 인증하기 버튼
      async sendEmail(){
        if(this.overlapEmail){
          alert('인증 번호가 이미 발송되었습니다.'); return;
        }
        //이메일 형식 확인
        if(!this.validationEmail(this.email)){
          alert('이메일 형식에 맞추어 작성해주세요.'); return;
        }
        this.overlapEmail = await axios.post(VUE_APP_BACKEND_HOST + '/sendemail', {
          email : this.email
        }).then(res =>{
          if(res.data.message){
            alert(res.data.message); return;
          }else {
            this.authEmailIf = true;
            alert('이메일을 보냈습니다.');
            return true;
          }
        })
      },
      //이메일 인증하기 
      async checkAuthEmail(){
        if(this.authEmail === ''){ 
          alert('인증번호를 입력해주세요.'); 
          return;
        }else{
          this.overlapAuthentication = await axios.post(VUE_APP_BACKEND_HOST + '/checkemail', {
            email : this.email,
            no : this.authEmail
          }).then(res => {
            if(res.data.message){
              alert(res.data.message); return;
            }
            if(res.data.data === 1){
              alert('인증이 완료되었습니다.');
              this.authEmailIf = false;
              return true;
            }else {
              alert('인증에 실패했습니다.');
              return false;
            }
          })
        }
      },
      // 회원가입 axious
      async signUp(){
        let checkEng = /[a-zA-Z]/;
        let checkNum = /[0-9]/; 
        let checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;
        if(this.pw !== this.checkPw){
          alert('비밀번호가 일치하지 않습니다.!'); return;
        }
        if(this.pw === ''){
          alert('비밀번호를 입력하세요.'); return;
        }
        if(!checkEng.test(this.pw) || !checkNum.test(this.pw) || !checkSpe.test(this.pw)){
          alert('영어, 숫자, 특수기호를 모두 사용하세요.'); return;
        }
        if(this.overlapId && this.overlapNickName && this.overlapAuthentication){
          await axios.post(VUE_APP_BACKEND_HOST+ '/signup', {
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
        }else if(!this.overlapAuthentication){
          alert('이메일 인증을 다시 해주세요');
        }else {
          alert('통신 오류');
          return;
        }
      },
      validationEmail(str){
        const reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        return reg.test(str);
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