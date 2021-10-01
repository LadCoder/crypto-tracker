import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export interface State<T> {
  isLoading: boolean
  response?: T
  error?: Error
}

/**
 * Fetches data from the api service.
 * @param {string} url The endpoint on the api service
 * @param {any} params Additional params for the api call
 * @return {State<T>}
 */
export function useAxios<T = unknown>(url: string, params: any): State<T> {
  const [response, setResponse] = useState<T | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>()

  // Used to prevent state update if the component is unmounted
  // Prevents memory leaks
  const cancelRequest = useRef<boolean>(false)

  const fetchData = async () => {
    setIsLoading(true)
    setError(undefined)
    try {
      const res = await axios.get(url, params)
      if (!res) throw new Error('Error: Failed to retrieve the data')
      setResponse(res.data)
    } catch (e) {
      setError(e as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    return () => {
      cancelRequest.current = true
    }
  }, [url])

  return { isLoading, response, error }
}
