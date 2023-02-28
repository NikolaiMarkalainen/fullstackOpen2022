
const errorHandler = (error, req, res, next) => {
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
module.exports = {
    errorHandler
}