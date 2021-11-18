'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Answer, { foreignKey: 'userId' });
    User.hasMany(models.Question, { foreignKey: 'userId' });

    const columnMapping = {
      through: 'ScoringAnswer',
      foreignKey: 'userId',
      otherKey: 'answerId'
    };
    User.belongsToMany(models.Answer, columnMapping);
  };
  return User;
};
