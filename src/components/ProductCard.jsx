// src/components/ProductCard.jsx
import React from 'react'
import Swal from 'sweetalert2'

function ProductCard({ product, onAddToCart }) {

  const handleAddToCart = () => {
    onAddToCart(product);
    Swal.fire({
      icon: 'success',
      title: `ເພີ່ມສຳເລັດແລ້ວ`,
      text: `${product.name} ໄດ້ເພີ່ມເຂົ້າກະຕ່າແລ້ວ.`,
      timer: 1500,
      showConfirmButton: false
    })
  }

  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        <img 
          src={product.image || '/images/placeholder.jpg'} 
          alt={product.name}
          style={imageStyle}
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'
          }}
        />
      </div>
      <h3>{product.name}</h3>
      <p className="price">{product.price.toLocaleString()} LAK</p>
      <p className="stock">Stock: {product.stock}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  margin: '10px',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textAlign: 'center'
}

const imageContainerStyle = {
  width: '100%',
  height: '150px',
  marginBottom: '12px',
  overflow: 'hidden',
  borderRadius: '6px'
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease'
}

export default ProductCard