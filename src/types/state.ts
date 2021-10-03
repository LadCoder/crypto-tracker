import { CoinActions } from './actions'
import { Coin, CoinSummary } from './coin'

export type CoinState = {
  coins: CoinSummary[]
}

export type CoinAction = {
  type: CoinActions
  payload: CoinSummary[]
}

export type MarketState = {
  market: Coin[]
}

export type MarketAction = {
  type: CoinActions
  payload: Coin[]
}
