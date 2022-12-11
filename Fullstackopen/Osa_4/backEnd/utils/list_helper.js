
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

module.exports = {
    dummy,
    totalLikes
}

