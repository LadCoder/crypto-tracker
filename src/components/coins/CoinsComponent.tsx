import React from 'react'
import { readCoins } from '../../api/readCoins'

interface Props {}

/**
 * Displays a data table containing data from the coingecko api
 * @return {JSX.Element}
 */
export function CoinsComponent({}: Props): JSX.Element {
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
