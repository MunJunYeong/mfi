const {DataTypes, Sequelize} = require('sequelize');

const create = async(sequelize) => {
  const userTokenTable = await sequelize.define('userToken', {
    userIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        references: {
            model: 'user',
            key: 'userIdx',
        },
    },
    token: {
      type: DataTypes.STRING(500),
    },
    refresh: {
      type: DataTypes.STRING(500),
    },
  },
  {
      freezeTableName: true,
      timestamps: false,
  })
  
  userTokenTable.associate = function (models) {
    userTokenTable.belongsTo(models.user, {
        foreignKey: 'userIdx',
        onDelete: 'CASCADE',
    })
  };

  return userTokenTable;
}

module.exports = create;