const {comment : commentRepo } = require ('../../repository');

const postComment = async (req, res) => {
    const data = req.body;

    if(!data.comment) throw new Error('WRONG_ACCESS');
    try{
        const result = await commentRepo.postComment(data.comment, req.userData.userIdx, data.ideaIdx);
        res.send({data : 1});
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller postComment Error :`, err);
        throw new Error('CONTROLLER_POST_COMMENT');
    }
}

const getComment = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    if(!ideaIdx) throw new Error('WRONG_ACCESS');
    try{
        const result = await commentRepo.getComment(ideaIdx);
        res.send({data : result});
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller getComment Error:`, err);
        throw new Error('CONTROLLER_GET_COMMENT');
    }
}

module.exports = {
    postComment,
    getComment
}