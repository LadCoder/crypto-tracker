import React, { Fragment, useEffect, useState } from 'react'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>()

  const dispatch = useDispatch()
  const { getGlobalData } = bindActionCreators(actionCreators, dispatch)

  const { global } = useSelector((state: GlobalState) => state)

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true)
      try {
        getGlobalData()
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
      <h1>Global Market Statistics</h1>

      {global && (
        <div className={styles.wrapper}>
          {global.totalMarketCap && (
            <Statistics
              value={convertToCurrency(
                defaultCurrency,
                global.totalMarketCap.usd
              )}
              description={'Market Capitalization'}
              growth={global.marketCapChange24hPercentage}
            />
          )}
          {global.totalVolume && (
            <Statistics
              value={convertToCurrency(defaultCurrency, global.totalVolume.usd)}
              description={'Total Trading Volume'}
            />
          )}
          {global.marketCapPercentage && (
            <Statistics
              value={convertToPercent(global.marketCapPercentage.btc)}
              description={'Bitcoin Market Cap Dominance'}
            />
          )}
          {global.activeCoins && (
            <Statistics
              value={global.activeCoins.toString()}
              description={'Active Coins'}
            />
          )}
        </div>
      )}
    </>
  )
}
