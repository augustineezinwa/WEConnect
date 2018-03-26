const businessDataModel = (sequelize, DataTypes) => {
  const business = sequelize.define('business', {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    businessAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  business.associate = (models) => {
    business.hasMany(models.review, {
      foreignKey: 'businessId'
    });
    business.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    business.belongsTo(models.category, {
      foreignKey: 'categoryId'
    });
    business.belongsTo(models.location, {
      foreignKey: 'locationId'

    });
  };
  return business;
};

export default businessDataModel;
