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
      allowNull: false
    },
    businessAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    businessDescription: {
      type: Sequelize.STRING,
      allowNull: false
    },
    locationId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: { args: true, message: 'location already exists' },
      references: {
        model: 'locations',
        key: 'id',
        as: 'locationId'
      }
    },
    categoryId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: { args: true, message: 'category already exists' },
      references: {
        model: 'categories',
        key: 'id',
        as: 'categoryId'
      }
    },
    businessImage: {
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
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      },
    }
  }),
  down: queryInterface => queryInterface.dropTable('businesses')
};
