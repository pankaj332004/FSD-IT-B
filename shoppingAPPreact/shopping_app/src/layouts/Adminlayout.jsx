import { Outlet, Link } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: 200 }}>
        <Link to="/admin">Dashboard</Link><br />
        <Link to="/admin/products">Products</Link><br />
        <Link to="/admin/orders">Orders</Link><br />
        <Link to="/logout">Logout</Link>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
