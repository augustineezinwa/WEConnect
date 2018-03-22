module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('businesses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    businessname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    businessaddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    businessdescription: {
      type: Sequelize.STRING,
      allowNull: false
    },
    locationId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: { args: true, message: 'business has already be owned' },
    },
    categoryId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: { args: true, message: 'business has already be owned' },
    },
    businessimage: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('businesses')
};
