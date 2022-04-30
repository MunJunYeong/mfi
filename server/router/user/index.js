const express = require('express')
const userRouter = express.Router();
const {user : userController} = require('../../controllers');


// userRouter.get('/', userPagination.findAll);
userRouter.get('/', userController.getUser);
userRouter.put('/',  userController.updateUserRole);

//user data 정보
userRouter.get('/:userIdx', userController.getuserData);


module.exports = userRouter;