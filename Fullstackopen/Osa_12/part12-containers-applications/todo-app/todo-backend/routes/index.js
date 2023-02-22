const express = require('express');
const router = express.Router();
const redis = require('../redis');
const configs = require('../util/config')

let visits = 0
console.log(redis.getAsync);

/* GET index data. */
router.get('/', async (req, res) => {
  visits++
  const additions = await redis.getAsync('dataCount')
  res.send({
    ...configs,
    visits,
    additions
  });
});

module.exports = router;
