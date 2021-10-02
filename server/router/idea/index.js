const express = require('express');
const { where } = require('sequelize/types');
const ideaRouter = express.Router();

const {models, Op} = require('../../lib/db');

const ideaPagination = require('./ideaController');

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
    // if(!data.ideaIdx){
    //     res.send({message : 'no ideaIdx'});
    // }
    const result = await models['idea'].destroy({
        where : {
            ideaIdx : ideaIdx
        },
    }) 
    res.send({success : '1'})
})

//내가 적은 아이디어 보기
ideaRouter.get('/info', ideaPagination.findAll);

//아이디어 클릭시 아이디어 정보
ideaRouter.get('/idea-click', async(req, res)=> {
    const ideaIdx = req.query.ideaIdx;

    if(req.user.role === 'normal') { where.createdAt = { [op.lte] : new Date().add(-45)}}
    const result = await models['idea'].findAll({
        where : {
            ideaIdx : ideaIdx
        },
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
