var _ = require("lodash")

const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 1){
        const initialValue = 0
        const val = blogs.reduce(
            (accumulator,currentValue)=> accumulator + currentValue.likes,
            initialValue
        )
            return val;
    }
    else if(blogs.length > 1){
        const initialValue = 0
        const totalSum = blogs.reduce(
            (accumulator,currentValue) => accumulator + currentValue.likes,
            initialValue
        )
        return totalSum;
    }
    else if(blogs === 0){
        return 0
    }
}

const favoriteBlog = (blogs) => {
    if(blogs.length > 1){
        const mostLikedBlog = blogs.reduce((previous, current) =>
        (previous.likes > current.likes) ? previous : current)
        return mostLikedBlog
    }
}
const mostBlogs = (blogs) => {
    const authorWithMostBlogs = blogs.reduce((previous, current) => 
    (previous.author === current.author) ? previous : current) 
    const authorsBlogs = blogs.filter(blog => blog.author === authorWithMostBlogs.author)
    return {
     author:authorWithMostBlogs.author,
     blogs: authorsBlogs.length
     
    }
}

const mostLikes = (blogs) => {
    const authorWithMostLikes = blogs.reduce((previous, current) =>
    (previous.likes > current.likes) ? previous : current)
    const authorsBlogs = blogs.filter(blog => blog.author === authorWithMostLikes.author)
    const totalLikes  = authorsBlogs.reduce((total, blog) => total + blog.likes,0)
    return{
        author: authorWithMostLikes.author,
        likes: totalLikes
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

