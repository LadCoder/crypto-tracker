import { defaultCurrency } from './currency'

export const baseUrl = 'https://api.coingecko.com/api/v3'

export const listOfCoinsUrl = `/coins/list`
export const marketUrl = `/coins/markets`
export const marketUrlParams = (
  ids: string[],
  currency: string = defaultCurrency
) => {
  const defaultParams = {
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: 100,
    page: 1,
    price_change_percentage: '1h,24h,7d',
    sparkline: false
  }
  if (ids.length === 0) return { params: defaultParams }

  return {
    params: {
      ...defaultParams,
      ids: ids.join(',')
    }
  }
}

export const trendingCoinsUrl = `/search/trending`
export const globalMarketUrl = '/global'
