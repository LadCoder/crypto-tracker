/* eslint-disable no-unused-vars */
export enum CoinSummaryActions {
  FetchCoinSummary = 'fetchCoinSummary',
  FetchCoinSummarySuccess = 'fetchCoinSummarySuccess',
  FetchCoinSummaryFailure = 'fetchCoinSummaryFailure'
}

export enum TrendingCoinsActions {
  FetchTrendingCoins = 'fetchTrendingCoins',
  FetchTrendingCoinsSuccess = 'fetchTrendingCoinsSuccess',
  FetchTrendingCoinsFailure = 'fetchTrendingCoinsFailure'
}

export enum MarketActions {
  FetchMarketDetails = 'fetchMarketDetails',
  FetchMarketDetailsSuccess = 'fetchMarketDetailsSuccess',
  FetchMarketDetailsFailure = 'fetchMarketDetailsFailure'
}

export enum GlobalMarketActions {
  FetchGlobalStats = 'fetchGlobalStats',
  FetchGlobalStatsSuccess = 'fetchGlobalStatsSuccess',
  FetchGlobalStatsFailure = 'fetchGlobalStatsFailure'
}
