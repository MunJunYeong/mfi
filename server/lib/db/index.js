const { Sequelize, Op, Model}= require('sequelize');
const { modelDefines, modelList } = require('./model');

const models = {};

const env = process.env.NODE_ENV || 'local';

const initialize = async () => {
    const sequelize = new Sequelize(
        process.env[`${env.toUpperCase()}_DATABASE`],
        process.env[`${env.toUpperCase()}_USERNAME`], 
        process.env[`${env.toUpperCase()}_PASSWORD`], 
        {
            host: process.env[`${env.toUpperCase()}_HOST`],
            dialect: 'postgres',
        }
    )

    const modelInit = async () =>{
        for(let i =0; i <modelList.length; i++){
            models[modelList[i]] = await modelDefines[modelList[i]](sequelize);
        }
        // console.log(models[user]);
    }
    const relationInit = async () => {
        for (let i = 0; i < modelList.length; i++) {
            models[modelList[i]].associate(models)
        }
    }

    try {
        await sequelize.authenticate();
        console.log('sequelize connect successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw new Error('Unable to connect to the database');
    }

    await modelInit();
    await relationInit();
    console.log('db init finish');

}

module.exports = {
    initialize,
    models,
    Op
}
