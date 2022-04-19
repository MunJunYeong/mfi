const redis = require('redis');

const redisClient = redis.createClient('redis.');

module.exports = redisClient