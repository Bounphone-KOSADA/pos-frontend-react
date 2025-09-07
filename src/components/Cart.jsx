// src/components/Cart.jsx
import React from "react";

function Cart({ cartItems, onRemoveItem, onUpdateQuantity }) {
  const tax = 0.1; // 10%
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalWithTax = total + total * tax;
  const taxWithLAK = total * tax;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(id, newQuantity);
  };

  return (
    <div style={cartStyle}>
      <h3>Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={cartItemStyle}>
              <div className="item-name">{item.name}</div>
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className="qty-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <div style={totalStyle}>
            <p>VAT: {tax * 100}%</p>
            <p>VAT in LAK: {taxWithLAK}</p>
            <strong>Total: {totalWithTax} LAK</strong>
          </div>
        </div>
      )}
    </div>
  );
}

const cartStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

const cartItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #eee",
};

const totalStyle = {
  textAlign: "right",
  padding: "15px 0",
  fontSize: "18px",
};

export default Cart;
