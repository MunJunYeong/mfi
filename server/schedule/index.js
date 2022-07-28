const schedule = require('node-schedule');
const axios = require('axios');
const {statistics : statisticsRepo} =require('../repository');

const addTotal = schedule.scheduleJob('0 0 0 * * *', async ()=>{
    const totalCnt = await statisticsRepo.getTotalVisitor();
    const updateTotal = await statisticsRepo.updateTotalVisitor(parseInt(totalCnt));
    if(parseInt(updateTotal)){
        console.log('success visitor update')
    }
})

//0 21 13 * * *
const getNews = schedule.scheduleJob('0 21 13 * * *', async ()=>{
    await statisticsRepo.deleteNews();
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': '*/*',
        'Origin': 'http://mfinvest.kr',
    }
    const httpRes = await axios({
      method: 'get',
      url: 'https://m.stock.naver.com/api/news/list?category=mainnews&page=1&pageSize=10',
      // responseType: 'json',
      encoding: null,
      headers,
    });
    let res;
    console.log(httpRes.data[0])
    for(let i = 0; i < httpRes.data.length; i++){
        const data = httpRes.data[i];
        res = await statisticsRepo.createNews(data.tit, data.subcontent, data.oid, data.aid, data.ohnm, data.dt);
    }
    
})
module.exports = {
    addTotal,
    getNews
}