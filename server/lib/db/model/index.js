const user = require('./user');
const idea = require('./idea');
const comment = require('./comment');
const visitor = require('./visitor');
const totalVisitor = require('./totalVisitor');
const modelList = [
    'user',
    'idea',
    'comment',
    'visitor',
    'totalVisitor'
];

module.exports = {
    modelDefines : {
        user,idea, comment, visitor, totalVisitor
    },
    modelList
}