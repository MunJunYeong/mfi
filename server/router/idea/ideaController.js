
const { where } = require('sequelize/types');
const {models, Op} = require('../../lib/db');

const getPagination = (page) => {
    // console.log(page)
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
    if(userIdx) { where.userIdx = userIdx; }
    if(subject) { where.subject = {
        [Op.like] : `%${subject}%`
    }}
    //myInfo.vue
    if(subject === undefined){
        models['idea'].findAndCountAll({
            where : {
                userIdx : userIdx
            },
            include : [
                {
                    model : models['user'],
                }
            ],
            order : [['ideaIdx', 'ASC']],
            limit,
            offset
        }).then(data => {
            const result = getPagingData(data, page, limit);
            res.send(result);
            return;
        })
    }else {
        models['idea'].findAndCountAll({
            where : {
                userIdx : userIdx,
                subject : {
                    [Op.like] : `%${subject}%`
                }
            },
            include : [
                {
                    model : models['user'],
                }
            ],
            order : [['ideaIdx', 'ASC']],
            limit,
            offset
        }).then(data => {
            const result = getPagingData(data, page, limit);
            res.send(result);
            return;
        })
    }
    // return {
    //     totalItems: result.totalItems,

    // }
    

}
