import React from 'react'
import { Link } from 'react-router-dom'
import './UserNavbar.css'

const UserNavbar = () => {
  return (
    <div className='navbar'>
      Welcome user
      <Link to="/cart">View Cart | </Link>
      <Link to="/profile">View Profile | </Link>
      <Link to="/orders">View Orders | </Link>
      <Link to="/logout">Logout</Link>
    </div>
  )
}

export default UserNavbar
