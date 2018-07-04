import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import {Route, Switch, Redirect} from "react-router"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Map } from 'immutable'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'

export const history = createBrowserHistory()

const initialState = Map({})
const middleware = [routerMiddleware(history), thunkMiddleware]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const configureStore = (initialState) => {
  if (history) {
    return createStore(
      reducers,
      initialState,
      composeEnhancers(applyMiddleware(...middleware))
    )
  }

  return createStore(reducers, initialState)
}

export const store = configureStore(initialState)

ReactDOM.render(
  <Provider store = {store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/movies" component = {App} />
        <Route exact path="/" render = {props => <Redirect to = "/movies" />}/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
serviceWorker().unregister()
