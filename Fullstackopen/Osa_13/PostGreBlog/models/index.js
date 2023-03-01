const Blog = require('./blog')
const User = require('./user')
const Readinglists = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)
User.belongsToMany(User, { through: Readinglists, as: 'readings'})

module.exports = {
    Blog,
    User,
    Readinglists
}