const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const cookParser = require('cookie-parser');
const db = require('./lib/db');
const app = express();
const port = 8080

const router = require('./router/index');

// app.use(cookParser);
app.use(bodyParser.json({limit : 5000000}));
app.use(cors());
app.use(router.basicRouter);

app.get('/ping', async(req, res) => {
  res.send('pong');
})




app.listen(port, async () => {
    await db.initialize();
    console.log(`Example app listening at http://localhost:${port}`)
  })