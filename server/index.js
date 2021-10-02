const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./lib/db');
const app = express();
const port = 8080

const router = require('./router/index');

app.use(bodyParser.json());
app.use(cors());
app.use(router.basicRouter);

app.get('/', async(req, res) => {

})

app.listen(port, async () => {
    await db.initialize();
    console.log(`Example app listening at http://localhost:${port}`)
  }) 