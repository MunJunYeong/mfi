const {comment : commentRepo } = require ('../../repository');

const postComment = async (req, res) => {
    const data = req.body;

    if(!data.comment) throw new Error('WRONG_ACCESS');
    try{
        const result = await commentRepo.postComment(data.comment, req.userData.userIdx, data.ideaIdx);
        res.send({data : 1});
    }catch(err){
        if(err.message === 'DB_POST_COMMENT')throw new Error(err.message);
        winston.warn(`Unable to postComment :`, err);
        throw new Error('UNABLE_POST_COMMENT');
    }
}

const getComment = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    if(!ideaIdx) throw new Error('WRONG_ACCESS');
    try{
        const result = await commentRepo.getComment(ideaIdx);
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_GET_COMMENT')throw new Error(err.message);
        winston.warn(`Unable to getComment :`, err);
        throw new Error('UNABLE_GET_COMMENT');
    }
}

module.exports = {
    postComment,
    getComment
}