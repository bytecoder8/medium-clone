import axios from 'axios'
import { useEffect, useState } from 'react'
import { ServerError } from '../types'


export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: {
    [key: string]: any
  }
}

interface FetchHookResult<T> {
  doFetch: (options?: FetchOptions) => void
  data?: T
  isLoading: boolean
  isError: boolean
  error?: ServerError
}


export function useFetch<T>(url: string): FetchHookResult<T> {

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState<ServerError>()
  const [options, setOptions] = useState<FetchOptions>()

  
  const doFetch = (options?: FetchOptions) => {
    setError(undefined)
    setOptions(options)
    setIsLoading(true)
  }
  
  useEffect(() => {
    if (!isLoading) {
      return
    }

    const baseUrl = process.env.REACT_APP_API_BASE
    const cancelTokenSource = axios.CancelToken.source()
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
    
    return () => {
      cancelTokenSource.cancel()
    }
  }, [options, isLoading, url])

  return {
    doFetch,
    data,
    isLoading,
    isError: !!error,
    error
  }
}
