import { State, useAxios } from '../hooks/useAxios'
import { Coin, CoinResult } from '../types/coin'
import { listOfCoinsUrl, listOfCoinsUrlParams } from '../constants/paths'

/**
 * Fetches a list of crypto coins from the api service and returns them to the user
 * @return {State<Coin[]>} A list of cryptocurrency coins
 */
export function readCoins(): State<Coin[]> {
  const { isLoading, error, response } = useAxios<CoinResult[]>(
    listOfCoinsUrl,
    {
      params: listOfCoinsUrlParams
    }
  )

  const coinData: Coin[] | undefined = response?.map((coin) => {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      currentPrice: coin.current_price,
      totalVolume: coin.total_volume,
      marketCap: coin.market_cap,
      marketCapRank: coin.market_cap_rank,
      priceChangePercentage1hInCurrency:
        coin.price_change_percentage_1h_in_currency,
      priceChangePercentage24hInCurrency:
        coin.price_change_percentage_24h_in_currency,
      priceChangePercentage7dInCurrency:
        coin.price_change_percentage_24h_in_currency
    }
  })

  return {
    isLoading,
    error,
    response: coinData
  }
}
