const { DataTypes, Sequelize }= require('sequelize');

const create = async (sequelize) => {
  const ideaTable = await sequelize.define('idea', {
      // Model attributes are defined here
      ideaIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userIdx: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'userIdx',
          },
      },
      subject: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.STRING
      },
      created: { 
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },

    }, {
      // Other model options go here
      timestamps: false,
      freezeTableName: true
    }
  );
  ideaTable.associate = function (models) {
    ideaTable.belongsTo(models.user, {
      foreignKey: 'userIdx'
    });
  };

  return ideaTable;
}
module.exports = create;