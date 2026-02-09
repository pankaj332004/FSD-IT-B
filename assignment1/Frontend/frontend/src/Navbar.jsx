import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img 
              src="https://media.licdn.com/dms/image/v2/C510BAQGHhq9X-H8LyQ/company-logo_200_200/company-logo_200_200/0/1631345366169?e=2147483647&v=beta&t=8hq7Hhr_Vlu6uIXpTU9yv31n6jB0_zBzvuFqHmHGwlg"
              alt="logo"
              className="navbar-logo-img"
            />
            <a href="#home" className="navbar-title">FS Model</a>
          </div>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <a href="#home" className="navbar-link">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
