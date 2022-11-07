const schedule = require('node-schedule');
const axios = require('axios');
const {statistics : statisticsRepo} =require('../repository');

// 0 0 0 * * *
const addTotal = schedule.scheduleJob('0 0 0 * * *', async ()=>{
    const totalData = await statisticsRepo.getTotalVisitor();
    const todayCnt = await statisticsRepo.getTodayVisitor();
    // todayVisitor 삭제
    await statisticsRepo.deleteVisitor();

    const updateCnt = totalData.total + todayCnt;
    const updateResult = await statisticsRepo.updateTotalVisitor(updateCnt);
    if(updateResult[0] === 1){
        console.log('success visitor update');
    }
})

const getNews = schedule.scheduleJob('0 0 10 * * *', async ()=>{
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
    for(let i = 0; i < httpRes.data.length; i++){
        const data = httpRes.data[i];
        res = await statisticsRepo.createNews(data.tit, data.subcontent, data.oid, data.aid, data.ohnm, data.dt);
    }
})

module.exports = {
    addTotal,
    getNews
}