'use strict';
module.exports = (sequelize, DataTypes) => {
  var location = sequelize.define('location', {
    title: DataTypes.STRING
  }, {});
  location.associate = function(models) {
    // associations can be defined here
  };
  return location;
};