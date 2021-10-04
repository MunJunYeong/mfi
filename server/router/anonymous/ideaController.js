
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
    
    //show idea where
    if(userIdx === undefined){
        if(subject !== undefined){
            where.subject = {
                [Op.like] : `%${subject}%`
            }
        }
    }else{ //show my idea where
        where.userIdx = userIdx;
        if(subject !== undefined){
            where.subject = {
                [Op.like] : `%${subject}%`
            }
        }
    }
    models['idea'].findAndCountAll({
        where,
        include : [
            {
                model : models['user'],
            }
        ],
        order : [['ideaIdx', 'DESC']],
        limit,
        offset
    }).then(data => {
        const result = getPagingData(data, page, limit);
        res.send(result);
        return;
    })
    

}
