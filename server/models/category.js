const categoryDataModel = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    categoryContent: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  category.associate = (models) => {
    category.hasMany(models.business, {
      foreignKey: 'categoryId'
    });
  };
  return category;
};

export default categoryDataModel;