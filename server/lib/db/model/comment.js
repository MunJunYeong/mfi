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
      onDelete: 'CASCADE',
    });
    commentTable.belongsTo(models.idea, {
        foreignKey: 'ideaIdx',
        onDelete: 'CASCADE',
      });
  };

  return commentTable;
}


let tester1 = (a,b,...opt) => {       
  let sum1 = 0;

  console.log(opt);
  if(opt && Array.isArray(opt)){
    sum1 = opt.reduce((acc, sum)=>{ return sum + acc} , 0)
  }
  return a + b + sum1;  
} 
module.exports = create;