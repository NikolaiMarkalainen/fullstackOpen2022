import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'



const blogSlice = createSlice({
    name:'blogs',
    initialState:[],
    reducers:{
        setBlogs(state,action){
            return action.payload
        },
        likeBlogs(state,action){
            const id = action.payload.id
            const likedBlog = state.find(n => n.id===id)
            const addedlikedToBlog = {
                ...likedBlog,
                like: likedBlog.like + 1
            }
            state = state.map(blog =>
                blog.id !== id ? blog: addedlikedToBlog)
                return state.sort((a,b) => {
                    return b.like - a.like
                })
        },
        appendBlog(state,action){
            state.push(action.payload)
        },
        deleteBlog(state,action){
            state = state.filter(n => n.id !== action.payload)
            return state

        }
    }
})

export const { likeBlogs, appendBlog, setBlogs, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
    console.log('IN INITIALIZE')
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlogs = (content, config) => {
    return async dispatch => {
        const newBlog = await blogService.post(content , config)
        dispatch(appendBlog(newBlog.data))
    }
}

export const updateLike = content => {
    return async dispatch => {
        const newLikedValue = {
            title: content.title,
            author: content.author,
            url: content.url,
            like: content.like+1,
            id: content.id
        }
        const newBlog = await blogService.update(content.id, newLikedValue)
        dispatch(likeBlogs(newBlog))
    }
}

export const removeBlog = (content, config) => {
    return async dispatch => {
    await blogService.remove(content.id, config)
    dispatch(deleteBlog(content.id))
    }
}

export default blogSlice.reducer
