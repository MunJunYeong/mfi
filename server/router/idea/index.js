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
    
    console.log(whereDate)

    
    where.ideaIdx = ideaIdx;
    if(req.userData.role === 'normal'){
         where.created = {
             [Op.gte] : whereDate
         }
    }
    console.log(where)
    const result = await models['idea'].findAll({
        where,
        include : [
            {
                model : models['user'],
            }
        ]
    })
    res.send({data : result});
    return;
})


module.exports = ideaRouter;