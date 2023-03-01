const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readinglist', {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      read:{
          type: DataTypes.BOOLEAN,
          default: false,
      },
      userId:{
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id'},
      },
      blogId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'blogs', key: 'id'},
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readinglist')
  },
}