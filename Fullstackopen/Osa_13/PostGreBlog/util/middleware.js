const jwt = require('jsonwebtoken')
const {SECRET} = require('./config')

const errorHandler = (error, req, res, next) => {
    console.log(error)
    console.log(error.message)
    switch(error.message){
        case 'No data':
            return res.status(404).send({ message: 'No data behind endpoint'})
        case 'No Content':
            return res.status(201).send({ message: 'Deleted'})     
        case 'Not Found':
            return res.status(404).send({ message: 'Null endpoint'})   
        case 'Bad data':
            return res.status(400).send({ message: 'Data is malformatted enter data in correct format!'})
        case 'Validation error: Validation isEmail on username failed':
            return res.status(404).send({ message: 'Username has to be in email format !'})
        case 'Validation error: Validation min on year failed':
            return res.status(400).send({ message: 'Minimum year is 1991 !'})
        default:
            return res.status(500).send({ message: 'something went wrong'})
    }
}
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        try{
            console.log(SECRET)
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        }catch{
            return res.status(401).json({ error: 'Token invalid'})
        }
    } else{
        return res.status(400).json({ error: 'token missing '})
    }
    next()
}

const isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id)
    if (!user.admin) {
      return res.status(401).json({ error: 'operation not allowed' })
    }
    next()
  }

module.exports = {
    errorHandler,
    tokenExtractor,
    isAdmin
}