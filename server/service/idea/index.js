const {models, Op} = require('../../lib/db');

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
    // 여기서 추가해야될 부분은 본인이 게시한 아이디어는 볼 수 있어야 한다. ??이걸 해결 못함 ㅠ 위에 로그인된 유저idx는 가지고옴.
    if(userRole === undefined){
        const createdWhere = {
            created : {
                [Op.lte] : whereDate
            }
        };
        where[Op.and].push(createdWhere);   
    }
    if(userRole === 'normal'){
        const  orWhere = {
         [Op.or]: [],   
        } 
        const created = {
            [Op.lte] : whereDate
        }

        orWhere[Op.or].push({ created });


        const  andWhere = {
            [Op.and]: [],   
           } 
        const gtCreated = {
            [Op.gt] : whereDate
        }

        andWhere[Op.and].push({ created: gtCreated });

        where['$user.userIdx$']= userIdx;

        andWhere[Op.and].push({ '$user.userIdx$': userIdx });

        orWhere[Op.or].push(andWhere);

        where[Op.and].push(orWhere);

    }
    // if(userRole === 'normal'){
    //     userWhere.userIdx = userIdx;
    // }
    

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
    console.log(data)
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
    // console.log(subject)
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
    getAllIdea,
    getMyIdea,
    getIdea,
    updateIdea,
    deleteIdea,
    createIdea,
    getAdminUserIdea
}