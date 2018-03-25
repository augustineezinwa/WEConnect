

module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    locationContent:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  location.associate = function (models) {
    // associations can be defined here
  };
  return location;
};
