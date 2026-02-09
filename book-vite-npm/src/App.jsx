import React from 'react'
import Book from '../src/components/Book.jsx'
import './App.css'

const App = () => {
  
  return (
    <div >
      <h1>welcome  user</h1> 
      <div className='book-list'>
      <Book />
      <Book />
      <Book />
      <Book />
      </div>
    </div>
  )
}

export default App
