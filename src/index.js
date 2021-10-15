import React from 'react';
import ReactDOM from 'react-dom';
import '../src/utils/css/index.css';
import App from '../src/components/App';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../src/reducers'
import middleware from '../src/middleware'

// create the store
const store = createStore(reducer, middleware)

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);