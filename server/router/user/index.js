const express = require('express')
const userRouter = express.Router();
const userPagination = require('./userController')
const { models, Op } = require('../../lib/db');

const jwt = require('jsonwebtoken');


// userRouter.get('/', async(req,res) =>{
//   // 그 admin인지 유효성 확인 ?
//   const result = await models['user'].findAll({
//     include : [
//       {
//         model : models['idea'],
//       }
//     ]
//   }).then(data => {
//     res.send(data)
//   })
// })
userRouter.get('/', userPagination.findAll);

userRouter.put('/',  async (req, res) =>{
  const data = req.body;
  console.log(data)

  const result = await models['user'].update(
    {
      role : data.role
    },
    {
      where : {
        userIdx : data.userIdx
      }
    }
  )
  if(result){
    res.send(result)
  }
})

// userRouter.put('/', async (req, res) =>{
//     const data = req.body;
    
//     if(!data.age && !data.tel){
//       res.send({messeage : 'no data'});
//     }
    
//     const result = await models['user'].update(
//       { 
//         age : data.age,
//         tel : data.tel
//       },
//       {
//         where : {
//           userIdx : req.userData.userIdx
//         }
//       }
//     )
//     if(result){
//       res.send({data : "수정이 됐습니다."});
//     }
// })



module.exports = userRouter;