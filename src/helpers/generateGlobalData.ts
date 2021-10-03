export const generateGlobalData = (payload: any) => {
  if (!payload) return
  return {
    activeCoins: payload.active_cryptocurrencies,
    totalMarketCap: payload.total_market_cap,
    totalVolume: payload.total_volume,
    marketCapPercentage: payload.market_cap_percentage,
    marketCapChange24hPercentage: payload.market_cap_change_percentage_24h_usd
  }
}
