
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

const getClickIdea = async (req, res) =>{
    const ideaIdx = req.query.ideaIdx;
    const { userIdx, role } = req.userData;
    if(!(ideaIdx && userIdx && role )){ 
        res.send({message: 'required ideaIdx, userIdx, role'})
        return;
    }
    const result = await ideaService.getIdea(ideaIdx, req.userData.userIdx, req.userData.role );

    if(result.length === 0){
        res.send({message : 'cant approach'})
        return;
    }else {
        res.send({data : result});
        return;
    }
}

const showIdea = async (req, res) => {
    const {page, subject, userIdx} = req.query;
    
    const {limit, offset} = method.getPagination(page);

    const where = {};
    let order = [['ideaIdx', 'DESC']];
    
    if(userIdx) {where.userIdx = userIdx ;}
    if(subject){
        where.subject = {
            [Op.like] : `%${subject}%`
        }
    }
    //최신, 오래된 순 정렬
    if(req.query.order === 'ASC'){
        order = [['ideaIdx', 'ASC']]
    }else {
        order = [['ideaIdx', 'DESC']]
    }
    //위너 아이디어만 보여주기
    const userWhere = {};
    if(req.query.role === 'winner'){ userWhere.role = 'winner' };

    const data = await ideaService.getAllIdea(where, userWhere, order, limit, offset);

    const result = method.getPagingIdeaData(data, page, limit);

    res.send(result);
    return;

}

module.exports = {
    showIdea,
    postIdea,
    deleteIdea,
    updateIdea,
    getClickIdea
}