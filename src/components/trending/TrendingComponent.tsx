import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux'
import { TrendingCoin } from '../../types/coin'
import { TrendingState } from '../../types/state'
import { ColumnDefinition, Datatable } from '../shared/DataTable/DataTable'
import { Loader } from '../shared/Loader'
import styles from './TrendingComponent.module.css'

interface Props {}

const columns: ColumnDefinition<TrendingCoin, keyof TrendingCoin>[] = [
  { key: 'score', name: 'Rank', width: '0.5fr' },
  { key: 'name', name: 'Name', width: '2fr' },
  { key: 'symbol', name: 'Symbol', width: '1fr' },
  { key: 'marketCapRank', name: 'Mkt Cap Rank', width: '1fr' },
  { key: 'priceBtc', name: 'BTC Price', width: '1fr' }
]

/**
 * Displays a data table containing data from the coingecko api
 * @return {JSX.Element}
 */
export function TrendingComponent({}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>()

  const dispatch = useDispatch()
  const { getTrendingCoins } = bindActionCreators(actionCreators, dispatch)

  const { trending } = useSelector((state: TrendingState) => state)

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true)
      try {
        getTrendingCoins()
      } catch (error) {
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrending()
  }, [])

  if (isLoading) return <Loader width={60} height={60} />
  if (error) return <>{error.message}</>

  return (
    <>
      <h1>Trending Coins</h1>
      {trending && (
        <Datatable
          data={trending}
          columns={columns}
          makeFilterKey={(coin) => [coin.id, coin.name, coin.symbol].join(' ')}
          customRenderer={{
            name: (item) => (
              <div className={styles.summary}>
                <img
                  className={styles.coinImage}
                  alt={item.name}
                  src={item.image}
                />
                <span className={styles.coinName}>{item.name}</span>
              </div>
            )
          }}
        />
      )}
    </>
  )
}
