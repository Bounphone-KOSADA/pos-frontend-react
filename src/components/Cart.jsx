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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-fit sticky top-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Shopping Cart</h3>
        <div className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
          {cartItems.length} items
        </div>
      </div>

      {cartItems.length === 0 ? (
        // Empty State
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8l1.25 5.5h9.25M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8M7 13l-1.25-5.5" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Cart is empty</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Add some products to get started</p>
        </div>
      ) : (
        <div>
          {/* Cart Items */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex-1 pr-4">
                    {item.name}
                  </h4>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors duration-200"
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 dark:hover:bg-gray-500 rounded-l-lg transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-4 py-2 font-medium text-gray-900 dark:text-white min-w-[50px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 dark:hover:bg-gray-500 rounded-r-lg transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Item Total */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {(item.price * item.quantity).toLocaleString()} LAK
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.price.toLocaleString()} LAK each
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>{total.toLocaleString()} LAK</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>VAT ({(tax * 100)}%)</span>
                <span>{taxWithLAK.toLocaleString()} LAK</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-3 border-t border-gray-200 dark:border-gray-600">
                <span>Total</span>
                <span className="text-primary-600 dark:text-primary-400">{totalWithTax.toLocaleString()} LAK</span>
              </div>
            </div>
            
            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-4 px-6 rounded-lg mt-6 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
