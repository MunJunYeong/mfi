const express = require('express');
const ideaRouter = express.Router();

const { idea: ideaService } = require('../../service');


//아이디어 등록
ideaRouter.post('/', async(req, res) => {
    const data = req.body;

    if(!data.subject){
        res.send({message : 'no subject'});
        return;
    }else if(!data.content){
        res.send({message : 'no content'});
        return;
    }
    const result = await ideaService.createIdea(data.subject, data.content, req.userData.userIdx);
    res.send({data : result});
})

//게시판 지우기
ideaRouter.delete('/', async(req,res)=>{
    const ideaIdx = req.query.ideaIdx;
    if(!ideaIdx){
        res.send({message : 'required ideaIdx'})
    }
    const result = await ideaService.deleteIdea(ideaIdx);
    if(result === 1){
        res.send({success : '1'});
        return;
    }

})

//아이디어 수정
ideaRouter.put('/:ideaIdx', async(req,res)=>{
    const ideaIdx = req.body.params.ideaIdx;
    const subject = req.body.params.subject;
    const content = req.body.params.content;
    if(!ideaIdx){
        res.send({message : 'required ideaIdx'})
        return;
    }
    if(!subject){
        res.send({message : 'required subject'})
        return;
    }
    if(!content){
        res.send({message : 'required content'})
        return;
    }
    const result = await ideaService.updateIdea(ideaIdx, subject, content);
    res.send({data : result});

})

//아이디어 클릭시 아이디어 정보
ideaRouter.get('/:ideaIdx', async(req, res)=> {
    const ideaIdx = req.query.ideaIdx;
    const { userIdx, role } = req.userData;
    if(!(ideaIdx && userIdx && role )){ 
        res.send({message: 'required ideaIdx, userIdx, role'})
        return;
    }
    const result = await ideaService.getIdea(ideaIdx, req.userData.userIdx, req.userData.role );
    if(result.length === 0){
        res.send({message : 'cant approach'})
        return;
    }else {
        res.send({data : result});
        return;
    }
})


module.exports = ideaRouter;