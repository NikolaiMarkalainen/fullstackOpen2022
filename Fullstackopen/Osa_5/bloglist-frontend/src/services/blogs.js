import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null
const setToken = newToken => {  
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = (id, newBlog) => {
  const request =  axios.put(`${ baseUrl }/${id}`, newBlog)
  return request.then(response => response.data)
}

const post = (newBlog) => {
  const config = {
    headers: {Authorization: token},
  }

  return axios.post(`${baseUrl}`, newBlog, config)
}


export default { getAll,create,update,setToken,post}