const Blog = require('./blog')
const User = require('./user')
const Readinglists = require('./readinglist')
const Session = require('./session')
Blog.belongsTo(User)
User.hasMany(Blog)

User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglists, as: 'readings'})
Blog.belongsToMany(User, { through: Readinglists, as: 'users_saved'})

module.exports = {
    Blog,
    User,
    Readinglists,
    Session
}