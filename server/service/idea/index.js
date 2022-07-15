
const winston = require('../../lib/common/winston');
const {idea : ideaRepo} = require('../../repository');

const createIdea = async (subject, content, userIdx)=>{
    let res;
    try{
        res = await ideaRepo.createIdea(subject, content, userIdx);
    }catch(err){
        winston.error(`Unable to createIdea[service] :`, err);
        throw new Error('DB_CREATE_IDEA');
    }
    return res;
}

//repositry where절을 여기서 
const getAllIdea = async (limit, offset, subject, userIdx, userRole, orderData, role) => {
    const where = {
        [Op.and] : [],
    };
    let date= new Date();
    const whereDate = date.setDate(-45);
    let order = [['ideaIdx', 'DESC']];

    if(subject){
        const subjectWhere = {
            subject : {
                [Op.like] : `%${subject}%`
            }  
        };
        where[Op.and].push(subjectWhere);     
    }
    //최신, 오래된 순 정렬
    if(orderData === 'ASC'){
        order = [['ideaIdx', 'ASC']]
    }else {
        order = [['ideaIdx', 'DESC']]
    }
    //위너 아이디어만 보여주기
    const userWhere = {};
    if(role === 'winner'){
        userWhere.role = 'winner'
    };

    //비유저거나 노말회원일 경우에는 45일 이전의 게시물은 볼 수 없다.
    //비회원ㅣ 경우 45일 이전의 게시물만 확인할 수 있다.
    if(userRole === undefined){
        const createdWhere = {
            created : {
                [Op.lte] : whereDate
            }
        };
        where[Op.and].push(createdWhere);   
    }

    //  45일 지난 모든 아이디어 || (45일 안 지난 아이디어 && 내가 쓴 아이디어 )
    //노말 회원일 경우에는 45일 
    if(userRole === 'normal'){
        const  orWhere = {
         [Op.or]: [],   
        }
        //45일 이전의 게시물
        const lteCreated = {
            created : {
                [Op.lte] : whereDate
            }
        }
        
        //45일 이후의 게시물 중 내 게시물을 가지고 온다.
        const  andWhere = {
            [Op.and]: [],   
        }
        const gtCreated = {
            created : {
                [Op.gt] : whereDate
            }
        }
        andWhere[Op.and].push(gtCreated);
        andWhere['$user.userIdx$']= userIdx;
        andWhere[Op.and].push({ '$user.userIdx$': userIdx });
        
        //1. 첫 번째 더하기
        orWhere[Op.or].push(lteCreated);
        // //2. 두 번째 더하기
        orWhere[Op.or].push(andWhere);
        where[Op.and].push(orWhere);
    }
    let res;
    try{
        res = await ideaRepo.getAllIdea(where, userWhere, order, limit, offset)
    }catch(err){
        winston.error(`Unable to getAllIdea[service] :`, err);
        throw new Error('DB_GET_ALL_IDEA');
    }
    return res;
}
const getMyIdea = async (limit, offset, subject, userIdx)=>{
    const where = {};
    if(subject){
        where.subject = {
            [Op.like] : `%${subject}%`
        }
    }
    const userWhere = {};
    userWhere.userIdx = userIdx;

    let res;
    try{
        res = await ideaRepo.getMyIdea(where, userWhere, limit, offset);
    }catch(err){
        winston.error(`Unable to getMyIdea[service] :`, err);
        throw new Error('DB_GET_MY_IDEA');
    }
    return res;
    
}
const getAdminUserIdea = async (limit, offset, subject, userIdx)=>{
    const where = {};
    if(subject){
        where.subject = {
            [Op.like] : `%${subject}%`
        }
    }
    const userWhere = {};
    userWhere.userIdx = userIdx;

    let res;
    try{
        res = await ideaRepo.getAdminUserIdea(where, userWhere, limit, offset);
    }catch(err){
        winston.error(`Unable to getAdminUserIdea[service] :`, err);
        throw new Error('DB_GET_ADMIN_USER_IDEA');
    }
    return res;
    
}
//클릭시 아이디어 가져오기
const getIdea = async (ideaIdx) => {
    let where = {};
    
    where.ideaIdx = ideaIdx;
    //where을 토대로 idea 가져오기.
    let res;
    try{
        res = await ideaRepo.getIdea(where);
    }catch(err){
        winston.error(`Unable to getIdea[service] :`, err);
        throw new Error('DB_GET_IDEA');
    }
    return res;
    
}

const updateIdea = async(ideaIdx, subject, content) =>{
    let res;
    try{
        res = await ideaRepo.updateIdea(ideaIdx, subject, content)
    }catch(err){
        winston.error(`Unable to updateIdea[service] :`, err);
        throw new Error('DB_UPDATE_IDEA');
    }
    return res;
    
}
const deleteIdea = async(ideaIdx) => {
    let res;
    try{
        res = await ideaRepo.deleteIdea(ideaIdx);
    }catch(err){
        winston.error(`Unable to deleteIdea[service] :`, err);
        throw new Error('DB_DELETE_IDEA');
    }
    return res; 
    
}


module.exports = {
    getAllIdea,
    getMyIdea,
    getIdea,
    updateIdea,
    deleteIdea,
    createIdea,
    getAdminUserIdea
}