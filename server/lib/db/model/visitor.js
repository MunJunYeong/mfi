const {DataTypes, Sequelize} = require('sequelize');

const create = async(sequelize) => {
    const visitorTable = await sequelize.define('visitor', {
        visitorIdx : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        ip : {
            type : DataTypes.STRING,
        },
        total : {
            type : DataTypes.INTEGER,
        },
        date : {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    
    visitorTable.associate = function (models) {
   
    };

    return visitorTable;
}

module.exports = create;