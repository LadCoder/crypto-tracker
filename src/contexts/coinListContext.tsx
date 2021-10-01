import React, { createContext, useContext, useState } from 'react'
import { Coin } from '../types/coin'

interface Props {
  children: React.ReactNode
}

interface CoinListContextProps {
  coinList: Coin[]
  setCoinList(coinList: Coin[]): void
}

export const CoinListContext = createContext<CoinListContextProps>({
  coinList: [],
  setCoinList: () => {}
})

export const useCoinList = () => useContext(CoinListContext)

export const CoinListContextProivder = ({ children }: Props) => {
  const [coinList, setCoinList] = useState<Coin[]>([])

  return (
    <CoinListContext.Provider
      value={{
        coinList,
        setCoinList
      }}
    >
      {children}
    </CoinListContext.Provider>
  )
}
