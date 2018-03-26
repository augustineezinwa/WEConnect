module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('businesses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    businessName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    businessAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    businessDescription: {
      type: Sequelize.STRING,
      allowNull: false
    },
    businessImage: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    locationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id',
      }
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      }
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
