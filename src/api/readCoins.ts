import { State, useFetch } from '../hooks/useFetch'
import { Coin } from '../types/coin'
import { listOfCoinsUrl } from '../constants/paths'

/**
 * Fetches a list of crypto coins from the api service and returns them to the user
 * @return {State<Coin[]>} A list of cryptocurrency coins
 */
export function readCoins(): State<Coin[]> {
  return useFetch<Coin[]>(listOfCoinsUrl)
}
