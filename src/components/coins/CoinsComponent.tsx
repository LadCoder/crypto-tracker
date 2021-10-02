import React, { Fragment, useState } from 'react'
import { readCoins } from '../../api/readCoins'
import {
  convertToCurrency,
  convertToPercent
} from '../../services/convertNumber'
import { Coin } from '../../types/coin'
import { ColumnDefinition, Datatable } from '../shared/DataTable/DataTable'
import { Loader } from '../shared/Loader'
import styles from './CoinsComponent.module.css'

interface Props {}

const columns: ColumnDefinition<Coin, keyof Coin>[] = [
  { key: 'summary', name: 'Coin', width: '2fr' },
  { key: 'currentPrice', name: 'Price', width: '1fr' },
  { key: 'priceChangePercentage1hInCurrency', name: '1h', width: '0.6fr' },
  { key: 'priceChangePercentage24hInCurrency', name: '24h', width: '0.6fr' },
  { key: 'priceChangePercentage7dInCurrency', name: '7d', width: '0.6fr' },
  { key: 'totalVolume', name: 'Volume', width: '1fr' },
  { key: 'marketCap', name: 'Mkt Cap', width: '1fr' }
]

/**
 * Displays a data table containing data from the coingecko api
 * @return {JSX.Element}
 */
export function CoinsComponent({}: Props): JSX.Element {
  const [currency] = useState<string>('usd')
  const { isLoading, error, response } = readCoins(currency)

  if (isLoading) return <Loader width={60} height={60} />
  if (error) return <>{error.message}</>

  return (
    <>
      <h1>Crypto Tracker</h1>
      {response && (
        <Datatable
          data={response}
          columns={columns}
          makeFilterKey={(coin) =>
            [coin.id, coin.summary.name, coin.summary.symbol].join(' ')
          }
          customRenderer={{
            summary: (item) => (
              <div className={styles.summary}>
                <img
                  className={styles.coinImage}
                  alt={item.summary.name}
                  src={item.summary.image}
                />
                <span className={styles.coinName}>{item.summary.name}</span>
                <span className={styles.coinSymbol}>{item.summary.symbol}</span>
              </div>
            ),
            currentPrice: (item) =>
              convertToCurrency(currency, item.currentPrice),
            priceChangePercentage1hInCurrency: (item) =>
              priceChangeComponent(item.priceChangePercentage1hInCurrency),
            priceChangePercentage24hInCurrency: (item) =>
              priceChangeComponent(item.priceChangePercentage24hInCurrency),
            priceChangePercentage7dInCurrency: (item) =>
              priceChangeComponent(item.priceChangePercentage7dInCurrency),
            totalVolume: (item) =>
              convertToCurrency(currency, item.totalVolume),
            marketCap: (item) => convertToCurrency(currency, item.marketCap)
          }}
        />
      )}
    </>
  )
}

const priceChangeComponent = (change: number) => {
  const plusChange = change >= 0
  return (
    <span className={plusChange ? styles.priceRise : styles.priceDrop}>
      {convertToPercent(change)}
    </span>
  )
}
