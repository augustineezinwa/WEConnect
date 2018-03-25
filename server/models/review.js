module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    reviewContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  review.associate = (models) => {
    review.belongsTo(models.business, {
      foreignKey: 'businessId',
    });
    review.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return review;
};
