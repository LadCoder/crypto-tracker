/* eslint-disable no-unused-vars */
import {
  CoinSummaryActions,
  GlobalMarketActions,
  MarketActions,
  TrendingCoinsActions
} from './actions'
import { Coin, CoinSummary, TrendingCoin } from './coin'
import { Global } from './global'

export const initialApiState = {
  isLoading: true
}

export type CoinSummaryState = {
  coins: {
    isLoading: boolean
    data?: CoinSummary[]
    error?: Error
  }
}

export type CoinAction = {
  type: CoinSummaryActions
  payload: CoinSummary[]
}

export type MarketState = {
  market: {
    isLoading: boolean
    data?: Coin[]
    error?: Error
  }
}

export type MarketAction = {
  type: MarketActions
  payload: Coin[]
}

export type TrendingState = {
  trending: {
    isLoading: boolean
    data?: TrendingCoin[]
    error?: Error
  }
}

export type TrendingAction = {
  type: TrendingCoinsActions
  payload: TrendingPayload
}

export type TrendingPayload = {
  coins: any[]
  exchange: any[]
}

export type GlobalState = {
  global: {
    isLoading: boolean
    data?: Global
    error?: Error
  }
}

export type GlobalAction = {
  type: GlobalMarketActions
  payload: Global
}
