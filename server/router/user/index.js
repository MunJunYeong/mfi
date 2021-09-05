const express = require('express')
const table1Router = express.Router();

const { models, Op } = require('../../lib/db');

const jwt = require('jsonwebtoken');


table1Router.get('/', async (req,res) =>{
    let a = req.query.name;

    //이 부분에 데이터가 들어오지 않는다는 조건문 추가

    const result = await models['테이블이름적어주기'].findAll({
        where : {
            [Op.or] : [
                {
                    name : {
                        [Op.like] : `%${username}%`
                    }
                }
            ]
        }
    })
    res.send({data : result});
})

table1Router.put('/', async (req, res) =>{
    const data = req.body;
    
    if(!data.age && !data.tel){
      res.send({messeage : 'no data'});
    }
    
    const result = await models['user'].update(
      { 
        age : data.age,
        tel : data.tel
      },
      {
        where : {
          userIdx : req.userData.userIdx
        }
      }
    )
    if(result){
      res.send({data : "수정이 됐습니다."});
    }
})



module.exports = table1Router;