const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');

console.log(redis);

const key = 'dataCount'
/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
  await redis.incrAsync(key)
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const id  = req.params.id
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  await res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const {text, done} = req.body
  req.todo.text = text
  req.todo.done = done
  await req.todo.save()
  await res.send(req.todo)

});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
