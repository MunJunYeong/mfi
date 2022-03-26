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
        winston.warn(`Unable to postComment :`, err);
        throw new Error(16);
    }
}

const getComment = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    try{
        const result = await commentService.getComment(ideaIdx);
        res.send({data : result});
    }catch(err){
        winston.warn(`Unable to getComment :`, err);
        throw new Error(17);
    }
}

module.exports = {
    postComment,
    getComment
}