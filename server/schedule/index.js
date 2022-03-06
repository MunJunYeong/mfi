const {visitor : visitorService} = require('../service');
const {news : newsService} = require('../service');
const schedule = require('node-schedule');
const axios = require('axios');

const addTotal = schedule.scheduleJob('0 0 0 * * *', async ()=>{
    const totalCnt = await visitorService.getTotalVisitor();
    const updateTotal = await visitorService.updateTotalVisitor(parseInt(totalCnt));
    if(parseInt(updateTotal)){
        console.log('success visitor update')
    }
})

const getNews = schedule.scheduleJob('0 0 13 * * *', async ()=>{
    await newsService.deleteNews();
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': '*/*',
        'Origin': 'http://localhost:8081',
    }
    const httpRes = await axios({
      method: 'get',
      url: 'https://m.stock.naver.com/api/news/list?category=mainnews&page=1&pageSize=10',
      // responseType: 'json',
      encoding: null,
      headers,
    });
    let res;
    for(let i = 0; i < httpRes.data.length; i++){
        res = await newsService.createNews(httpRes.data[i]);
    }
    
})
module.exports = {
    addTotal,
    getNews
}