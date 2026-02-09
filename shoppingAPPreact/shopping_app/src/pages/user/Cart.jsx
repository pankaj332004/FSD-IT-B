import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const Cart = () => {
  const { cart, removeFromCart, total } = useContext(CartContext)

  return (
    <>
      <h1>Cart</h1>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} - ${item.price}
          <button onClick={() => removeFromCart(item.id)}>X</button>
        </div>
      ))}
      <h2>Total: ${total}</h2>
    </>
  )
}

export default Cart
