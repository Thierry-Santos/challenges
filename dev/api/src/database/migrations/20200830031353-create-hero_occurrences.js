'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('hero_occurrences', { 
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      hero_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'heros', key: 'id' }
      },
      occurrence_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'occurrences', key: 'id' }
      },
      defeated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('hero_occurrences');
  }
};
