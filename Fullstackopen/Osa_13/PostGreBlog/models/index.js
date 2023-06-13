const Blog = require('./blog')
const User = require('./user')
const Readinglists = require('./readinglist')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: Readinglists, as: 'readings'})
Blog.belongsToMany(User, { through: Readinglists, as: 'users_saved'})

module.exports = {
    Blog,
    User,
    Readinglists
}