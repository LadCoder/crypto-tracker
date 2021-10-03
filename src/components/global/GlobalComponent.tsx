import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { defaultCurrency } from '../../constants/currency'
import { actionCreators } from '../../redux'
import {
  convertToCurrency,
  convertToPercent
} from '../../services/convertNumber'
import { GlobalState } from '../../types/state'
import { Loader } from '../shared/Loader'
import { Statistics } from '../shared/Statistics/Statistics'
import styles from './GlobalComponent.module.css'

interface Props {}

/**
 * Displays a statistics from global crypto data
 * @return {JSX.Element}
 */
export function GlobalComponent({}: Props): JSX.Element {
  const dispatch = useDispatch()
  const { getGlobalData } = bindActionCreators(actionCreators, dispatch)

  const { global } = useSelector((state: GlobalState) => state)
  const { isLoading, error, data } = global

  useEffect(() => {
    const fetchGlobalData = async () => {
      getGlobalData()
    }

    fetchGlobalData()
  }, [])

  if (isLoading) return <Loader width={60} height={60} />
  if (error) return <>{error.message}</>
  return (
    <>
      <h1>Global Market Statistics</h1>

      {data && (
        <div className={styles.wrapper}>
          {data.totalMarketCap && (
            <Statistics
              value={convertToCurrency(
                defaultCurrency,
                data.totalMarketCap.usd
              )}
              description={'Market Capitalization'}
              growth={data.marketCapChange24hPercentage}
            />
          )}
          {data.totalVolume && (
            <Statistics
              value={convertToCurrency(defaultCurrency, data.totalVolume.usd)}
              description={'Total Trading Volume'}
            />
          )}
          {data.marketCapPercentage && (
            <Statistics
              value={convertToPercent(data.marketCapPercentage.btc)}
              description={'Bitcoin Market Cap Dominance'}
            />
          )}
          {data.activeCoins && (
            <Statistics
              value={data.activeCoins.toString()}
              description={'Active Coins'}
            />
          )}
        </div>
      )}
    </>
  )
}
