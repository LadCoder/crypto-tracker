import { CoinActions } from './actions'
import { Coin, CoinSummary, TrendingCoin } from './coin'
import { Global } from './global'

export type CoinState = {
  coins: CoinSummary[]
}

export type CoinAction = {
  type: CoinActions.GetCoinSummary
  payload: CoinSummary[]
}

export type MarketState = {
  market: Coin[]
}

export type MarketAction = {
  type: CoinActions.GetCoinDetails
  payload: Coin[]
}

export type TrendingState = {
  trending: TrendingCoin[]
}

export type TrendingAction = {
  type: CoinActions.GetTrendingCoins
  payload: TrendingPayload
}

export type TrendingPayload = {
  coins: any[]
  exchange: any[]
}

export type GlobalState = {
  global: Global
}

export type GlobalAction = {
  type: CoinActions.GetGlobalMarket
  payload: Global
}
