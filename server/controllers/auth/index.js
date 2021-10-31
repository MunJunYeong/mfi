const {anonymous: anonymousService } = require('../../service');

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

module.exports = {
    checkId,
}