'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Answer, { foreignKey: 'userId' });
    User.hasMany(models.ScoringAnswer, { foreignKey: 'userId' });
    User.hasMany(models.Question, { foreignKey: 'userId' });
  };
  return User;
};
