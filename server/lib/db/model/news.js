const {DataTypes, Sequelize} = require('sequelize');

const create = async(sequelize) => {
    const newsTable = await sequelize.define('news', {
        idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tit: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        subcontent: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        oid: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        aid: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ohnm: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dt: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        
    },
    {
        freezeTableName: true,
        timestamps: false,
    })
    
    newsTable.associate = function (models) {
   
    };

    return newsTable;
}

module.exports = create;