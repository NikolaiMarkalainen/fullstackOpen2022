import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    return axios.get(baseUrl)
}

const post = (newObject) => {
    return axios.post(`${baseUrl}`, newObject)
}

const update = (id, newObject) => {
    const url = `${baseUrl}/${id}`
    return axios.put(url, newObject)
}

const remove = (id, newObject) => {
    const url = `${baseUrl}/${id}`
    return axios.delete(url, newObject)
}


const listService = {
    getAll: getAll,
    post: post,
    update: update,
    remove: remove

}
export default listService