import React, { useState } from 'react'
import Navbar from './Navbar'
import Home from './pages/Home'
import CPUScheduling from './pages/CPUScheduling'
import MemoryManagement from './pages/MemoryManagement'
import DiskScheduling from './pages/DiskScheduling'
import './App.css'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'cpu-scheduling':
        return <CPUScheduling />
      case 'memory-management':
        return <MemoryManagement />
      case 'disk-scheduling':
        return <DiskScheduling />
      default:
        return <Home />
    }
  }

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
