module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z0-9_-]+$/i,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z0-9_-]+$/i,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'User with email exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  user.associate = (models) => {
    user.hasMany(models.business, {
      foreignKey: 'userId',
      as: 'businesses',
    });
    user.hasMany(models.review, {
      foreignKey: 'userId',
      as: 'reviews'
    });
  };
  return user;
};
