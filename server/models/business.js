

module.exports = (sequelize, DataTypes) => {
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
      allowNull: false,
    },
  }, {});
  business.associate = function (models) {
    // associations can be defined here
  };
  return business;
};
