import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalFeed } from './pages'
import { ArticlePage } from './pages/Article'
import { NotFoundPage } from './pages/NotFound'

export const Routes = () => {
  return(
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/articles/:slug" component={ArticlePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
}
