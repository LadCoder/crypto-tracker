import { Dispatch } from 'redux'
import { coinGeckoApi } from '../../api/coinGeckoApi'
import {
  globalMarketUrl,
  listOfCoinsUrl,
  marketUrl,
  marketUrlParams,
  trendingCoinsUrl
} from '../../constants/paths'
import { CoinActions } from '../../types/actions'

export const getCoinSummary = () => async (dispatch: Dispatch) => {
  const coinsResponse = await coinGeckoApi.get(listOfCoinsUrl)
  dispatch({
    type: CoinActions.GetCoinSummary,
    payload: coinsResponse.data
  })
}

export const getCoinDetails =
  (coinIds: string[]) => async (dispatch: Dispatch) => {
    const coinsResponse = await coinGeckoApi.get(
      marketUrl,
      marketUrlParams(coinIds)
    )
    dispatch({
      type: CoinActions.GetCoinDetails,
      payload: coinsResponse.data
    })
  }

export const getTrendingCoins = () => async (dispatch: Dispatch) => {
  const trendingResponse = await coinGeckoApi.get(trendingCoinsUrl)
  dispatch({
    type: CoinActions.GetTrendingCoins,
    payload: trendingResponse.data
  })
}

export const getGlobalData = () => async (dispatch: Dispatch) => {
  const globalResponse = await coinGeckoApi.get(globalMarketUrl)
  dispatch({
    type: CoinActions.GetGlobalMarket,
    payload: globalResponse.data
  })
}
