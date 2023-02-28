const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Blog extends Model {}
    Blog.init({
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
        type: DataTypes.TEXT
    },
    title:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'blog'
    })
    
module.exports = Blog