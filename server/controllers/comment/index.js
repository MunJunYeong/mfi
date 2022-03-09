const {comment : commentService } = require ('../../service');

const postComment = async (req, res) => {
    const data = req.body;

    if(!data.comment){
        throw new Error('no data');
    }
    const result = await commentService.postComment(data.comment, req.userData.userIdx, data.ideaIdx);
    res.send({message : 'success'});
}

const getComment = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    const result = await commentService.getComment(ideaIdx);
    res.send({data : result});
}

module.exports = {
    postComment,
    getComment
}