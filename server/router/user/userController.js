
const {models, Op} = require('../../lib/db');

const getPagination = (page) => {
    let currentPage = page-1;
    const limit = 10;
    let offset = 0;
    if(currentPage < 1){
        return {limit, offset};
    }else {
        offset = currentPage ? currentPage*limit : 0;
        return {limit, offset};
    }
};

const getPagingData = (data, page, limit)=> {
    const {count : totalItems, rows: user} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return {totalItems, user, totalPages, currentPage};
}

exports.findAll = (req, res) => {
    
    const {page, nickName} = req.query;
    const {limit, offset} = getPagination(page);

    if(nickName === undefined){
        models['user'].findAndCountAll({
            where : {
                role : {
                    [Op.ne] : 'admin'
                }
            },
            order : [['userIdx', 'ASC']],
            order : [['role', 'DESC']],
            limit,
            offset
        }).then(data => {
            console.log(data)
            const result = getPagingData(data, page, limit);
            res.send(result);
            return;
        })
    }else {
        models['user'].findAndCountAll({
            where : {
                role : {
                    [Op.ne] : 'admin'
                },
                nickName : {
                    [Op.like] : `%${nickName}%`
                }
            },
            order : [['userIdx', 'ASC']],
            order : [['role', 'DESC']],  
            limit,
            offset
        }).then(data => {
            const result = getPagingData(data, page, limit);
            res.send(result);
            return;
        })
    }  

}
