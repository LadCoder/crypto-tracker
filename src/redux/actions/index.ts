import { Dispatch } from 'redux'
import { coinGeckoApi } from '../../api/coinGeckoApi'
import {
  listOfCoinsUrl,
  marketUrl,
  marketUrlParams
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
