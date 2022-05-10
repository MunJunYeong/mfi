
const {idea : ideaService} = require ('../../service');
const {pagination} = require('../../lib/common');


const postIdea = async (req, res) => {
    const data = req.body;

    if(!data.subject || !data.content) throw new Error('WRONG_ACCESS');

    try{
        const result = await ideaService.createIdea(data.subject, data.content, req.userData.userIdx);
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_CREATE_IDEA'){
            throw new Error(err.message);
        }else {
            winston.error(`Unable to postIdea :`, err);
            throw new Error('UNABLE_POST_IDEA');
        }
    }
    
}

const deleteIdea = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    if(!ideaIdx) throw new Error('WRONG_ACCESS');

    try{
        const result = await ideaService.deleteIdea(ideaIdx);
        res.send({success : '1'});
    }catch(err){
        if(err.message === 'DB_DELETE_IDEA'){
            throw new Error(err.message);
        }else {
            winston.error(`Unable to deleteIdea :`, err);
            throw new Error('UNABLE_DELETE_IDEA');
        }
    }
}
const updateIdea =  async (req, res) => {
    const ideaIdx = req.body.params.ideaIdx;
    const subject = req.body.params.subject;
    const content = req.body.params.content;
    if(!ideaIdx || !subject || !content){
        throw new Error('WRONG_ACCESS');
    }

    try{
        const result = await ideaService.updateIdea(ideaIdx, subject, content);
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_UPDATE_IDEA'){
            throw new Error(err.message);
        }else {
            winston.error(`Unable to updateIdea :`, err);
            throw new Error('UNABLE_UPDATE_IDEA');
        }
    }
}
//click한 아이디어 가져오기
const getClickIdea = async (req, res) =>{
    const ideaIdx = req.params.ideaIdx;
    //아이디어 가져오는 절
    try{
        const result = await ideaService.getIdea(ideaIdx);
        res.send({data : result});
    }catch(err){
        if(err.message === 'DB_GET_IDEA'){
            throw new Error(err.message);
        }else {
            winston.error(`Unable to getClickIdea :`, err);
            throw new Error('UNABLE_CLICK_IDEA');
        }
    }
}

const showIdea = async (req, res) => {
    const {page, subject, order, role, userIdx, userRole} = req.query;
    const {limit, offset} = pagination.getPagination(page);
    
    try{
        const data = await ideaService.getAllIdea(limit, offset, subject, userIdx, userRole, order, role);
        const result = pagination.getPagingIdeaData(data, page, limit);
        res.send(result);
    }catch(err){
        if(err.message === 'DB_GET_ALL_IDEA'){
            throw new Error(err.message);
        }else {
            winston.error(`Unable to showIdea :`, err);
            throw new Error('UNABLE_SHOW_IDEA');
        }
    }
}
const showMyIdea = async (req, res) => {
    const {page, subject, userIdx} = req.query;
    const {limit, offset} = pagination.getPagination(page);

    try{
        const data = await ideaService.getMyIdea(limit, offset, subject, userIdx);
        const result = pagination.getPagingIdeaData(data, page, limit);
        res.send(result);
    }catch(err){
        if(err.message === 'DB_GET_MY_IDEA'){
            throw new Error(err.message);
        }else {
            winston.error(`Unable to showMyIdea :`, err);
            throw new Error('UNABLE_SHOW_MY_IDEA');
        }
    }
}
const showAdminUserIdea = async (req, res) => {
    const userIdx = req.params.userIdx;
    const {page, subject} = req.query;
    const {limit, offset} = pagination.getPagination(page);
    
    try{
        const data = await ideaService.getAdminUserIdea(limit, offset, subject, userIdx);
        const result = await pagination.getPagingIdeaData(data, page, limit);
        res.send(result);
    }catch(err){
        if(err.message === 'DB_GET_ADMIN_USER_IDEA'){
            throw new Error(err.message);
        }else {
            winston.error(`Unable to showAdminUserIdea :`, err);
            throw new Error('UNABLE_SHOW_ADMIN_IDEA');
        }
    }

}
module.exports = {
    showIdea,
    showMyIdea,
    postIdea,
    deleteIdea,
    updateIdea,
    getClickIdea,
    showAdminUserIdea
}