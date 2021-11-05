const {anonymous: anonymousService } = require('../../service');

let checkEng = /[a-zA-Z]/;
let checkNum = /[0-9]/; 
let checkSpe = /[~!@#$%^&*()_+|<>?:{}]/;
let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

//회원가입
const signUP = async (req, res) => {
    const data = req.body;

    if(!data.id || !data.pw || !data.nickName || !data.email){
        res.send({ message : 'no data'});
        return;
    }else if(data.pw.length <=5){
        res.send({ message : '최소 6글자 이상 만들어주세요.'});
        return;
    }else if(!checkEng.test(data.pw) || !checkNum.test(data.pw) || !checkSpe.test(data.pw)){
        res.send({ message : '영어, 숫자, 특수기호를 모두 사용해주세요.'});
        return;
    }

    const result = await anonymousService.signUp(data.id, data.pw, data.nickName, data.email, 'normal');
    res.send({data : result});
    return;
}
//로그인
const signIn = async (req, res) => {
    const data = req.body;

    if(!data.id || !data.pw){
        res.send({message : 'no data'});
        return;
    }
    const result = await anonymousService.signIn(data.id, data.pw);

    res.send(result);
}

//아이디 중복확인
const checkId = async (req, res) =>{
    const data = req.body;

    if(!data.id){
        res.send({ message : 'ID를 입력해주세요.'})
        return;
    }else if(checkKor.test(data.id) || !checkEng.test(data.id) || !checkNum.test(data.id)){
        res.send({message : '영어와 숫자를 사용해주세요.'});
        return;
    }else if(data.id.length <6){
        res.send({message : '6글자 이상 입력해주세요.'});
        return;
    }
    const result = await anonymousService.duplicateId(data.id);
    if(result){
        res.send({
            value : 'false',
            message : '존재하는 ID입니다.'})
        return;
    }else {
        res.send({
            value : 'true',
            message : '사용가능한 ID입니다!'})
        return;
    }
}
const checkNickName = async (req, res) => {
    const data = req.body;

    if(!data.nickName){
        res.send({ message : '닉네임을 입력해주세요.'})
        return;
    }else if(data.nickName <3){
        res.send({ message : '3글자 이상 입력해주세요'})
        return;
    }
    const result = await anonymousService.duplicateNickName(data.nickName);
    if(result){
        res.send({
            value : 'false',
            message : '존재하는 닉네임입니다.'})
        return;
    }else {
        res.send({
            value : 'true',
            message : '사용가능한 닉네임입니다!'})
        return;
    }
}


module.exports = {
    signUP,
    signIn,
    checkId,
    checkNickName
}