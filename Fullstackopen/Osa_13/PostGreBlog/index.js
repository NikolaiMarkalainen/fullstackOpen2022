require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
    
    },
});

class Blog extends Model {}
    Blog.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    author:{
        type: DataTypes.TEXT
    },
    title:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    }, {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'blog'
    })



app.get('/api/blogs', async (req,res) => {
    const blogs = await Blog.findAll()
    console.log(blogs.map(b=>b.toJSON()))
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

app.post('/api/blogs', async (req,res) => {
    try{
        console.log(req.body)
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch(error){
        return res.status(400).json({ error })
    }
})

app.get('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        res.json(blog)
        console.log(blog.toJSON())
    } else{
        res.status(400).end()
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    console.log(blog)
    if(blog) {
        blog.destroy()
        console.log('Blog deleted')
    } else{
        res.status(400).end()
    }
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})