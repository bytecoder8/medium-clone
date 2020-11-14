import axios from 'axios'
import { LOCAL_TOKEN } from './config'


axios.interceptors.request.use( config => {
  const token = localStorage.getItem(LOCAL_TOKEN)
  if (token) {
    config.headers.authorization = `Token ${token}`
  }
  return config
}, error => Promise.reject(error))
