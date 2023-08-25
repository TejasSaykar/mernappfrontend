import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx';
import { ModeProvider } from './Context/darkMode.jsx';
import 'antd/dist/reset.css';
import { SearchProvider } from './Context/SearchContext.jsx';
import { CartProvider } from './Context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <ModeProvider>
        <CartProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </CartProvider>
      </ModeProvider>
    </BrowserRouter>
  </AuthProvider>
)
