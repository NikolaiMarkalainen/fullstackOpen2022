const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Readinglists extends Model {}


Readinglists.init({
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
        references: { model: 'user', key: 'id'},
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blog', key: 'id'},
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readinglist'
})

module.exports = Readinglists