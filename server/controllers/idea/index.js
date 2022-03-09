
const {Op} = require('../../lib/db');

const {idea : ideaService} = require ('../../service');
const {pagination} = require('../../lib/common');


const getIdeaCount = async(req, res) => {
    const result = await ideaService.getIdeaCount();

    res.send({data : result});
}

const postIdea = async (req, res) => {
    const data = req.body;

    if(!data.subject){
        throw new Error('no subject');
    }else if(!data.content){
        throw new Error('no content');
    }

    const result = await ideaService.createIdea(data.subject, data.content, req.userData.userIdx);
    res.send({data : result});
}

const deleteIdea = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    if(!ideaIdx){
        throw new Error('required ideaIdx');
    }
    const result = await ideaService.deleteIdea(ideaIdx);

    if(result === 1){
        res.send({success : '1'});
        return;
    }
}
const updateIdea =  async (req, res) => {
    const ideaIdx = req.body.params.ideaIdx;
    const subject = req.body.params.subject;
    const content = req.body.params.content;
    if(!ideaIdx){
        throw new Error('required ideaIdx');
    }
    if(!subject){
        throw new Error('required subject');
    }
    if(!content){
        throw new Error('required content');
    }
    const result = await ideaService.updateIdea(ideaIdx, subject, content);

    res.send({data : result});

}
//click한 아이디어 가져오기
const getClickIdea = async (req, res) =>{
    const ideaIdx = req.params.ideaIdx;
    //아이디어 가져오는 절
    const result = await ideaService.getIdea(ideaIdx);
    
    res.send({data : result});
}

const showIdea = async (req, res) => {
    const {page, subject, order, role, userIdx, userRole} = req.query;
    const {limit, offset} = pagination.getPagination(page);
    const data = await ideaService.getAllIdea(limit, offset, subject, userIdx, userRole, order, role);

    const result = pagination.getPagingIdeaData(data, page, limit);
    res.send(result);
    return;
}
const showMyIdea = async (req, res) => {
    const {page, subject, userIdx} = req.query;
    const {limit, offset} = pagination.getPagination(page);

    const data = await ideaService.getMyIdea(limit, offset, subject, userIdx);
    
    const result = await pagination.getPagingIdeaData(data, page, limit);
    res.send(result);
    return;
}
const showAdminUserIdea = async (req, res) => {
    const userIdx = req.params.userIdx;
    const {page, subject} = req.query;
    const {limit, offset} = pagination.getPagination(page);
    
    const data = await ideaService.getAdminUserIdea(limit, offset, subject, userIdx);
    
    const result = await pagination.getPagingIdeaData(data, page, limit);
    res.send(result);
    return;
}
module.exports = {
    getIdeaCount,
    showIdea,
    showMyIdea,
    postIdea,
    deleteIdea,
    updateIdea,
    getClickIdea,
    showAdminUserIdea
}