'use strict';
module.exports = (sequelize, DataTypes) => {
  const ScoringAnswer = sequelize.define('ScoringAnswer', {
    vote: DataTypes.BOOLEAN,
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  ScoringAnswer.associate = function (models) {
    ScoringAnswer.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return ScoringAnswer;
};
