const userDataModel = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  user.associate = (models) => {
    user.hasMany(models.business, {
      foreignKey: 'userId'
    });
    user.hasMany(models.review, {
      foreignKey: 'userId'
    });
  };
  return user;
};

export default userDataModel;