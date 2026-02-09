import { Routes, Route } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'

import UserDashboard from '../pages/user/UserDashboard'
import Cart from '../pages/user/Cart'
import Order from '../pages/user/Order'
import Profile from '../pages/user/Profile'

import AdminDashboard from '../pages/admin/AdminDashboard'
import Products from '../pages/admin/Products'
import Orders from '../pages/admin/Orders'

import Login from '../pages/auth/Login'
import Logout from '../pages/auth/Logout'

const AppRoutes = () => {
  return (
    <Routes>

      {/* USER ROUTES */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order" element={<Order />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      {/* FALLBACK */}
      <Route path="*" element={<h1>404 | Page Not Found</h1>} />

    </Routes>
  )
}

export default AppRoutes
