'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      functionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'functions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      buyer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('reserved', 'cancelled'),
        defaultValue: 'reserved',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
  },
};