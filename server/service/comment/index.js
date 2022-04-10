const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');

const postComment = async (comment, userIdx, ideaIdx)=> {
    try{
        const result = await models['comment'].create({
            comment : comment,
            userIdx : userIdx,
            ideaIdx : ideaIdx
        });
        return result;
    }catch(err){
        winston.error(`Unable to postComment[service] :`, err);
        throw new Error('DB_POST_COMMENT');
    }
    
}
const getComment = async(ideaIdx) => {
    try{
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
    }catch(err){
        winston.error(`Unable to getComment[service] :`, err);
        throw new Error('DB_GET_COMMENT');
    }
    
}

module.exports = {
    postComment,
    getComment,
}