require('dotenv').config()
console.log(process.env.DATABASE_URL)
module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3001,
}