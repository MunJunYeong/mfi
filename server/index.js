const dotenv = require('dotenv')
dotenv.config();
const { parse } = require('node-html-parser');
const express = require('express');
require('express-async-errors');
const app = express();
const http = require('http');

const bodyParser = require('body-parser');
const cors = require('cors');
const requestIp = require('request-ip');
const cookParser = require('cookie-parser');

const { Server } = require("socket.io");

const db = require('./lib/db');
//logging
const winston = require('./lib/common/winston');
const router = require('./router/index');
const errorCode = require('./lib/common/error');
const socketEvent = require('./socketEvent');

const port = 8080;

const whitelist = ['http://localhost:8081','http://localhost:8080', 'http://mfinvest.kr', 'http://backend.mfinvest.kr','www.mfinvest.kr']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions));
app.use(cookParser());
app.use(bodyParser.json({limit : 50000000}));
app.use(requestIp.mw());

const schedule = require('./schedule');
schedule.addTotal

app.use(router.basicRouter);
//next를 써서 유보시키는 것이 맞는가 ?
app.use(async (err, req, res, next) => {
  console.log('index : ', err)
  if(err.message in errorCode){
    res.status(errorCode[err.message].status).send({message : errorCode[err.message].message});
    next();  
    return;
  }else {
    //예상치 못한 에러 핸들링 부분
    winston.error(err);
    res.send({message : '시스템 오류가 발생했습니다. 잠시 후 시도해주세요.'});
    next();   return;
  }
})

app.get('/ping', async(req, res) => {
  res.send('pong');
})


const httpServer = http.createServer(app);
//node 내장객체 http모듈로 만든다.
const io = new Server(httpServer, {
  cors: {
    origin: corsOptions.origin,
    credentials: true
  }
});

//socket.request로 요청객체 접근가능
//socket.request.res로 응답객체 접근가능
//socket.id로 소켓 고유 아이디 가져오기
io.on('connection', (socket) => {
    socketEvent.registEvent(socket, io);
});
/*
1. registEvent 부분- eventRoute에서 disconnect말고 돌지를 않음. registEvent부분에서
io.emit은 되는데 루트를 돌려주는 socket.on이 안먹힌다? 근데 disconnect는 돌아감

2. 접속 중인 회원 중에서 리스트를 뽑아내기 위해서는 유효한 토큰인지 확인을 해야하는데
이때 검증을 해줄 미들웨어가 필요. io.use를 통해 해주는 부분인데 여기서 79번째 줄의 
socketEvent.registEvent(socket, io);에서 원래는 socket만 전달했는데 io도 같이 전달해주는게
맞는지?

3. 채팅을 구현하기 위해서 하다가 join, leave를 해주기 위해서 namespace, room을 사용해야함
room은 namespace의 하위개념(namespace안 소켓을 쪼갠 것이 room)
현재 테스트로 프론트에서 testsocket을 전달해줘서 verify 소켓을 만드는거까지 성공 
여기서 layer를 어떻게 해야하는지 ? router를 만들어야할지 안만들고 index.js에서 만들어서 사용할지
*/
const verify = io.of('/testsocket');
verify.on('connection', (socket)=> {
    console.log('verify 소켓 접속 완료')
})

httpServer.listen(port, '0.0.0.0', async () => {
    console.log(process.env.NODE_ENV)
    await db.initialize();
    winston.info(`Listening on port ${port}`);
    // { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
})