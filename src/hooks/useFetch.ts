import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { LOCAL_TOKEN } from '../config'
import { ServerError } from '../types'
import { useLocalStorage } from './useLocalStorage'


export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: {
    [key: string]: any
  },
  appendToUrl?: string
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
  const [options, setOptions] = useState<FetchOptions>({})
  const [token] = useLocalStorage(LOCAL_TOKEN)

  
  const doFetch = useCallback((options: FetchOptions = {}) => {
    setError(undefined)
    setOptions(options)
    setIsLoading(true)
  }, [])
  
  useEffect(() => {
    let skipResponseWhenUnmount = false

    if (!isLoading) {
      return
    }

    const baseUrl = import.meta.env.VITE_API_BASE
    const cancelTokenSource = axios.CancelToken.source()
    const requestOptions = {
      ...options,
      headers: {
        authorization: token ? `Token ${token}`: ''
      }
    }

    const finalUrl = baseUrl + url + (requestOptions.appendToUrl ? requestOptions.appendToUrl : '')

    axios(finalUrl, requestOptions)
    .then( res => {
      if (skipResponseWhenUnmount) {
        return
      }

      setData(res.data)
      setError(undefined)
    })
    .catch(err => {
      if (skipResponseWhenUnmount) {
        return
      }

      const error = new ServerError(
        `${err.message}: ${err.response?.data?.message}`
      )
      if (err.response && err.response.data !== null 
        && typeof err.response.data === 'object') 
      {
        error.errors = err.response.data.errors
      }

      setError(error)
    })
    .finally(() => {
      if (skipResponseWhenUnmount) {
        return
      }

      setIsLoading(false)
    })
    
    return () => {
      cancelTokenSource.cancel()
      skipResponseWhenUnmount = true
    }
  }, [options, isLoading, token, url])

  return {
    doFetch,
    data,
    isLoading,
    isError: !!error,
    error
  }
}
