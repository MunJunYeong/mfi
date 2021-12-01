
const {Op} = require('../../lib/db');

const {idea : ideaService} = require ('../../service');
const method = require('../../function');

const postIdea = async (req, res) => {
    const data = req.body;

    if(!data.subject){
        res.send({message : 'no subject'});
        return;
    }else if(!data.content){
        res.send({message : 'no content'});
        return;
    }

    const result = await ideaService.createIdea(data.subject, data.content, req.userData.userIdx);
    res.send({data : result});
}

const deleteIdea = async (req, res) => {
    const ideaIdx = req.query.ideaIdx;
    if(!ideaIdx){
        res.send({message : 'required ideaIdx'})
    }
    const result = await ideaService.deleteIdea(ideaIdx);

    if(result === 1){
        res.send({success : '1'});
        return;
    }
}
const updateIdea =  async (req, res) => {
    console.log(req.params)
    const ideaIdx = req.body.params.ideaIdx;
    const subject = req.body.params.subject;
    const content = req.body.params.content;
    if(!ideaIdx){
        res.send({message : 'required ideaIdx'})
        return;
    }
    if(!subject){
        res.send({message : 'required subject'})
        return;
    }
    if(!content){
        res.send({message : 'required content'})
        return;
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
    const {limit, offset} = method.getPagination(page);
    const data = await ideaService.getAllIdea(limit, offset, subject, userIdx, userRole, order, role);

    const result = method.getPagingIdeaData(data, page, limit);
    res.send(result);
    return;
}
const showMyIdea = async (req, res) => {
    const {page, subject, userIdx} = req.query;
    const {limit, offset} = method.getPagination(page);

    const data = await ideaService.getMyIdea(limit, offset, subject, userIdx);
    
    const result = await method.getPagingIdeaData(data, page, limit);
    res.send(result);
    return;
}
const showAdminUserIdea = async (req, res) => {
    const userIdx = req.params.userIdx;
    const {page, subject} = req.query;
    const {limit, offset} = method.getPagination(page);
    
    const data = await ideaService.getAdminUserIdea(limit, offset, subject, userIdx);
    
    const result = await method.getPagingIdeaData(data, page, limit);
    res.send(result);
    return;
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