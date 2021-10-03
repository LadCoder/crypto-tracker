import { Dispatch } from 'redux'
import { coinGeckoApi } from '../../api/coinGeckoApi'
import {
  globalMarketUrl,
  listOfCoinsUrl,
  marketUrl,
  marketUrlParams,
  trendingCoinsUrl
} from '../../constants/paths'
import {
  CoinSummaryActions,
  GlobalMarketActions,
  MarketActions,
  TrendingCoinsActions
} from '../../types/actions'

export const getCoinSummary = () => async (dispatch: Dispatch) => {
  dispatch({ type: CoinSummaryActions.FetchCoinSummary })

  try {
    const coinsResponse = await coinGeckoApi.get(listOfCoinsUrl)

    if (!coinsResponse) {
      throw new Error('Failed to retrieve the list of coins')
    }
    dispatch({
      type: CoinSummaryActions.FetchCoinSummarySuccess,
      payload: coinsResponse.data
    })
  } catch (error) {
    dispatch({
      type: CoinSummaryActions.FetchCoinSummarySuccess,
      payload: error
    })
  }
}

export const getCoinDetails =
  (coinIds: string[]) => async (dispatch: Dispatch) => {
    dispatch({ type: MarketActions.FetchMarketDetails })

    try {
      const coinsResponse = await coinGeckoApi.get(
        marketUrl,
        marketUrlParams(coinIds)
      )

      if (!coinsResponse) {
        throw new Error('Failed to retrieve the coins market details')
      }
      dispatch({
        type: MarketActions.FetchMarketDetailsSuccess,
        payload: coinsResponse.data
      })
    } catch (error) {
      dispatch({
        type: MarketActions.FetchMarketDetailsFailure,
        payload: error
      })
    }
  }

export const getTrendingCoins = () => async (dispatch: Dispatch) => {
  dispatch({
    type: TrendingCoinsActions.FetchTrendingCoins
  })

  try {
    const trendingResponse = await coinGeckoApi.get(trendingCoinsUrl)
    if (!trendingResponse)
      throw new Error('Failed to retrieve the trending data')
    dispatch({
      type: TrendingCoinsActions.FetchTrendingCoinsSuccess,
      payload: trendingResponse.data
    })
  } catch (error) {
    dispatch({
      type: TrendingCoinsActions.FetchTrendingCoinsFailure,
      payload: error
    })
  }
}

export const getGlobalData = () => async (dispatch: Dispatch) => {
  dispatch({
    type: GlobalMarketActions.FetchGlobalStats
  })

  try {
    const globalResponse = await coinGeckoApi.get(globalMarketUrl)

    if (!globalResponse) throw new Error('Failed to retrieve the global stats')
    dispatch({
      type: GlobalMarketActions.FetchGlobalStatsSuccess,
      payload: globalResponse.data
    })
  } catch (error) {
    dispatch({
      type: GlobalMarketActions.FetchGlobalStatsFailure,
      payload: error
    })
  }
}
