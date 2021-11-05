const express = require('express')
const commentRouter = express.Router();

const {comment : commentController} = require('../../controllers');



commentRouter.get('', commentController.getComment)
commentRouter.post('', commentController.postComment)




module.exports = commentRouter;