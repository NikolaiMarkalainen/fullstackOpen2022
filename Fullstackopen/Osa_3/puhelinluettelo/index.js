const express = require('express')
const app = express()
const http = require("http")
var today = new Date()
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
var time = today.getHours()+ ':' + today.getMinutes()+ ':' + today.getSeconds()
var dateTime = date+' '+time
let people = [
{ 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World </h1>')
})

app.get('/api/people', (request,response) => {
    response.json(people)
})

app.get('/info', (request,response) => {
    response.send(`<p>Phonebook has info for ${people.length} people</p> ${Date()}`)
})
const PORT  = 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)