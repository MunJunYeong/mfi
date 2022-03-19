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

app.use(async (err, req, res, next) => {
  console.log(err)
  if(err) {
    res.send({message: err.message})
  }
  next();
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



