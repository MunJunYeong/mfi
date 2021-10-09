const { DataTypes, Sequelize }= require('sequelize');

const create = async (sequelize) => {
  const commentTable = await sequelize.define('comment', {
      // Model attributes are defined here
      commentIdx: {
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
      ideaIdx: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        references: {
            model: 'idea',
            key: 'ideaIdx',
          },
      },
      comment: {
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
  commentTable.associate = function (models) {
    commentTable.belongsTo(models.user, {
      foreignKey: 'userIdx',
    });
    commentTable.belongsTo(models.idea, {
        foreignKey: 'ideaIdx',
        onDelete: "cascade",
      });
  };

  return commentTable;
}
module.exports = create;