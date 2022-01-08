const {DataTypes, Sequelize} = require('sequelize');

const create = async(sequelize) => {
    const visitorTable = await sequelize.define('visitor', {
        name : {
            type : DataTypes.STRING,
        },
        totalCount : {
            type : DataTypes.INTEGER,
        },
        todayCount : {
            type : DataTypes.INTEGER,
        },
        date : {
            type : DataTypes.STRING
        }
    })

    visitorTable.associate = function (models) {
   
    };

    return visitorTable;
}

module.exports = create;