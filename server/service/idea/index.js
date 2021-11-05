const {models, Op} = require('../../lib/db');

const createIdea = async (subject, content, userIdx)=>{
    const result = await models['idea'].create({
        subject : subject,
        content : content,
        userIdx : userIdx
    });
    return result;
}

const getAllIdea = async (where, userWhere, order, limit, offset) => {
    const data = await models['idea'].findAndCountAll({
        where,
        include : [
            {
                model : models['user'],
                where : userWhere,
                required: true,
            }
        ],
        order,
        limit,
        offset
    });
    return data;

}
//클릭시 아이디어 가져오기
const getIdea = async (ideaIdx, userIdx, role ) => {
    let where = {};

    let date = new Date();
    let whereDate = date.setDate(-45);
    
    where.ideaIdx = ideaIdx;
    const setWhere =  await models['idea'].findAll({
        where,
    })
    //등급이 normal이고 본인의 게시물이 아닐 시에 45일이 지나지 않은 게시물은 열람할 수 없다. where에 추가
    if(role === 'normal'){
        if(userIdx !== setWhere[0].toJSON().userIdx){
            where.created = {
                [Op.lte] : whereDate
            }
        }
    }
    //where을 토대로 idea 가져오기.
    const result = await models['idea'].findAll({
        where,
        include : [
            {
                model : models['user'],
            }
        ]
    })
    return result;
}

const updateIdea = async(ideaIdx, subject, content) =>{
    const result = await models['idea'].update(
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
    return result;
}
const deleteIdea = async(ideaIdx) => {
    const result = await models['idea'].destroy({
        where : {
            ideaIdx : ideaIdx
        },
    })
    return result; 
}


module.exports = {
    getAllIdea,
    getIdea,
    updateIdea,
    deleteIdea,
    createIdea
}