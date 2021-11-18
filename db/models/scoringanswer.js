'use strict';
module.exports = (sequelize, DataTypes) => {
  const ScoringAnswer = sequelize.define('ScoringAnswer', {
    vote: DataTypes.BOOLEAN,
    answerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  ScoringAnswer.associate = function (models) {
    ScoringAnswer.belongsTo(models.Answer, { foreignKey: 'answerId' });
  };
  return ScoringAnswer;
};
