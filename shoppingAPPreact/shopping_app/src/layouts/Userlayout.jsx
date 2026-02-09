import { Outlet, Link } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      <nav>
        <Link to="/user">Shop</Link> | 
        <Link to="/user/cart">Cart</Link> | 
        <Link to="/user/profile">Profile</Link> | 
        <Link to="/logout">Logout</Link>
      </nav>
      <Outlet />
    </>
  )
}

export default UserLayout
