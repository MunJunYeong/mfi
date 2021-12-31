const {DataTypes, Sequelize} = require('sequelize');

const create = async(sequelize) => {
    const visitorTable = await sequelize.define('visitor', {
        totalCount : {
            type : DataTypes.INTEGER,
        },
        todayCount : {
            type : DataTypes.INTEGER,
        },
    })
}

module.exports = create;