import axios from 'axios'
import { baseUrl } from '../constants/paths'

export const coinGeckoApi = axios.create({
  baseURL: baseUrl
})
