import React from 'react'
import { readCoins } from './api/readCoins'
import './App.css'

/**
 * The home page
 * @return {JSX.Element}
 */
export function App(): JSX.Element {
  const { loading, error, data } = readCoins()

  if (loading) return <>Loading...</>

  if (error) return <>{error.message}</>
  console.log(loading, error, data)
  return (
    <>
      <h1>Crypo Tracker</h1>
      {error}
      {data?.toString()}
    </>
  )
}
