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

app.get('/api/people/:id', (request, response) => {
    Person.findById(request.params.id).then(person =>{
        response.json(person)
    })
})

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    Person = Person.filter(person => person.id !== id)
    response.status(204).end()
})
app.get('/info', (request,response) => {
    response.send(`<p>Phonebook has info for ${Person.length} people</p> ${Date()}`)
})
const generateId = (max) => {
    return Math.floor(Math.random()* max)
}

app.post('/api/people', (request, response) => {
    console.log(request.body)
    const body = request.body
    const person = new Person ({
        id: generateId(100000),
        name: body.name,
        number: body.number
    })
    console.log(request.body.name)
    console.log(body.name)

    if(body.name === undefined){
        return response.status(400).json({error: 'content missing'})
    }
    person.save().then((savedPerson) => {
        response.json(savedPerson)
        morgan.token("data", (req) => JSON.stringify(req.body))
    })
})
const PORT  = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) 