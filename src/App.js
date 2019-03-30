import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'
import posed, { PoseGroup } from 'react-pose'

import './App.css'

import AppNavbar from './components/layouts/AppNavbar'
import Dashboard from './components/layouts/Dashboard'
import AddClient from './components/clients/AddClient'
import EditClient from './components/clients/EditClient'
import ClientDetails from './components/clients/ClientDetails'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Settings from './components/settings/Settings'

const routes = [
  {
    path: '/',
    component: UserIsAuthenticated(Dashboard),
    key: 'home'
  },
  {
    path: '/client/add',
    component: UserIsAuthenticated(AddClient),
    key: 'addClient'
  },
  {
    path: '/client/:id',
    component: UserIsAuthenticated(ClientDetails),
    key: 'clientID'
  },
  {
    path: '/client/edit/:id',
    component: UserIsAuthenticated(EditClient),
    key: 'clientEdit'
  },
  {
    path: '/login',
    component: UserIsNotAuthenticated(Login),
    key: 'login'
  },
  {
    path: '/register',
    component: UserIsNotAuthenticated(Register),
    key: 'register'
  },
  {
    path: '/settings',
    component: UserIsAuthenticated(Settings),
    key: 'settings'
  }
]

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
})

const App = () => (
  <Provider store={store}>
    <Router>
      <Route
        render={({ location }) => (
          <div className="App">
            <AppNavbar />
            <div className="container">
              <PoseGroup>
                <RouteContainer key={location.pathname}>
                  <Switch location={location} key={`switchfor${location.pathname}`}>
                    {routes.map(({ path, component, key }) => (
                      <Route exact path={path} component={component} key={key} />
                    ))}
                  </Switch>
                </RouteContainer>
              </PoseGroup>
            </div>
          </div>
        )}
      />
    </Router>
  </Provider>
)

export default App
