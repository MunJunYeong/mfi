const express = require('express');
const ideaRouter = express.Router();

const { idea: ideaController } = require('../../controllers');


//아이디어 등록
ideaRouter.post('/', ideaController.postIdea);

//게시판 지우기
ideaRouter.delete('/', ideaController.deleteIdea)

//아이디어 수정
ideaRouter.put('/:ideaIdx', ideaController.updateIdea)

//아이디어 클릭시 아이디어 정보
ideaRouter.get('/:ideaIdx', ideaController.getClickIdea)


module.exports = ideaRouter;