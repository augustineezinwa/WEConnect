'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {
    reviewcontent: DataTypes.STRING
  }, {});
  review.associate = function(models) {
    // associations can be defined here
  };
  return review;
};