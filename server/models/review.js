module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    reviewcontent: { type: DataTypes.STRING, allowNull: false },
    businessId: { type: DataTypes.STRING, allowNull: false }
  });
  review.associate = (models) => {
    review.belongsTo(models.business, {
      foreignKey: 'businessId',
      as: 'businessId',
    });
  };
  return review;
};
