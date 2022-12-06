require('dotenv').config()

console.log("in config")
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
console.log(PORT)
console.log(MONGODB_URI)
module.exports = {
  MONGODB_URI,
  PORT
}

