const {models, Op} = require('../../lib/db');


const  getIdeaCount = async ()=>{
    const result  = await models['idea'].count();
    return result;

}

const createIdea = async (subject, content, userIdx)=>{
    const result = await models['idea'].create({
        subject : subject,
        content : content,
        userIdx : userIdx
    });
    return result;
}



//repositry where절을 여기서 
const getAllIdea = async (limit, offset, subject, userIdx, userRole, orderData, role) => {
    const where = {
        [Op.and] : [],
    };
    console.log(userRole)
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
    

    const data = await models['idea'].findAndCountAll({
        where,
        include : [
            {
                model : models['user'],
                where : userWhere,
                required: true,
            }
        ],
        order,
        limit,
        offset
    });
    return data;
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

    const data = await models['idea'].findAndCountAll({
        where,
        include : [
            {
                model : models['user'],
                where : userWhere,
                required: true,
            }
        ],
        order : [['ideaIdx', 'DESC']],
        limit,
        offset
    });
    return data;
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
    const data = await models['idea'].findAndCountAll({
        where,
        include : [
            {
                model : models['user'],
                where : userWhere,
                required: true,
            }
        ],
        order : [['ideaIdx', 'DESC']],
        limit,
        offset
    });
    return data;
}
//클릭시 아이디어 가져오기
const getIdea = async (ideaIdx) => {
    let where = {};
    
    where.ideaIdx = ideaIdx;
    //where을 토대로 idea 가져오기.
    const result = await models['idea'].findAll({
        where,
        include : [
            {
                model : models['user'],
            }
        ]
    })
    return result;
}

const updateIdea = async(ideaIdx, subject, content) =>{
    const result = await models['idea'].update(
        {
            subject : subject,
            content : content
        },
        {
            where : {
                ideaIdx : ideaIdx,
            },
        }
    )
    return result;
}
const deleteIdea = async(ideaIdx) => {
    const result = await models['idea'].destroy({
        where : {
            ideaIdx : ideaIdx
        },
    })
    return result; 
}


module.exports = {
    getIdeaCount,
    getAllIdea,
    getMyIdea,
    getIdea,
    updateIdea,
    deleteIdea,
    createIdea,
    getAdminUserIdea
}