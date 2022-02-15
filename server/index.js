const dotenv = require('dotenv')
dotenv.config();

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

const scheduler = schedule.scheduleJob('0 0 0 * * *', function(){ 
    console.log('정시를 알려드립니다!'); 
});

const rule = new schedule.RecurrenceRule();
rule.second = 0; rule.minute = 0; rule.hour = 0; 
const job = schedule.scheduleJob(rule, function(){
  
})

// 방문자 수 count해줄 cookie 설정
app.use(async (req, res, next) => {
  
  scheduler
  if(req.cookies.visitor){
    next();
  }else{
    const ip = req.clientIp;
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