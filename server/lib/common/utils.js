
//회원가입 이메일 인증번호 보내는 함수
const makeEmailNo = (length)=>{
    let result = '';
    const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const chLength = ch.length;
    for(let i = 0; i < length; i++){
        result += ch.charAt(Math.floor(Math.random() * chLength));
    }
    return result;
}

module.exports = {
    makeEmailNo,
}