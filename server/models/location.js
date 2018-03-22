module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    title: { type: DataTypes.STRING, allowNull: false },
  });
  location.associate = (models) => {
    location.hasMany(models.business, {
      foreignKey: 'locationId',
      as: 'locationId'
    });
  };
  return location;
};
