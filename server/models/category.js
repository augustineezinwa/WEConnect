module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    title: { type: DataTypes.STRING, allowNull: false, unique: { args: true, message: 'Category already exists' } },
  });
  category.associate = (models) => {
    category.hasMany(models.business, {
      foreignKey: 'categoryId',
      as: 'categoryId',
    });
  };
  return category;
};
