const {models, Op} = require('../db')

const countVisitors = (req, res, next)=> {
    if(!req.cookies.count &&  req.cookies['connect.sid']){
        res.cookie('count', "", {maxAge : 360000, httpOnly : true});
        var now = new Date();
        var date = now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate();
        if(date != req.cookies.countDate){
            res.cookie('countDate', date, {maxAge : 86400000, httpOnly : true});
            // const result = models['visitor']
        }
    }
}


module.exports  = { countVisitors}