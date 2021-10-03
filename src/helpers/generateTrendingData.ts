export const generateTrendingData = (coins: any[]) => {
  if (!coins) return
  return coins.map((item) => {
    return {
      id: item.item.id,
      name: item.item.name,
      symbol: item.item.symbol,
      image: item.item.thumb,
      marketCapRank: item.item.market_cap_rank,
      priceBtc: item.item.price_btc,
      score: item.item.score
    }
  })
}
