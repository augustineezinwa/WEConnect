

module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    reviewContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  review.associate = function (models) {
    // associations can be defined here
  };
  return review;
};
