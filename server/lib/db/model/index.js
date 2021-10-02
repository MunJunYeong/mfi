const user = require('./user');
const idea = require('./idea');
const comment = require('./comment');

const modelList = [
    'user',
    'idea',
    'comment'
];

module.exports = {
    modelDefines : {
        user,idea, comment
    },
    modelList
}