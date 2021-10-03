/* eslint-disable camelcase */
export interface CoinSummary {
  id: string
  symbol: string
  name: string
  image?: string
}

export interface Coin {
  id: string
  summary: CoinSummary
  currentPrice: number
  marketCap: number
  marketCapRank: number
  totalVolume: number
  priceChangePercentage1hInCurrency: number
  priceChangePercentage24hInCurrency: number
  priceChangePercentage7dInCurrency: number
}

export interface CoinResult {
  id: number
  name: string
  symbol: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
}
