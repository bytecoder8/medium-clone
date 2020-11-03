import axios from 'axios'
import { useState } from 'react'
import { FormErrorsType } from '../types'


interface FetchHookResult {
  doFetch: () => void
  data: Object
  isLoading: boolean
  isError: boolean
  error?: FormErrorsType
}

export interface FetchHookOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: {
    [key: string]: any
  }
}

export function useFetch(url: string, options?: FetchHookOptions): FetchHookResult {

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [error, setError] = useState()

  const baseUrl = process.env.REACT_APP_API_BASE

  const doFetch = () => {
    axios(baseUrl + url, {
      method: options?.method || 'GET',
      data: options?.data || {}
    })
    .then( res => {
      setData(res.data)
      setError(undefined)
    })
    .catch(err => setError(err.response.data))
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
