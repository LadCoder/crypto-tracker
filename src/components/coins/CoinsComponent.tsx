import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import {
  convertToCurrency,
  convertToPercent
} from '../../services/convertNumber'
import { Coin } from '../../types/coin'
import { CoinSummaryState, MarketState } from '../../types/state'
import { ColumnDefinition, Datatable } from '../shared/DataTable/DataTable'
import { Loader } from '../shared/Loader'
import { PaginationComponent } from '../shared/Pagination/PaginationComponent'
import styles from './CoinsComponent.module.css'

interface Props {}

const columns: ColumnDefinition<Coin, keyof Coin>[] = [
  { key: 'summary', name: 'Coin', width: '3fr' },
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

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [perPage] = useState<number>(100)

  const dispatch = useDispatch()
  const { getCoinSummary, getCoinDetails } = bindActionCreators(
    actionCreators,
    dispatch
  )

  const { coins } = useSelector((state: CoinSummaryState) => state)
  const { market } = useSelector((state: MarketState) => state)

  const isLoading = coins.isLoading || market.isLoading
  const error = coins.error || market.error

  useEffect(() => {
    const fetchCoinSummaries = async () => {
      getCoinSummary()
    }

    fetchCoinSummaries()
  }, [])

  useEffect(() => {
    const fetchCoinSummaries = async () => {
      const indexOfLastItem = currentPage * perPage
      const indexOfFirstItem = indexOfLastItem - perPage
      const currentItems = coins.data?.slice(indexOfFirstItem, indexOfLastItem)

      const coinIds = currentItems?.map((coin) => coin.id)
      if (coinIds && coinIds.length > 0) {
        getCoinDetails(coinIds)
      }
    }

    fetchCoinSummaries()
  }, [coins, currentPage])

  const pages = Math.ceil((coins.data?.length || 0) / perPage)

  if (isLoading) return <Loader width={60} height={60} />
  if (error) return <>{error.message}</>

  return (
    <>
      <h1>Coin list</h1>
      {market.data && (
        <Datatable
          data={market.data}
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
      <PaginationComponent
        pagination={{
          perPage,
          currentPage,
          pages,
          hasMore: currentPage < pages
        }}
        paginate={setCurrentPage}
      />
    </>
  )
}

const priceChangeComponent = (change: number) => {
  const plusChange = change >= 0
  return (
    <span className={plusChange ? styles.priceRise : styles.priceDrop}>
      {change ? convertToPercent(change) : '0.0%'}
    </span>
  )
}
