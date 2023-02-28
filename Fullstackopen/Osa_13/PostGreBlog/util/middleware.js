const jwt = require('jsonwebtoken')


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
        default:
            return res.status(500).send({ message: 'something went wrong'})
    }
}
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        try{
            req.decodedToken = jwt.verify(authorization.subString(7), SECRET)
        }catch{
            return res.status(401).json({ error: 'Token invalid'})
        }
    } else{
        return res.status(400).json({ error: 'token missing '})
    }
    next()
}
module.exports = {
    errorHandler,
    tokenExtractor
}