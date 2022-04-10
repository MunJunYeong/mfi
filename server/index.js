const dotenv = require('dotenv')
dotenv.config();

const { parse } = require('node-html-parser');
const Iconv = require('iconv-lite');
const axios = require('axios');
const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestIp = require('request-ip');
const cookParser = require('cookie-parser');
const db = require('./lib/db');
//logging
const winston = require('./lib/common/winston');

const app = express();
const port = 8080;

const router = require('./router/index');

const {preProcessing, postProcessing, dbError} = require('./lib/common/error');

var whitelist = ['http://localhost:8081','http://localhost:8080', 'http://mfinvest.kr', 'http://backend.mfinvest.kr']
var corsOptions = {
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

const {visitor : visitorService} = require('./service');

//front init 할 때 하나의 기능으로써 api 하나 따기
app.use(async(req, res, next) =>{
  if(req.cookies.visitor){
    next();
  } else{
    const ip = req.clientIp;
    visitorService.createIp(ip);
    next();
    let now = new Date(); 
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate()+1);
    nextDay.setHours(0, 0, 0); 
    res.cookie('visitor', ip, {
      maxAge: nextDay-now
    });
  }
});


app.use(router.basicRouter);

//next를 써서 유보시키는 것이 맞는가 ?
app.use(async (err, req, res, next) => {
  console.log(err.message)
  //전처리 > 후처리 > dao부분 > 예상치 못한 에러
  if(err.message in preProcessing ){
    res.send({message : preProcessing[err.message]});
    next();  return;
  }else if(err.message in postProcessing[err.message]){
    winston.warn(postProcessing[err.message]+ ': index.js logging');
    res.send({message : '시스템 오류가 발생했습니다. 잠시 후 시도해주세요.'}); 
    next();  return;
  }else if(err.message in dbError[err.message]){
    winston.warn(dbError[err.message]+ ': index.js logging');
    res.send({message : '시스템 오류가 발생했습니다. 잠시 후 시도해주세요.'}); 
    next();  return;
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


app.listen(port, '0.0.0.0', async () => {
    console.log(process.env.NODE_ENV)
    await db.initialize();
    winston.info(`Listening on port ${port}`);
    // winston.error('ㅁㄴㅇㄹㄴㅁㄹㅇㅇㅁㄹ', { a:1, b:2    });
    // { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
})



