const {comment : commentService } = require ('../../service');

const postComment = async (req, res) => {
    const data = req.body;

    if(!data.comment){
        throw new Error('WRONG_ACCESS');
    }
    try{
        const result = await commentService.postComment(data.comment, req.userData.userIdx, data.ideaIdx);
        res.send({data : 1});
    }catch(err){
        if(err.message){
            throw new Error(err.message);
        }
        winston.warn(`Unable to postComment :`, err);
        throw new Error('UNABLE_POST_COMMENT');
    }
}

const getComment = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    try{
        const result = await commentService.getComment(ideaIdx);
        res.send({data : result});
    }catch(err){
        if(err.message){
            throw new Error(err.message);
        }
        winston.warn(`Unable to getComment :`, err);
        throw new Error('UNABLE_GET_COMMENT');
    }
}

module.exports = {
    postComment,
    getComment
}