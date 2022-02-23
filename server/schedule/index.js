const {visitor : visitorService} = require('../service');
const schedule = require('node-schedule');

const addTotal = schedule.scheduleJob('0 * * * * *', async ()=>{
    const totalCnt = await visitorService.getTotalVisitor();
    const updateTotal = await visitorService.updateTotalVisitor(parseInt(totalCnt));
    if(parseInt(updateTotal)){
        console.log('success visitor update')
    }
})

module.exports = {
    addTotal
}