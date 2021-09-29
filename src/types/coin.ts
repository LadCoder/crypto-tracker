export interface CoinSummary {
  id: string
  symbol: string
  name: string
}

export interface Coin {
  id: number
  name: string
  symbol: string
  image: string
  currentPrice: number
  volume: number
  circulatingSupply: number
}
