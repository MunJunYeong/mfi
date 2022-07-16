const { DataTypes, Sequelize }= require('sequelize');

const create = async (sequelize) => {
  const ideaTable = await sequelize.define('idea', {
      ideaIdx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userIdx: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

    }, {
      // Other model options go here
      timestamps: false,
      freezeTableName: true
    }
  );
  ideaTable.associate = function (models) {
    ideaTable.belongsTo(models.user, {
      foreignKey: 'userIdx',
      onDelete: 'CASCADE',
    },
    );
  };

  return ideaTable;
}
module.exports = create;