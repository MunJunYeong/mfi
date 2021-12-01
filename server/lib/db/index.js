const { Sequelize, Op, Model}= require('sequelize');
const { modelDefines, modelList } = require('./model');

const models = {};

const initialize = async () => {
    const sequelize = new Sequelize('mfi', 'postgres', 'postgres', {
      host: 'db',
      dialect: 'postgres',
    })

    const modelInit = async () =>{
        for(let i =0; i <modelList.length; i++){
            models[modelList[i]] = await modelDefines[modelList[i]](sequelize);
        }
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
