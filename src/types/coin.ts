/* eslint-disable camelcase */
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
  currentPrice: string
  marketCap: string
  marketCapRank: number
  totalVolume: string
  priceChangePercentage1hInCurrency: string
  priceChangePercentage24hInCurrency: string
  priceChangePercentage7dInCurrency: string
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
