const express = require('express');
const ideaRouter = express.Router();
const IdeaController = require('../../controller/ideaController')
const {models, Op} = require('../../lib/db');

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

    const result = await models['idea'].create({
        subject : data.subject,
        content : data.content,
        userIdx : req.userData.userIdx
    });
    res.send({data : result});
})

//게시판 지우기
ideaRouter.delete('/', async(req,res)=>{
    const ideaIdx = req.query.ideaIdx;
    const result = await models['idea'].destroy({
        where : {
            ideaIdx : ideaIdx
        },
    }) 
    res.send({success : '1'})
})
ideaRouter.put('/:ideaIdx', async(req,res)=>{
    const ideaIdx = req.body.params.ideaIdx;
    const subject = req.body.params.subject;
    const content = req.body.params.content;

    const result = await models['idea'].update(
        {
            subject : subject,
            content : content
        },
        {
            where : {
                ideaIdx : ideaIdx,
            },
        }
    )
    res.send({data : result});

})

//아이디어 클릭시 아이디어 정보
//근데 여기서 req.body.params로 주진 않았는데 ㅇ어떻게 돌아가는지 ?
ideaRouter.get('/:ideaIdx', async(req, res)=> {
    const ideaIdx = req.query.ideaIdx;
    const { userIdx, role } = req.userData;

    if(!(ideaIdx && userIdx && role )){ res.send({message: 'required ideaIdx, userIdx, role'})}

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