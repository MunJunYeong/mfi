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

const router = require('./router/index');

var whitelist = ['http://localhost:8081', 'http://mfinvest.kr']
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

// app.use(async (req, res, next) => {
  
//   const date = new Date();
  
//   await next();
//   // console.log(res);
//   res.cookie('visitors', { date: date.toISOString()}, {
//     maxAge: 10000
//   });
//   res.send({data: 1})

// });
app.use(async (req, res, next) => {
  const ip = req.clientIp;
  next();
  res.cookie('visitor', ip, {
    maxAge: 100000000
  });
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