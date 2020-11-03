import axios from 'axios'
import { useState } from 'react'
import { ServerError } from '../types'


export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: {
    [key: string]: any
  }
}

interface FetchHookResult {
  doFetch: (options?: FetchOptions) => void
  data: Object
  isLoading: boolean
  isError: boolean
  error?: ServerError
}


export function useFetch(url: string): FetchHookResult {

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [error, setError] = useState<ServerError>()

  const baseUrl = process.env.REACT_APP_API_BASE

  const doFetch = (options?: FetchOptions) => {
    setError(undefined)
    setIsLoading(true)
    axios(baseUrl + url, {
      method: options?.method || 'GET',
      data: options?.data || {}
    })
    .then( res => {
      setData(res.data)
      setError(undefined)
    })
    .catch(err => {
      const error = new ServerError(err.message)
      if (err.response && err.response.data !== null 
        && typeof err.response.data === 'object') 
      {
        error.errors = err.response.data.errors
      }
      
      setError(error)
    })
    .finally(() => setIsLoading(false))
  }

  return {
    doFetch,
    data,
    isLoading,
    isError: !!error,
    error
  }
}
