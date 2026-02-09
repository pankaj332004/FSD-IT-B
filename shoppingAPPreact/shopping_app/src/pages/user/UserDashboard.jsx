import ProductCard from '../../components/ProductCard'

const products = [
  { id: 1, name: 'iPhone 15', price: 999 },
  { id: 2, name: 'MacBook Pro', price: 1999 }
]

const UserDashboard = () => {
  return (
    <div>
      <h1>Shop Products</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default UserDashboard
