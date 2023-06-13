const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL, PORT } = require('../util/config')

console.log(REDIS_URL);

let getAsync
let setAsync
let incrAsync
if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log(PORT)
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
  incrAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })
  
  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)
  incrAsync = promisify(client.incr).bind(client)    
}

module.exports = {
  getAsync,
  setAsync,
  incrAsync
}