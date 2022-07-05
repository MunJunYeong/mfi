const checkEng = /[a-zA-Z]/;
const checkNum = /[0-9]/; 
const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
const checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;

const checkId = (id)=> {
  if(!id){
    return {message : 'ID를 입력해주세요.'};
  }
  if(checkKor.test(id) || !checkEng.test(id) || !checkNum.test(id)){
    return {message : '영어와 숫자를 사용해주세요.'};
  }
  if(id.length <6){
    return {message : '최소 6글자 이상 입력해주세요.'};
  }
  if(id.length > 15){
    return {message : '최대 15글자까지 입력해주세요.'};
  }
  return true;
}

const checkNickName = (nickName) => {
    if(!nickName){
      return {message : '닉네임을 입력해주세요.'};
    }
    if(nickName.length <3){
      return {message : '3글자 이상 입력해주세요.'};
    }
    if(nickName.length > 12){
      return {message : '최대 12글자까지 입력해주세요.'};
    }
    return true;
  }
  
  const validationEmail = (str) => {
    const reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return reg.test(str);
}

const checkPw = (pw) => {
  if(!pw){
      return {message : '비밀번호를 입력해주세요.'};
    }
    if(pw.length <6){
      return {message : '6글자 이상 입력해주세요.'};
    }
    if(pw.length > 20){
      return {message : '최대 20글자까지 입력해주세요.'};
    }
    if(checkKor.test(pw)){
      return {message : '한글은 사용하지 못합니다.'};
    }
    if(!checkEng.test(pw) || !checkNum.test(pw) || !checkSpe.test(pw)){
      return {message : '영어, 숫자, 특수기호를 모두 사용하세요.'};
    }
    return true;
}



export default {
    checkId, checkNickName, validationEmail, checkPw
}