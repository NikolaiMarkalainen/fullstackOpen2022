
const { Model ,DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Session extends Model {}


Session.init({
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id'},
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'sessions'
})

module.exports = Session