const {models, Op} = require('../../lib/db');
const winston = require('../../lib/common/winston');


const createIdea = async (subject, content, userIdx)=>{
    let res;
    try{
        res = await models['idea'].create({
            subject : subject,
            content : content,
            userIdx : userIdx
        });
    }catch(err){
        winston.error(`Unable to createIdea[service] :`, err);
        throw new Error('DB_CREATE_IDEA');
    }
    return res;
}

//repositry where절을 여기서 
const getAllIdea = async (where, userWhere, order, limit, offset) => {
    let res;
    try{
        res = await models['idea'].findAndCountAll({
            where,
            include : [
                {
                    model : models['user'],
                    where : userWhere,
                    attributes : {
                        exclude : ['id', 'pw', 'email']
                    },
                    required: true,
                }
            ],
            order,
            limit,
            attributes : {
                exclude : ['content']
            },
            offset
        });
    }catch(err){
        winston.error(`Unable to getAllIdea[service] :`, err);
        throw new Error('DB_GET_ALL_IDEA');
    }
    return res;
    
}
const getMyIdea = async (where, userWhere, limit, offset)=>{
    let res;
    try{
        res = await models['idea'].findAndCountAll({
            where,
            include : [
                {
                    model : models['user'],
                    where : userWhere,
                    attributes : {
                        exclude : ['id', 'pw', 'email']
                    },
                    required: true,
                }
            ],
            order : [['ideaIdx', 'DESC']],
            attributes : {
                exclude : ['content']
            },
            limit,
            offset
        });
    }catch(err){
        winston.error(`Unable to getMyIdea[service] :`, err);
        throw new Error('DB_GET_MY_IDEA');
    }
    return res;
    
}
const getAdminUserIdea = async (where, userWhere, limit, offset)=>{
    let res;
    try{
        res = await models['idea'].findAndCountAll({
            where,
            include : [
                {
                    model : models['user'],
                    where : userWhere,
                    attributes : {
                        exclude : ['id', 'pw', 'email']
                    },
                    required: true,
                }
            ],
            order : [['ideaIdx', 'DESC']],
            limit,
            offset
        });
    }catch(err){
        winston.error(`Unable to getAdminUserIdea[service] :`, err);
        throw new Error('DB_GET_ADMIN_USER_IDEA');
    }
    return res;
}
//클릭시 아이디어 가져오기
const getIdea = async (where) => {
    let res;
    try{
        res = await models['idea'].findAll({
            where,
            include : [
                {
                    model : models['user'],
                    attributes : {
                        exclude : ['id', 'pw', 'email']
                    },
                }
            ]
        })
    }catch(err){
        winston.error(`Unable to getIdea[service] :`, err);
        throw new Error('DB_GET_IDEA');
    }
    return res;
    
}

const updateIdea = async(ideaIdx, subject, content) =>{
    let res;
    try{
        res = await models['idea'].update(
            {
                subject : subject,
                content : content
            },
            {
                where : {
                    ideaIdx : ideaIdx,
                },
            }
        )
    }catch(err){
        winston.error(`Unable to updateIdea[service] :`, err);
        throw new Error('DB_UPDATE_IDEA');
    }
    return res;
    
}
const deleteIdea = async(ideaIdx) => {
    let res;
    try{
        res = await models['idea'].destroy({
            where : {
                ideaIdx : ideaIdx
            },
        })
    }catch(err){
        winston.error(`Unable to deleteIdea[service] :`, err);
        throw new Error('DB_DELETE_IDEA');
    }
    return res; 
}


module.exports = {
    createIdea,
    getAllIdea,
    getMyIdea,
    getIdea,
    updateIdea,
    deleteIdea,
    getAdminUserIdea,
}