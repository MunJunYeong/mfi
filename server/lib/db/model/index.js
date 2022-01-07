const user = require('./user');
const idea = require('./idea');
const comment = require('./comment');
const visitor = require('./visitor');

const modelList = [
    'user',
    'idea',
    'comment',
    'visitor'
];

module.exports = {
    modelDefines : {
        user,idea, comment, visitor
    },
    modelList
}