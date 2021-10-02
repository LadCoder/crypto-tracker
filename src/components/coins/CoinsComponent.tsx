import React from 'react'
import { readCoins } from '../../api/readCoins'
import { Coin } from '../../types/coin'
import { ColumnDefinition, Datatable } from '../shared/DataTable/DataTable'
import { Loader } from '../shared/Loader'

interface Props {}

const columns: ColumnDefinition<Coin, keyof Coin>[] = [
  { key: 'name', name: 'Name' },
  { key: 'symbol', name: 'Symbol' },
  { key: 'currentPrice', name: 'Price' },
  { key: 'priceChangePercentage1hInCurrency', name: '1h' },
  { key: 'priceChangePercentage24hInCurrency', name: '24h' },
  { key: 'priceChangePercentage7dInCurrency', name: '7d' },
  { key: 'totalVolume', name: 'Volume' },
  { key: 'marketCap', name: 'Mkt Cap' }
]

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
      {response && (
        <Datatable
          data={response}
          columns={columns}
          makeFilterKey={(coin) => [coin.id, coin.name, coin.symbol].join(' ')}
        />
      )}
    </>
  )
}
