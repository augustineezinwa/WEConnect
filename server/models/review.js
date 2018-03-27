const reviewDataModel = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    reviewContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  review.associate = (models) => {
    review.belongsTo(models.business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE'
    });
    review.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return review;
};

export default reviewDataModel;
