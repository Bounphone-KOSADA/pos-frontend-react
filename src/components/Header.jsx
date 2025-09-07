// src/components/Header.jsx
import React from 'react'

function Header() {
  return (
    <header style={headerStyle}>
      <h1>POS System</h1>
      <nav>
        <button>Products</button>
        <button>Orders</button>
        <button>Reports</button>
        <button>Logout</button>
      </nav>
    </header>
  )
}

const headerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

export default Header