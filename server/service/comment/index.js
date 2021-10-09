const {models, Op} = require('../../lib/db');

const postComment = async (comment, userIdx, ideaIdx)=> {
    const result = await models['comment'].create({
        comment : comment,
        userIdx : userIdx,
        ideaIdx : ideaIdx
    });
    return result;
}
const getComment = async(ideaIdx) => {
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
    return result;
}

module.exports = {
    postComment,
    getComment,
}