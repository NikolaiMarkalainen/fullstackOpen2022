
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}

