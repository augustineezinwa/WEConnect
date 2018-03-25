'use strict';
module.exports = (sequelize, DataTypes) => {
  var business = sequelize.define('business', {
    businessName: DataTypes.STRING,
    businessAddress: DataTypes.STRING,
    businessDescription: DataTypes.STRING
  }, {});
  business.associate = function(models) {
    // associations can be defined here
  };
  return business;
};