const mongoose = require('mongoose')


const password = process.argv[2]

const url=`mongodb+srv://fullstackNM:${password}@peopledata.uypuqdz.mongodb.net/People?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)


if(process.argv.length < 4){
mongoose
    .connect(url)
    .then((result) => {
    Person.find({}).then(result =>{
        console.log("Phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
})
}

else{
mongoose
    .connect(url)
    .then((result) => {
        console.log(process.argv.length)    
        console.log("connected")
        const person = new Person ({
            name: process.argv[3],
            number: process.argv[4]
        })
        person.save().then(() => {
            console.log(`added ${person.name} ${person.number} to the phonebook`)
            return mongoose.connection.close()
    
        })
    })
    .catch((err) => console.log(err))
}