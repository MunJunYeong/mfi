const checkEng = /[a-zA-Z]/;
const checkNum = /[0-9]/; 
const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
const checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;

const checkId = (id)=> {
    if(!id){
      alert('ID를 입력해주세요.'); return false;
    }
    if(checkKor.test(id) || !checkEng.test(id) || !checkNum.test(id)){
      alert('영어와 숫자를 사용해주세요.'); return false;
    }
    if(id.length <6){
      alert('최소 6글자 이상 입력해주세요.'); return false;
    }
    if(id.length > 15){
      alert('최대 15글자까지 입력해주세요.'); return false;
    }
    return true;
}

const checkNickName = (nickName) => {
    if(!nickName){
        alert('닉네임을 입력해주세요.'); return false;
    }
    if(nickName.length <3){
        alert('3글자 이상 입력해주세요.'); return false;
    }
    if(nickName.length > 12){
      alert('최대 12글자까지 입력해주세요.'); return false;
    }
    return true;
}

const validationEmail = (str) => {
  const reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return reg.test(str);
}

const checkPw = (pw) => {
    if(!pw){
        alert('비밀번호를 입력해주세요.'); return false;
    }
    if(pw.length <6){
        alert('6글자 이상 입력해주세요.'); return false;
    }
    if(pw.length > 20){
      alert('최대 20글자까지 입력해주세요.'); return false;
    }
    if(checkKor.test(pw)){
        alert('한글은 사용하지 못합니다.'); return false;
    }
    if(!checkEng.test(pw) || !checkNum.test(pw) || !checkSpe.test(pw)){
      alert('영어, 숫자, 특수기호를 모두 사용하세요.'); return false;
    }
    return true;
}



export default {
    checkId, checkNickName, validationEmail, checkPw
}