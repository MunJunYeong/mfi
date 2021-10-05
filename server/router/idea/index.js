const express = require('express');
const ideaRouter = express.Router();
const IdeaController = require('../../controller/ideaController')
const {models, Op} = require('../../lib/db');


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

//아이디어 클릭시 아이디어 정보
ideaRouter.get('/:ideaIdx', async(req, res)=> {
    const ideaIdx = req.query.ideaIdx;

    let where = {};

    let date = new Date();
    let whereDate = date.setDate(-45);
    
    where.ideaIdx = ideaIdx;

    const middle =  await models['idea'].findAll({
        where,
    })

    //등급이 normal이고 본인의 게시물이 아닐 시에 45일이 지나지 않은 게시물은 열람할 수 없다.
    if(req.userData.role === 'normal'){
        if(req.userData.userIdx !== middle[0].toJSON().userIdx){
            where.created = {
                [Op.lte] : whereDate
            }
        }
    }
    
    const result = await models['idea'].findAll({
        where,
        include : [
            {
                model : models['user'],
            }
        ]
    })

    
    if(result.length === 0){
        res.send({message : 'cant approach'})
        return;
    }else {
        res.send({data : result});
        return;
    }

})


module.exports = ideaRouter;