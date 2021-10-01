import React from 'react'
import { readCoins } from './api/readCoins'
import './App.css'

/**
 * The home page
 * @return {JSX.Element}
 */
export function App(): JSX.Element {
  const { isLoading, error, response } = readCoins()

  if (isLoading) return <>Loading...</>

  if (error) return <>{error.message}</>
  console.log(isLoading, error, response)
  return (
    <>
      <h1>Crypo Tracker</h1>
      {error}
      {response?.toString()}
    </>
  )
}
