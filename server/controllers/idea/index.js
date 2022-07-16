
const {idea : ideaService} = require ('../../service');
const pagination = require('../../lib/common/pagination');
const winston = require('../../lib/common/winston');


const postIdea = async (req, res) => {
    const data = req.body;

    if(!data.subject || !data.content) throw new Error('WRONG_ACCESS');

    try{
        const result = await ideaService.createIdea(data.subject, data.content, req.userData.userIdx);
        res.send({data : result});
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller postIdea Error :`, err);
        throw new Error('CONTROLLER_POST_IDEA');
    }
}

const showIdea = async (req, res) => {
    const {page, subject, order, role, userIdx, userRole} = req.query;
    const {limit, offset} = pagination.getPagination(page);
    let data;
    try{
        data = await ideaService.getAllIdea(limit, offset, subject, userIdx, userRole, order, role);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller showIdea Error :`, err);
        throw new Error('CONTROLLER_SHOW_IDEA');
    }
    const result = pagination.getPagingIdeaData(data, page, limit);
    res.send(result);
}

const deleteIdea = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    if(!ideaIdx) throw new Error('WRONG_ACCESS');
    let result;
    try{
        result = await ideaService.deleteIdea(ideaIdx);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller deleteIdea Error :`, err);
        throw new Error('CONTROLLER_DELETE_IDEA');
    }
    res.send({success : '1'});
}
const updateIdea =  async (req, res) => {
    const ideaIdx = req.body.params.ideaIdx;
    const subject = req.body.params.subject;
    const content = req.body.params.content;
    if(!ideaIdx || !subject || !content) throw new Error('WRONG_ACCESS');

    let result;
    try{
        result = await ideaService.updateIdea(ideaIdx, subject, content);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller updateIdea Error :`, err);
        throw new Error('CONTROLLER_UPDATE_IDEA');
    }
    res.send({data : result});
}
//click한 아이디어 가져오기
const getClickIdea = async (req, res) =>{
    const ideaIdx = req.params.ideaIdx;
    //아이디어 가져오는 절
    let result;
    try{
        result = await ideaService.getIdea(ideaIdx);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller getClickIdea Error :`, err);
        throw new Error('CONTROLLER_CLICK_IDEA');
    }
    res.send({data : result});
}

const showMyIdea = async (req, res) => {
    const {page, subject, userIdx} = req.query;
    const {limit, offset} = pagination.getPagination(page);
    let data;
    try{
        data = await ideaService.getMyIdea(limit, offset, subject, userIdx);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller showMyIdea Error :`, err);
        throw new Error('CONTROLLER_SHOW_MY_IDEA');
    }
    const result = pagination.getPagingIdeaData(data, page, limit);
    res.send(result);
}
const showAdminUserIdea = async (req, res) => {
    const userIdx = req.params.userIdx;
    const {page, subject} = req.query;
    const {limit, offset} = pagination.getPagination(page);
    if(!userIdx) throw new Error('WRONG_ACCESS');
    let data;
    try{
        data = await ideaService.getAdminUserIdea(limit, offset, subject, userIdx);
    }catch(err){
        if(err.message)throw new Error(err.message);
        winston.warn(`Controller showAdminUserIdea Error :`, err);
        throw new Error('CONTROLLER_SHOW_ADMIN_IDEA');
    }
    const result = await pagination.getPagingIdeaData(data, page, limit);
    res.send(result);

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