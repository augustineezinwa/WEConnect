module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'Category already exists'
      }
    },
  });
  category.associate = (models) => {
    category.hasMany(models.business, {
      foreignKey: 'categoryId',
      as: 'businesses',
    });
  };
  return category;
};
