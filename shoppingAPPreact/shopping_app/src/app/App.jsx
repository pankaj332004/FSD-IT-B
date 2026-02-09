import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '../context/AuthContext'
import React from "react";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
