import React from 'react'
import Student from "/src/components/Student.jsx"
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  
  return (
    <div >
      <h1>welcome  user</h1> 
      <div className='book-list'>
      <Header /> 
      <Student />
      <Student />
      <Student />
      <Student />
      <Footer />
      </div>
    </div>
  )
}

export default App
