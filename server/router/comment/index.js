const express = require('express')
const commentRouter = express.Router();

const {models, Op} = require('../../lib/db');

commentRouter.post('', async(req, res)=> {
    const data = req.body;

    if(!data){
        res.send({message : 'no data'});
        return;
    }
    const result = await models['comment'].create({
        comment : data.comment,
        userIdx : req.userData.userIdx,
        ideaIdx : data.ideaIdx
    });
    res.send({message : 'success'});
})

commentRouter.get('', async(req, res)=> {
    const ideaIdx = req.query.ideaIdx;

    const result = await models['comment'].findAll({
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


module.exports = commentRouter;