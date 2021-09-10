const express = require('express')
const ideaRouter = express.Router();

const {models, Op} = require('../../lib/db');

const ideaPagination = require('./ideaController');

ideaRouter.post('/', async(req, res) => {
    const data = req.body;

    if(!data.subject){
        res.send({message : 'no subject'});
        return;
    }else if(!data.content){
        res.send({message : 'no content'});
        return;
    }else if(!data.subject && !data.content){
        res.send({message : 'empty'});
        return;
    }

    const result = await models['idea'].create({
        subject : data.subject,
        content : data.content,
        userIdx : req.userData.userIdx
    });
    res.send({data : result});
})

ideaRouter.get('/size', ideaPagination.findAll);




ideaRouter.get('/idea-click', async(req, res)=> {
    const ideaIdx = req.query.ideaIdx;

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

ideaRouter.delete('', async (req, res) => {
    const ideaIdx = req.query.ideaIdx;

    const result = await models['idea'].destroy({
        where : {
            ideaIdx : ideaIdx
        }
    })
    res.send({data : 'delete'})
})

module.exports = ideaRouter;