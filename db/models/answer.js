'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
  }, {});
  Answer.associate = function (models) {
    Answer.belongsTo(models.User, { foreignKey: 'userId' });
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
    Answer.hasMany(models.ScoringAnswer, { foreignKey: 'answerId' });

    const columnMapping = {
      through: 'ScoringAnswer',
      otherKey: 'userId',
      foreignKey: 'answerId'
    };
    Answer.belongsToMany(models.User, columnMapping);
  };
  return Answer;
};
