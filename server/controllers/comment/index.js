const {comment : commentService } = require ('../../service');

const postComment = async (req, res) => {
    const data = req.body;

    if(!data.comment){
        throw new Error('no data');
    }

    try{
        const result = await commentService.postComment(data.comment, req.userData.userIdx, data.ideaIdx);
        res.send({message : 'success'});
    }catch(err){
        throw new Error(err);
    }
}

const getComment = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    try{
        const result = await commentService.getComment(ideaIdx);
        res.send({data : result});
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {
    postComment,
    getComment
}