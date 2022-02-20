const {DataTypes, Sequelize} = require('sequelize');

const create = async(sequelize) => {
    const authenticationTable = await sequelize.define('authentication', {
        idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        no : {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    
    authenticationTable.associate = function (models) {
   
    };

    return authenticationTable;
}

module.exports = create;