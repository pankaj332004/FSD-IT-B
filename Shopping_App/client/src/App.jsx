import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import UserDashboard from './Pages/userDashboard'
import AdminDashboard from './Pages/AdminDashboard'

const App = () => {
  return (
    <div>
      <BrowserRouter> 
      <Routes>
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cart" element={<h1>Contact Page</h1>} />
        <Route path="/order" element={<h1>Login Page</h1>} />
        <Route path="/profile" element={<h1>Register Page</h1>} />
        <Route path="/logout" element={<h1>Logout Page</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
