

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    categoryContent: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  category.associate = function (models) {
    // associations can be defined here
  };
  return category;
};
