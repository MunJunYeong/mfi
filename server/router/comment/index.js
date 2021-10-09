const express = require('express')
const commentRouter = express.Router();
const {comment : commentService} = require('../../service/index')

commentRouter.post('', async(req, res)=> {
    const data = req.body;

    if(!data){
        res.send({message : 'no data'});
        return;
    }
    const result = await commentService.postComment(data.comment, req.userData.userIdx, data.ideaIdx);
    res.send({message : 'success'});
})

commentRouter.get('', async(req, res)=> {
    const ideaIdx = req.query.ideaIdx;
    const result = await commentService.getComment(ideaIdx);
    res.send({data : result});
})


module.exports = commentRouter;