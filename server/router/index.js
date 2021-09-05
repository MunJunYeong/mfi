const express = require('express')
const basicRouter = express.Router();
const {middleware} = require('../lib/common/index');
const anonymousRouter = require('./anonymous');
const ideaRouter = require('./idea');
const commentRouter = require('./comment');

//미들웨어 부분은 왜 {} ?

basicRouter.use('/', anonymousRouter);
basicRouter.use('/idea', middleware.validateToken, ideaRouter);
basicRouter.use('/comment', middleware.validateToken, commentRouter);

module.exports = {
    basicRouter
}