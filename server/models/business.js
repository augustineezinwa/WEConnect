module.exports = (sequelize, DataTypes) => {
  const business = sequelize.define('business', {
    businessname: { type: DataTypes.STRING, allowNull: false },
    businessaddress: { type: DataTypes.STRING, allowNull: false },
    businessdescription: { type: DataTypes.STRING, allowNull: false },
    locationId: { type: DataTypes.STRING, allowNull: false },
    categoryId: { type: DataTypes.STRING, allowNull: false },
    businessimage: { type: DataTypes.STRING, allowNull: true },
    userId: { type: DataTypes.STRING, allowNull: false, unique: { args: true, message: 'business has already be owned' }, }
  });
  business.associate = (models) => {
    business.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    business.belongsTo(models.category, {
      foreignKey: 'categoryId',
      as: 'categoryId',
    });
    business.belongsTo(models.location, {
      foreignKey: 'locationId',
      as: 'locationId'
    });
    business.hasMany(models.review, {
      foreignKey: 'businessId',
      as: 'businessId'
    });
  };
  return business;
};
