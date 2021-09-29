import { useEffect, useReducer, useRef } from 'react'

export interface State<T> {
  loading: boolean
  data?: T
  error?: Error
}

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

/**
 * Fetches data from the api service.
 * @param {string} url The endpoint on the api service
 * @param {RequestInit} options Additional options for the fetch request
 * @return {State<T>}
 */
export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): State<T> {
  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    loading: true,
    error: undefined,
    data: undefined
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fetched':
        return { ...initialState, data: action.payload, loading: false }
      case 'error':
        return { ...initialState, error: action.payload, loading: false }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return

    const fetchData = async () => {
      dispatch({ type: 'loading' })

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = (await response.json()) as T
        if (cancelRequest.current) return

        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        if (cancelRequest.current) return

        dispatch({ type: 'error', payload: error as Error })
      }
    }

    void fetchData()

    return () => {
      cancelRequest.current = true
    }
  }, [url])

  return state
}
