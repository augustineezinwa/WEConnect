export default (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    locationContent:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  location.associate = (models) => {
    location.hasMany(models.business, {
      foreignKey: 'locationId'
    });
  };
  return location;
};
