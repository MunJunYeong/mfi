const {DataTypes, Sequelize} = require('sequelize');

const create = async(sequelize) => {
  const totalVisitorTable = await sequelize.define('totalVisitor', {
    idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
      freezeTableName: true,
      timestamps: false,
  })
  
  totalVisitorTable.associate = function (models) {
 
  };

  return totalVisitorTable;
}

module.exports = create;