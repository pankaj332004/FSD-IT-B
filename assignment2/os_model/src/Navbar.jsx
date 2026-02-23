import React from 'react'
import './Navbar.css'

const Navbar = ({ setCurrentPage }) => {
  return (
    <div className='navbar'>
      <div className='navbar-brand'>
        <img src="https://media.licdn.com/dms/image/v2/C510BAQGHhq9X-H8LyQ/company-logo_200_200/company-logo_200_200/0/1631345366169?e=2147483647&v=beta&t=8hq7Hhr_Vlu6uIXpTU9yv31n6jB0_zBzvuFqHmHGwlg" alt="abes logo" />
        <h1>OS Model Simulator</h1>
      </div>
      <div className='navbar-links'>
        <button onClick={() => setCurrentPage('home')} className='nav-link'>Home</button>
        <button onClick={() => setCurrentPage('cpu-scheduling')} className='nav-link'>CPU Scheduling</button>
        <button onClick={() => setCurrentPage('memory-management')} className='nav-link'>Memory Management</button>
        <button onClick={() => setCurrentPage('disk-scheduling')} className='nav-link'>Disk Scheduling</button>
      </div>
    </div>
  )
}

export default Navbar
