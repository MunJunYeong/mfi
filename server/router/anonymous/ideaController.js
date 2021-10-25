
const {models, Op} = require('../../lib/db');

const getPagination = (page) => {
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

const getPagingData = (data, page, limit)=> {
    const {count : totalItems, rows: ideas} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return {totalItems, ideas, totalPages, currentPage};
}

exports.findAll = (req, res) => {
    const {page, subject, userIdx} = req.query;
    
    const {limit, offset} = getPagination(page);

    const where = {};
    let order = [['ideaIdx', 'DESC']];
    
    //전체 아이디어 보기 where절
    if(userIdx === undefined){
        if(subject !== undefined){
            where.subject = {
                [Op.like] : `%${subject}%`
            }
        }
    }else{ //내 아이디어 보기 where절
        where.userIdx = userIdx;
        if(subject !== undefined){
            where.subject = {
                [Op.like] : `%${subject}%`
            }
        }
    }
    //최신, 오래된 순 정렬
    if(req.query.order === 'ASC'){
        order = [['ideaIdx', 'ASC']]
    }else {
        order = [['ideaIdx', 'DESC']]
    }
    // console.log(order)

    
    //위너 아이디어만 보여주기
    if(req.query.role === 'winner'){
        models['idea'].findAndCountAll({
            where,
            include : [
                {
                    model : models['user'],
                    where : {
                      role : 'winner'  
                    },
                    required: false,
                }
            ],
            order,
            limit,
            offset
        }).then(data => {
            const result = getPagingData(data, page, limit);
            res.send(result);
            return;
        })
    }else {
        //전체 아이디어 보여주기
        models['idea'].findAndCountAll({
            where,
            include : [
                {
                    model : models['user'],
                }
            ],
            order,
            limit,
            offset
        }).then(data => {
            const result = getPagingData(data, page, limit);
            res.send(result);
            return;
        })
    }
}
