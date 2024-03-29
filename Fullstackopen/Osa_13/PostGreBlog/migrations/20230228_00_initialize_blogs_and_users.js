const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blogs', {
        id:{
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
        },
        url:{
              type: DataTypes.TEXT,
              allowNull: false
        },
        author:{
              type: DataTypes.TEXT,
              defaultValue: null
        },
        title:{
              type: DataTypes.TEXT,
              allowNull: false
        },
        likes:{
              type: DataTypes.INTEGER,
              defaultValue: 0
        },
        year:{
              type: DataTypes.INTEGER,
              validate: {
                min: 1991
              },
              allowNull: false
        },  
    })
    await queryInterface.createTable('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          username: {
            type: DataTypes.STRING,
            validate: {
              isEmail: true
            },
            unique: true,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
    })
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}