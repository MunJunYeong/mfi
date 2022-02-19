const dotenv = require('dotenv')
dotenv.config();


const axios = require('axios');

// console.log(`NODE_ENV= ${process.env.NODE_ENV}`);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestIp = require('request-ip');
const cookParser = require('cookie-parser');
const db = require('./lib/db');

const app = express();
const port = 8080
const schedule = require('node-schedule');

const router = require('./router/index');

var whitelist = ['http://localhost:8081', 'http://mfinvest.kr', 'http://backend.mfinvest.kr']
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
app.use(bodyParser.json({limit : 5000000}));
app.use(requestIp.mw())



// const rule = new schedule.RecurrenceRule();
// rule.second = 0; rule.minute = 0; rule.hour = 0; 
// const job = schedule.scheduleJob(rule, function(){
  
// })




// const {visitor : visitorController} = require('./controllers');
const {visitor : visitorService} = require('./service');
// 방문자 수 count해줄 cookie 설정
app.use(async (req, res, next) => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*',
    'Origin': 'http://localhost:8081',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4Ijo2LCJpZCI6InRlc3QiLCJuaWNrTmFtZSI6InRlc3QiLCJlbWFpbCI6ImRmYXNmc0BudmVhZmFldy5jb20iLCJjcmVhdGVkIjoiMjAyMi0wMi0xNFQwODoxNTowMi4zOTdaIiwic3RhdHVzIjpudWxsLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDQ4MjcxNzV9.FwIKsZGi_G7JDs-IFJ3y0by_bDGZfR8dbs_xWFWr830'

  }
  const httpRes = await axios({
    method: 'get',
    url: 'http://backend.mfinvest.kr/idea/2',
    responseType: 'json',
    headers,
  });

  console.log(httpRes.data);


  if(req.cookies.visitor){
    next();
  }else{
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

app.get('/ping', async(req, res) => {
  res.send('pong');
})


// scp  -i ~/Desktop/first-ec2.pem ./.env  ubuntu@3.34.226.52:~/mfi_new/server 

app.listen(port, '0.0.0.0', async () => {
    await db.initialize();
    console.log(`Example app listening at http://localhost:${port}`)

  })