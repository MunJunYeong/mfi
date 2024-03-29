

const  getPagination = (page)=> {
    let currentPage = page-1;
    const limit = 6;
    let offset = 0;
    if(currentPage < 1){
        return {limit, offset};
    }else {
        offset = currentPage ? currentPage*limit : 0;
        return {limit, offset};
    }
}

const getPagingUserData = (data, page: number, limit)=> {
    const {count : totalItems, rows: user} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return {totalItems, user, totalPages, currentPage};
}

export {
    getPagination, getPagingUserData
}