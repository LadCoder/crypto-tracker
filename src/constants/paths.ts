export const baseUrl = 'https://api.coingecko.com/api/v3'

export const listOfCoinsUrl = `${baseUrl}/coins/markets`
export const trendingCoinsUrl = `${baseUrl}/search/trending`

export const listOfCoinsUrlParams = (currency: string = 'usd') => {
  return {
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: 100,
    page: 1,
    price_change_percentage: '1h,24h,7d',
    sparkline: false
  }
}
