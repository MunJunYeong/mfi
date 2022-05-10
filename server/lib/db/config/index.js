require('dotenv').config();
const env = process.env.NODE_ENV || 'local';

console.log(env)
//이 부분에서 막힘 
// npx sequelize-cli db:migrate --env development 
// env는 local로만 들어오게 됨.

module.exports = {
    local : {
        username : process.env[`${env.toUpperCase()}_USERNAME`],
        password :  process.env[`${env.toUpperCase()}_PASSWORD`],
        database : process.env[`${env.toUpperCase()}_DATABASE`],
        host : process.env[`${env.toUpperCase()}_HOST`],
        dialect : 'postgres',
    },
    development : {
        username : process.env[`${env.toUpperCase()}_USERNAME`],
        password :  process.env[`${env.toUpperCase()}_PASSWORD`],
        database : process.env[`${env.toUpperCase()}_DATABASE`],
        host : process.env[`${env.toUpperCase()}_HOST`],
        dialect : 'postgres',
    },
}
// {
//     "local": {
//         "username": "postgres",
//         "password" : "postgres",
//         "database": "mfi",
//         "host": "localhost",
//         "dialect": "postgres"
//     },
//     "development": {
//         "username": "mfi",
//         "password": "mfianswnsdud!",
//         "database": "mfi",
//         "host": "mfi.ctj83k4lukvd.ap-northeast-2.rds.amazonaws.com",
//         "dialect": "postgres"
//     },
//     "production": {
//         "username": "mfi",
//         "password": "postgres",
//         "database": "mfi",
//         "host": "localhost",
//         "dialect": "postgres"
//     }
// }

