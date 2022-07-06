let checkEng = /[a-zA-Z]/;
let checkNum = /[0-9]/; 
let checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;
let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
let checkEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    

// return 'NOT_CORRECT_FORM'; 이 부분 error code 삭제해주기
const isValidId = (id) => {
    if(!id ||id.length <6 || id.length > 15 ||
        checkKor.test(id)|| !checkEng.test(id) || !checkNum.test(id)) return false;
    return true;
}
const isValidNickName = (nickName) => {
    if(!nickName ||nickName.length <3 || nickName.length > 12) return false;
    return true;
}
const isValidPw = (pw) => {
    if(!pw ||pw.length <6 || pw.length > 20 ||
        checkKor.test(pw)|| !checkEng.test(pw) || 
        !checkNum.test(pw) || !checkSpe.test(pw)) return false;
    return true;
}
const isValidEmail = (email) => {
    return checkEmail.test(email)
}

module.exports = {
    isValidId, isValidNickName, isValidPw, isValidEmail
}