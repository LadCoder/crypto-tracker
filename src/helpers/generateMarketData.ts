export const generateMarketData = (payload: any[]) => {
  if (!payload) return
  return payload.map((item) => {
    return {
      id: item.id,
      summary: {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        image: item.image
      },
      currentPrice: item.current_price,
      totalVolume: item.total_volume,
      marketCap: item.market_cap,
      marketCapRank: item.market_cap_rank,
      priceChangePercentage1hInCurrency:
        item.price_change_percentage_1h_in_currency,
      priceChangePercentage24hInCurrency:
        item.price_change_percentage_24h_in_currency,
      priceChangePercentage7dInCurrency:
        item.price_change_percentage_7d_in_currency
    }
  })
}
