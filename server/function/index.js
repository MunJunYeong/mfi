
const  getPagination = (page)=> {
    let currentPage = page-1;
    const limit = 10;
    let offset = 0;
    if(currentPage < 1){
        return {limit, offset};
    }else {
        offset = currentPage ? currentPage*limit : 0;
        return {limit, offset};
    }
}

const getPagingUserData = (data, page, limit)=> {
    const {count : totalItems, rows: user} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return {totalItems, user, totalPages, currentPage};
}
const getPagingIdeaData = (data, page, limit)=> {
    const {count : totalItems, rows: ideas} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return {totalItems, ideas, totalPages, currentPage};
}
module.exports = {
    getPagination,
    getPagingUserData,
    getPagingIdeaData
}