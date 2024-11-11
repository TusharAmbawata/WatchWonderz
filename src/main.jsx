import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './components/context/cauth.jsx';
import "antd/dist/reset.css";
import { SearchProvider } from './components/context/search.jsx';
import { CartProvider } from './components/context/cart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode>, */}
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
)
