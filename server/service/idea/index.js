const {models, Op} = require('../../lib/db');

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


module.exports = {
    getIdea,
}