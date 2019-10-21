import axios from 'axios'
import baseUrl from '../utils/config'
const blogUrl = baseUrl + 'api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(blogUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(blogUrl, blog, config)
  return request.then(response => response.data)
}

export default { setToken, getAll, create }