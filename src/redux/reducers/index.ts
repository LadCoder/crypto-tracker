import { generateMarketData } from '../../helpers/generateMarketData'
import { CoinActions } from '../../types/actions'
import { CoinAction, MarketAction, TrendingAction } from '../../types/state'
import { combineReducers } from 'redux'
import { Coin, CoinSummary } from '../../types/coin'
import { generateTrendingData } from '../../helpers/generateTrendingData'

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

export const trendingReducer = (state: Coin[] = [], action: TrendingAction) => {
  const { type, payload } = action

  switch (type) {
    case CoinActions.GetTrendingCoins:
      const coins = generateTrendingData(payload.coins)
      return coins
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  coins: coinsReducer,
  market: marketReducer,
  trending: trendingReducer
})
