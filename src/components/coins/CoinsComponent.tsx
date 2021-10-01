import React from 'react'
import { readCoins } from '../../api/readCoins'
import { Loader } from '../shared/Loader'

interface Props {}

/**
 * Displays a data table containing data from the coingecko api
 * @return {JSX.Element}
 */
export function CoinsComponent({}: Props): JSX.Element {
  const { isLoading, error, response } = readCoins()

  if (isLoading) return <Loader width={60} height={60} />
  if (error) return <>{error.message}</>

  return (
    <>
      <h1>Crypto Tracker</h1>
      {error}
      {response?.toString()}
    </>
  )
}
