const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readinglists', {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      read:{
          type: DataTypes.BOOLEAN,
          defaultValue: false,
      },
      user_id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id'},
      },
      blog_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'blogs', key: 'id'},
      },
    })
    await queryInterface.createTable('sessions', {
      id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id'},
      },
      token: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('readinglists')
    await queryInterface.dropTable('sessions')

  },
}