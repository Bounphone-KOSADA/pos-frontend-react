// src/App.jsx
import React, { useState } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

function App() {
  const [cartItems, setCartItems] = useState([])
  
  // Move products state to App level for stock management
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "ເບຍລາວ",
      price: 25000,
      stock: 20,
      category: "Beverages",
      image: "/beerlao.jpeg",
    },
    {
      id: 2,
      name: "ຕຳໝາກຫຸ່ງ",
      price: 30000,
      stock: 15,
      category: "Food",
      image: "/papaya-salad.jpeg",
    },
    {
      id: 3,
      name: "ປີ້ງແບ້",
      price: 80000,
      stock: 0,
      category: "Food",
      image: "/grilled-goat.jpeg",
    },
    {
      id: 4,
      name: "Heineken",
      price: 30000,
      stock: 18,
      category: "Beverages",
      image: "/heineken.jpeg",
    },
    {
      id: 5,
      name: "ລາບປາ",
      price: 45000,
      stock: 12,
      category: "Food",
      image: "/larb.jpeg",
    },
    {
      id: 6,
      name: "ແກງປາ",
      price: 18000,
      stock: 25,
      category: "Food",
      image: "/fish-soup.jpeg",
    },
  ])

  const addToCart = (product) => {
    // Check if product has stock available
    const currentProduct = products.find(p => p.id === product.id)
    if (!currentProduct || currentProduct.stock <= 0) {
      return // Don't add to cart if no stock
    }

    const existingItem = cartItems.find(item => item.id === product.id)
    
    if (existingItem) {
      // Check if we can increase quantity (stock available)
      if (existingItem.quantity >= currentProduct.stock) {
        return // Don't allow adding more than available stock
      }
      
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }

    // Reduce stock by 1
    setProducts(products.map(p =>
      p.id === product.id
        ? { ...p, stock: p.stock - 1 }
        : p
    ))
  }

  const removeFromCart = (productId) => {
    // Find the item being removed to restore its stock
    const removedItem = cartItems.find(item => item.id === productId)
    if (removedItem) {
      // Restore stock
      setProducts(products.map(p =>
        p.id === productId
          ? { ...p, stock: p.stock + removedItem.quantity }
          : p
      ))
    }
    
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    const currentItem = cartItems.find(item => item.id === productId)
    const currentProduct = products.find(p => p.id === productId)
    
    if (!currentItem || !currentProduct) return
    
    const quantityDiff = newQuantity - currentItem.quantity
    
    // Check if we have enough stock for the increase
    if (quantityDiff > 0 && currentProduct.stock < quantityDiff) {
      return // Don't allow update if not enough stock
    }
    
    // Update cart quantity
    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ))
    
    // Update product stock (subtract the difference)
    setProducts(products.map(p =>
      p.id === productId
        ? { ...p, stock: p.stock - quantityDiff }
        : p
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Products</h2>
              <p className="text-gray-600 dark:text-gray-300">Browse and add products to your cart</p>
            </div>
            <ProductList products={products} onAddToCart={addToCart} />
          </div>
          
          {/* Cart Section */}
          <div className="lg:col-span-1">
            <Cart 
              cartItems={cartItems} 
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App