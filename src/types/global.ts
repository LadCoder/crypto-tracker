export interface Global {
  activeCoins: number
  totalMarketCap: Record<string, number> // symbol, market cap
  totalVolume: Record<string, number> // coin symbol, volume
  marketCapPercentage: Record<string, number> // coin symbol, percentage
  marketCapChange24hPercentage: number
}
