import { generateMarketData } from '../../helpers/generateMarketData'
import {
  CoinSummaryActions,
  GlobalMarketActions,
  MarketActions,
  TrendingCoinsActions
} from '../../types/actions'
import {
  CoinAction,
  CoinSummaryState,
  GlobalAction,
  GlobalState,
  initialApiState,
  MarketAction,
  MarketState,
  TrendingAction,
  TrendingState
} from '../../types/state'
import { combineReducers } from 'redux'
import { generateTrendingData } from '../../helpers/generateTrendingData'
import { generateGlobalData } from '../../helpers/generateGlobalData'

export const coinsReducer = (
  state: CoinSummaryState = { coins: initialApiState },
  action: CoinAction
) => {
  const { type, payload } = action

  switch (type) {
    case CoinSummaryActions.FetchCoinSummary:
      return { ...initialApiState }
    case CoinSummaryActions.FetchCoinSummarySuccess:
      return { ...initialApiState, isLoading: false, data: payload }
    case CoinSummaryActions.FetchCoinSummaryFailure:
      return { ...initialApiState, isLoading: false, error: payload }
    default:
      return state
  }
}

export const marketReducer = (
  state: MarketState = { market: initialApiState },
  action: MarketAction
) => {
  const { type, payload } = action

  switch (type) {
    case MarketActions.FetchMarketDetails:
      return { ...initialApiState }
    case MarketActions.FetchMarketDetailsSuccess:
      return {
        ...initialApiState,
        isLoading: false,
        data: generateMarketData(payload)
      }
    case MarketActions.FetchMarketDetailsFailure:
      return { ...initialApiState, isLoading: false, error: payload }
    default:
      return state
  }
}

export const trendingReducer = (
  state: TrendingState = { trending: initialApiState },
  action: TrendingAction
) => {
  const { type, payload } = action
  switch (type) {
    case TrendingCoinsActions.FetchTrendingCoins:
      return { ...initialApiState }
    case TrendingCoinsActions.FetchTrendingCoinsSuccess:
      const coins = generateTrendingData(payload.coins)
      return { ...initialApiState, isLoading: false, data: coins }
    case TrendingCoinsActions.FetchTrendingCoinsFailure:
      return { ...initialApiState, isLoading: false, error: payload }

    default:
      return state
  }
}

export const globalReducer = (
  state: GlobalState = { global: initialApiState },
  action: GlobalAction
) => {
  const { type, payload } = action

  switch (type) {
    case GlobalMarketActions.FetchGlobalStats:
      return { ...initialApiState }
    case GlobalMarketActions.FetchGlobalStatsSuccess:
      const data = generateGlobalData(payload)
      return { ...initialApiState, isLoading: false, data }
    case GlobalMarketActions.FetchGlobalStatsFailure:
      return { ...initialApiState, isLoading: false, error: payload }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  coins: coinsReducer,
  market: marketReducer,
  trending: trendingReducer,
  global: globalReducer
})
