import axios from 'axios'
import { LOCAL_TOKEN } from './config'


axios.interceptors.request.use( config => {
  const token = localStorage.getItem(LOCAL_TOKEN)
  if (token) {
    config.headers.authorization = `Token ${token}`
  }
  return config
}, error => Promise.reject(error))


axios.interceptors.response.use( res => res, error => {
  if (error.response && error.response.status === 401) { // reload page when bad token
    localStorage.removeItem(LOCAL_TOKEN)
    window.location.href = '/'
  }
  return Promise.reject(error)
})
