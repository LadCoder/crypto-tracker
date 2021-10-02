import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CoinsComponent } from '../coins/CoinsComponent'
import { PageContainer } from './Page'

/**
 * Router Navigation to each of the app pages
 * @return {JSX.Element}
 */
export function CryptoRouter(): JSX.Element {
  return (
    <Router>
      <a href="/trending">trending</a>
      <PageContainer>
        <Switch>
          <Route exact path="/">
            <CoinsComponent />
          </Route>
          <Route exact path="/trending">
            {/* <TrendingComponent /> */}
          </Route>
          <Route exact path="/global">
            {/* <GlobalComponent /> */}
          </Route>
        </Switch>
      </PageContainer>
    </Router>
  )
}
