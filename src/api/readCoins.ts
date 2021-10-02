import { State, useAxios } from '../hooks/useAxios'
import { Coin, CoinResult } from '../types/coin'
import { listOfCoinsUrl, listOfCoinsUrlParams } from '../constants/paths'
import { convertToCurrency, convertToPercent } from '../services/convertNumber'

/**
 * Fetches a list of crypto coins from the api service and returns them to the user
 * @param {string} currency Accepts a currency to show coin comparisons against
 * @return {State<Coin[]>} A list of cryptocurrency coins
 */
export function readCoins(currency: string = 'usd'): State<Coin[]> {
  const { isLoading, error, response } = useAxios<CoinResult[]>(
    listOfCoinsUrl,
    {
      params: listOfCoinsUrlParams(currency)
    }
  )

  const coinData: Coin[] | undefined = response?.map((coin) => {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      currentPrice: convertToCurrency(currency, coin.current_price),
      totalVolume: convertToCurrency(currency, coin.total_volume),
      marketCap: convertToCurrency(currency, coin.market_cap),
      marketCapRank: coin.market_cap_rank,
      priceChangePercentage1hInCurrency: convertToPercent(
        coin.price_change_percentage_1h_in_currency
      ),
      priceChangePercentage24hInCurrency: convertToPercent(
        coin.price_change_percentage_24h_in_currency
      ),
      priceChangePercentage7dInCurrency: convertToPercent(
        coin.price_change_percentage_24h_in_currency
      )
    }
  })

  return {
    isLoading,
    error,
    response: coinData
  }
}
