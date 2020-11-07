import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalFeed } from './pages/GlobalFeed/GlobalFeed'
import { ArticlePage } from './pages/Article'
import { Login } from './pages/Login'
import { NotFoundPage } from './pages/NotFound'
import { Registration } from './pages/Registration'

export const Routes = () => {
  return(
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Registration} />
      <Route path="/articles/:slug" component={ArticlePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
}
