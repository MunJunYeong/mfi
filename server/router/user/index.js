const express = require('express')
const userRouter = express.Router();
const {user : userService} = require('../../service');
const userPagination = require('./userController')

const jwt = require('jsonwebtoken');


userRouter.get('/', userPagination.findAll);

userRouter.put('/',  async (req, res) =>{
  const data = req.body;
  
  const result = await userService.updateRole(data.role, data.userIdx);
  if(result){
    res.send(result)
  }
})




module.exports = userRouter;