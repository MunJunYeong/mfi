const dotenv = require('dotenv')
dotenv.config();

const { parse } = require('node-html-parser');
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

const errorCode = require('./lib/common/error');

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


app.use(router.basicRouter);

//next를 써서 유보시키는 것이 맞는가 ?
app.use(async (err, req, res, next) => {
  console.log(err.message)
  if(err.message in errorCode){
    res.send({message : errorCode[err.message]});
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
    // { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
})



