<template>
    <v-container>
      <v-container class="pc">
        <v-row justify="center" v-if="beforeCheck">
          <v-col cols='4'>
            <v-text-field
              label="아이디 입력"
              v-model="id"
              hide-details="auto"
              :readonly="overlapId"
              v-on:keyup.enter="sendEmail"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" v-if="beforeCheck">
          <v-col cols='3'>
            <v-text-field
              label="이메일 입력"
              v-model="email"
              hide-details="auto"
              :readonly="overlapEmail"
              v-on:keyup.enter="sendEmail"
            ></v-text-field>
          </v-col>
          <v-col cols='1'>
            <v-btn
                elevation="2" block v-on:click="sendEmail"
              >인증번호</v-btn>  
          </v-col>
        </v-row >
        <v-row justify="center" v-if="authEmailIf">
          <v-col cols='4'>
            <v-text-field
                label="인증번호 입력"
                hide-details="auto"
                v-model="authEmail"
                :readonly="overlapAuthentication"
                v-on:keyup.enter="checkAuthEmail"
              ></v-text-field>
          </v-col>
        </v-row>    
        <v-row justify="center" v-if="beforeCheck">
          <v-col cols="4" >
            <v-btn
              elevation="2" block v-on:click="checkAuthEmail()"
              >
              다음
            </v-btn>
          </v-col>      
        </v-row>
        
        <v-row justify="center" v-if="after">
          <v-col cols='4' >
            <h3>변경할 비밀번호 입력</h3>
          </v-col>
        </v-row>
        <v-row justify="center"  v-if="after">
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
                v-on:keyup.enter="updatePw"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center"  v-if="after">
          <v-col cols="4" >
            <v-btn
              elevation="2" block v-on:click="updatePw"
              >
              완료
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
        <v-row justify="center" v-if="beforeCheck">
          <v-col cols='10'>
            <v-text-field
              label="아이디 입력"
              v-model="id"
              hide-details="auto"
              :readonly="overlapId"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" v-if="beforeCheck">
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
                elevation="2" block v-on:click="sendEmail"
              >인증번호</v-btn>  
          </v-col>
        </v-row >
        <v-row justify="center" v-if="authEmailIf">
          <v-col cols='10'>
            <v-text-field
                label="인증번호 입력"
                hide-details="auto"
                v-model="authEmail"
                :readonly="overlapAuthentication"
              ></v-text-field>
          </v-col>
        </v-row>    
        <v-row justify="center" v-if="beforeCheck">
          <v-col cols="4" >
            <v-btn
              elevation="2" block v-on:click="checkAuthEmail()"
              >
              다음
            </v-btn>
          </v-col>      
        </v-row>
        
        <v-row justify="center" v-if="after">
          <v-col cols='10' >
            <h3>변경할 비밀번호 입력</h3>
          </v-col>
        </v-row>
        <v-row justify="center"  v-if="after">
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
        <v-row justify="center"  v-if="after">
          <v-col cols="8" >
            <v-btn
              elevation="2" block v-on:click="updatePw"
              >
              완료
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
  const checkEng = /[a-zA-Z]/;
  const checkNum = /[0-9]/; 
  const checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;
export default {
    name : 'findPw',
    data (){
      return {
        id : '',
        email : '',
        overlapEmail : false,
        overlapId : false,
        authEmailIf : false,
        overlapAuthentication : false,
        authEmail : '',
        beforeCheck : true, 
        after : false,
        pw : '', checkPw : '', show1: false, show2 : false,
        pwRules : [
          value => !!value || '영어, 숫자, 특수기호를 합쳐서 6글자 이상 만들어주세요.',
          value => (checkEng.test(value) && checkNum.test(value) && checkSpe.test(value) && value.length >= 6) || '영어,숫자, 특수기호 6글자 이상',
        ],
        checkPwRules : [
          value => !!value || '비밀번호가 일치하지 않습니다.',
          value => value  === this.pw || '비밀번호가 일치하지 않습니다.'
        ],
      }
    },
    methods : {
      async updatePw(){
        if(this.pw === '' || this.checkPw === ''){
          alert('비밀번호를 입력 해주세요.'); return;
        }
        if(this.pw !== this.checkPw){
          alert('비밀번호가 일치하지 않습니다.'); return;
        }
        let res;
        try{
          res = await this.$store.dispatch('update_pw', {
            email : this.email,
            pw : this.pw,
            id : this.id
          })
        }catch(err){
          console.log(err);
        }
        if(res.data.data === 1){
          alert('비밀번호 변경이 완료되었습니다.');
          history.back();
        }else{
          alert(res.data.message);
        }
      },

      async sendEmail(){
        if(this.overlapEmail){
          alert('인증번호가 이미 전송되었습니다.'); return;
        } 
        if(!this.id){
         alert('아이디를 입력해주세요'); return;
        }
        if(!this.validationEmail(this.email)){
          alert('이메일 형식에 맞추어 작성해주세요.'); return;
        }
        let res;
        try{
          res =await this.$store.dispatch('find_pw_send_email', {
            id : this.id,
            email : this.email
          })
        }catch(err){
          console.log(err);
        }
        if(res.data.message){
          alert(res.data.message); return;
        }else {
          this.authEmailIf = true;
          this.overlapEmail = true;
          this.overlapId = true;
          alert('인증번호가 전송되었습니다.');
        }
      },
      
      async checkAuthEmail(){
        if(this.no === ''){
          alert('인증 번호를 입력해주세요.'); return;
        }
        let res;
        try{
          res =await this.$store.dispatch('find_pw_check_email', {
            email : this.email,
            no : this.authEmail
          })
        }catch (err){
          console.log(err);
        }
        if(res.data.message){
          alert('잘못된 인증번호 입니다.'); return;
        }else{
          this.beforeCheck = false;
          this.authEmailIf = false;
          this.after = true;
          alert('인증에 성공했습니다.'); return;
        }
      },

      validationEmail(str){
        const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return reg.test(str);
      },
    },
    
}
</script>