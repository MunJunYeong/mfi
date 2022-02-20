const user = require('./user');
const idea = require('./idea');
const comment = require('./comment');
const visitor = require('./visitor');
const totalVisitor = require('./totalVisitor');
const authentication = require('./authentication');
const modelList = [
    'user',
    'idea',
    'comment',
    'visitor',
    'totalVisitor',
    'authentication',
];

module.exports = {
    modelDefines : {
        user,idea, comment, visitor, totalVisitor, authentication
    },
    modelList
}