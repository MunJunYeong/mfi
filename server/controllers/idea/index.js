
const {models, Op} = require('../../lib/db');

const _getPagination = (page) => {
    let currentPage = page-1;
    const limit = 6;
    let offset = 0;
    if(currentPage < 1){
        return {limit, offset};
    }else {
        offset = currentPage ? currentPage*limit : 0;
        return {limit, offset};
    }
};

const _getPagingData = (data, page, limit)=> {
    const {count : totalItems, rows: ideas} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return {totalItems, ideas, totalPages, currentPage};
}

const findAll = async (req, res) => {
    const {page, subject, userIdx} = req.query;
    
    const {limit, offset} = _getPagination(page);

    const where = {};
    let order = [['ideaIdx', 'DESC']];
    
    //전체 아이디어 보기 where절

    if(userIdx) {where.userIdx = userIdx ;}
    if(subject){
        where.subject = {
            [Op.like] : `%${subject}%`
        }
    }
    
    //최신, 오래된 순 정렬
    if(req.query.order === 'ASC'){
        order = [['ideaIdx', 'ASC']]
    }else {
        order = [['ideaIdx', 'DESC']]
    }

    
    //위너 아이디어만 보여주기
    const userWhere = {};
    if(req.query.role === 'winner'){ userWhere.role = 'winner' };

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
    console.log(data);
    const result = _getPagingData(data, page, limit);
    res.send(result);
    return;

}

module.exports = {
    findAll,
}