import React from 'react'
import './App.css'
import { CryptoRouter } from './components/layout/CryptoRouter'

/**
 * Entry function into the Crypto tracker app
 * @return {JSX.Element}
 */
export function App(): JSX.Element {
  return <CryptoRouter />
}
