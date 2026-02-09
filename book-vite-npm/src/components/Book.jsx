import React from 'react'
import './Book.css' 

const Book = () => {
  let count = 0;  
  const addtocart = () => {
    alert('Book added to cart successfully!')
  }
  return (
    <div className='card'>
      <img src="https://tse4.mm.bing.net/th/id/OIP.Fc8uWTPAjeIlcsHDI-zA8AHaKE?rs=1&pid=ImgDetMain&o=7&rm=3" alt='bookcover' width={200}    height={300}/>
      <h2>Title : Physics</h2>
      <p>Author: Arihant</p>
      <p>Price: ₹19.99</p><br />
      <div>
          <button>-</button>
          <span>count</span>
          <button>+</button>
      </div>
      <button onClick={addtocart}>Add to Cart</button>
    </div>
  )
}

export default Book
