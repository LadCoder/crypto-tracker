export const generateGlobalData = (payload: any) => {
  if (!payload) return
  const { data } = payload
  return {
    activeCoins: data.active_cryptocurrencies,
    totalMarketCap: data.total_market_cap,
    totalVolume: data.total_volume,
    marketCapPercentage: data.market_cap_percentage,
    marketCapChange24hPercentage: data.market_cap_change_percentage_24h_usd
  }
}
