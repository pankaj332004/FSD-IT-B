import React from 'react'

function Book({ book }) {

  return (
    <div className="card">
      <img src={book.img} alt={book.title} width="300" height="300" />
      <h3>Title: {book.title}</h3>
      <h4>Price: {book.price}</h4>
      <button>Add To Cart</button>
    </div>
  );
}

function BookList({ books }) {
  return (
    <div className="book-list">
      {books.map((b, index) => (
        <Book key={index} book={b} />
      ))}
    </div>
  );
}

const books = [
  {
    img: "https://booksandyou.in/cdn/shop/files/PhysicsPartITextbookforClassXII_1.webp?v=1713763686",
    title: "Physics Book",
    price: "₹250",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1eQLxHzersIRrQEMw-qK1QqRNEQU-K6POMA&s",
    title: "Chemistry Book",
    price: "₹300",
  },
  {
    img: "https://www.onetouchbook.com/cdn/shop/files/Math-XI_Vol_I_1.jpg?v=1714391957",
    title: "Maths Book",
    price: "₹400",
  },
];

export default function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Book Store</h1>
      <BookList books={books} />
    </>
  );
}
