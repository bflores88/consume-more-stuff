import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import savannahApp from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'; // may not need reducer

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension's options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// const reducer = combineReducers({ itemReducer });

const store = createStore(savannahApp, applyMiddleware(thunk)); // used to be reducer

const output = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(output, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
