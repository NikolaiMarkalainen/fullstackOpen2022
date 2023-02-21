const MONGO_URL = process.env.MONGO_URL || undefined
const REDIS_URL = process.env.REDIS_URL || undefined

module.exports = {
  MONGO_URL,
  REDIS_URL 
}

  //: 'mongodb://the_username:the_password@localhost:3456/the_database',
//: '//localhost:6378'