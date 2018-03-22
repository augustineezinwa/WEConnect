'use strict';
module.exports = (sequelize, DataTypes) => {
  var business = sequelize.define('business', {
    businessname: DataTypes.STRING,
    businessaddress: DataTypes.STRING,
    businessdescription: DataTypes.STRING,
    location: DataTypes.STRING,
    category: DataTypes.STRING,
    businessimage: DataTypes.STRING
  }, {});
  business.associate = function(models) {
    // associations can be defined here
  };
  return business;
};