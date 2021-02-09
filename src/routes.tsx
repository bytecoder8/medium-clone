import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalFeed } from './pages/GlobalFeed/GlobalFeed'
import { ArticlePage } from './pages/Article/Article'
import { Login } from './pages/Login'
import { NotFoundPage } from './pages/NotFound'
import { Registration } from './pages/Registration'
import { Profile } from './pages/Profile/Profile'
import { YourFeed } from './pages/YourFeed/YourFeed'
import { ProtectedRoute } from './components/ProtectedRoute'
import { CreateArticle } from './pages/CreateArticle/CreateArticle'
import { Settings } from './pages/Settings/Settings'
import { EditArticle } from './pages/EditArticle/EditArticle'


export const Routes = () => {
  
  return(
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/tags/:tag" component={GlobalFeed} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Registration} />
      <Route path="/profiles/:slug" component={Profile} />
      <Route path="/profiles/:slug/favorites" component={Profile} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/articles/create" exact component={CreateArticle} />
      <ProtectedRoute path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/articles/:slug" component={ArticlePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
}
