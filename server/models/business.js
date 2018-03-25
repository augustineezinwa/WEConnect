module.exports = (sequelize, DataTypes) => {
  const business = sequelize.define('business', {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locationId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessimage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'business has already be owned'
      },
    }
  });
  business.associate = (models) => {
    business.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    business.belongsTo(models.category, {
      foreignKey: 'categoryId',
    });
    business.belongsTo(models.location, {
      foreignKey: 'locationId',
    });
    business.hasMany(models.review, {
      foreignKey: 'businessId',
      as: 'reviews'
    });
  };
  return business;
};
