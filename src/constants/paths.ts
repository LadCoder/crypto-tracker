export const baseUrl = 'https://api.coingecko.com/api/v3'

export const listOfCoinsUrl = `${baseUrl}/coins/markets`
export const trendingCoinsUrl = `${baseUrl}/search/trending`

export const listOfCoinsUrlParams = {
  vs_currency: 'usd',
  order: 'id_desc',
  per_page: 100,
  page: 1,
  sparkline: false
}

// ?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
