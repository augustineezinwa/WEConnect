module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    locationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  location.associate = (models) => {
    location.hasMany(models.business, {
      foreignKey: 'locationId',
      as: 'businesses'
    });
  };
  return location;
};
