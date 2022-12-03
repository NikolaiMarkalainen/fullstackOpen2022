require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/people')

const cors = require('cors')
app.use(express.json())
var morgan = require('morgan')
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))


app.get('/',(request, response) => {
    response.send('<h1>Hello World </h1>')
})

app.get('/api/people', (request,response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/people/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person =>{
        if(person){
            response.json(person)
        }
        else{
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/people/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})
app.get('/info', (request,response) => {
    response.send(`<p>Phonebook has info for ${Person.length} people</p> ${Date()}`)
})
const generateId = (max) => {
    return Math.floor(Math.random()* max)
}

app.post('/api/people', (request, response, next) => {
    const body = request.body

    const person = new Person ({
        id: generateId(100000),
        name: body.name,
        number: body.number
    })
    if(!person.name || !person.number){
        response.status(404).send(error => next(error))
    }
    else{
    person.save().then((savedPerson) => {
        response.json(savedPerson)
        morgan.token("data", (req) => JSON.stringify(req.body))
    })
    }
})

const errorHandler = (error,request,response,next) => {
    if(error.name === 'ValidationError'){
        return response.status(404).send({error: 'Content missing'})
    }
    else if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      }
    else if(error.name === 'TypeError'){
        console.error(error.message);
        return response.status(404).send({error: 'Content missing'})
    }
}

app.use(errorHandler)   


const PORT  = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) 