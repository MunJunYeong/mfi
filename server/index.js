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

const app = express();
const port = 8080;

const router = require('./router/index');

var whitelist = ['http://localhost:8081','http://localhost:8080', 'http://mfinvest.kr', 'http://backend.mfinvest.kr', 'https://m.stock.naver.com/api/news/list?category=mainnews&page=1&pageSize=10']
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
    // if(err.message === 'undefined') message = 'interval serverError. sorry for error. contact please develop team'
    // if(err.message === 'not found') message = 'not found resource'
    // if(err.message === 'not found') message = 'not found resource'
    // console.error(err);
    res.send({message: err.message})
  }
  next();
})

app.get('/ping', async(req, res) => {
  res.send('pong');
})




// scp  -i ~/Desktop/first-ec2.pem ./.env  ubuntu@3.34.226.52:~/mfi_new/server 

app.listen(port, '0.0.0.0', async () => {
    await db.initialize();
    console.log(`Example app listening at http://localhost:${port}`)
})



