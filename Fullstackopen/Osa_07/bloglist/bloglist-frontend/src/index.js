import React from 'react'
import ReactDOM from 'react-dom/client'
import ConnectedRedux from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <BrowserRouter>
  <ConnectedRedux />
  </BrowserRouter>
</Provider>
)
