import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router/Router.jsx'
import './css/index.css'
import GlobalStateContextProvider from './Context/GlobalStateContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalStateContextProvider>

    <Router />
  </GlobalStateContextProvider>
)
