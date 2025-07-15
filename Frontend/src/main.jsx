import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import { CityProvider } from './context/CityContext.jsx'
import { UserProvider } from './context/authUser.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CityProvider>
    <UserProvider>
    <App />
    </UserProvider>
  </CityProvider>
    
  </BrowserRouter>
  
)
