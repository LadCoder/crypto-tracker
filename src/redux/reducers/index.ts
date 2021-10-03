import { generateMarketData } from '../../helpers/generateMarketData'
import { CoinActions } from '../../types/actions'
import { CoinAction, MarketAction } from '../../types/state'
import { combineReducers } from 'redux'
import { Coin, CoinSummary } from '../../types/coin'

export const coinsReducer = (state: CoinSummary[] = [], action: CoinAction) => {
  const { type, payload } = action

  switch (type) {
    case CoinActions.GetCoinSummary:
      return payload
    default:
      return state
  }
}

export const marketReducer = (state: Coin[] = [], action: MarketAction) => {
  const { type, payload } = action

  switch (type) {
    case CoinActions.GetCoinDetails:
      const marketData = generateMarketData(payload)
      return marketData
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  coins: coinsReducer,
  market: marketReducer
})
