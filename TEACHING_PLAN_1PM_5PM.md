# POS Frontend React - Live Coding Teaching Plan
## 4-Hour Session (1:00 PM - 5:00 PM)

### Course Overview
Building a complete Point of Sale (POS) system frontend using React, focusing on practical implementation and real-world development patterns.

---

## 📅 Schedule Breakdown

### **Hour 1: Project Setup & Basic Structure (1:00 PM - 2:00 PM)**

#### **1:00 PM - 1:15 PM: Environment Setup**
```bash
# Live Coding Block 1: Project Initialization
npx create-vite@latest pos-frontend-react --template react
cd pos-frontend-react
npm install
npm run dev
```

**Teaching Points:**
- Explain Vite vs Create React App
- Project structure walkthrough
- Development server setup

#### **1:15 PM - 1:30 PM: Clean Up & Basic Structure**
```jsx
// Live Coding Block 2: App.jsx Basic Structure
import React from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <header>
        <h1>POS System</h1>
      </header>
      <main>
        <p>Welcome to our POS system</p>
      </main>
    </div>
  )
}

export default App
```

**Teaching Points:**
- JSX syntax
- Component structure
- CSS imports

#### **1:30 PM - 1:45 PM: Header Component**
```jsx
// Live Coding Block 3: components/Header.jsx
import React from 'react'

function Header({ cartCount = 0 }) {
  return (
    <header style={headerStyle}>
      <h1>🛒 POS System</h1>
      <div style={headerRightStyle}>
        <div style={cartStyle}>
          Cart: {cartCount} items
        </div>
        <nav style={navStyle}>
          <button style={buttonStyle}>Products</button>
          <button style={buttonStyle}>Orders</button>
          <button style={buttonStyle}>Reports</button>
          <button style={buttonStyle}>Logout</button>
        </nav>
      </div>
    </header>
  )
}

const headerStyle = {
  backgroundColor: '#2c3e50',
  color: 'white',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const headerRightStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem'
}

const cartStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  backgroundColor: '#3498db',
  padding: '0.5rem 1rem',
  borderRadius: '20px'
}

const navStyle = {
  display: 'flex',
  gap: '1rem'
}

const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid white',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem'
}

export default Header
```

**Teaching Points:**
- Component props
- Inline styling
- Component export/import

#### **1:45 PM - 2:00 PM: Basic Layout Setup**
```jsx
// Live Coding Block 4: Updated App.jsx with Header
import React, { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="App">
      <Header cartCount={cartCount} />
      <main style={mainStyle}>
        <div>Products will go here</div>
        <div>Cart will go here</div>
      </main>
    </div>
  )
}

const mainStyle = {
  display: 'flex',
  minHeight: 'calc(100vh - 80px)',
  gap: '2rem',
  padding: '2rem'
}

export default App
```

**Teaching Points:**
- React hooks (useState)
- State management basics
- Array methods (reduce)

---

### **Hour 2: Product Display & Components (2:00 PM - 3:00 PM)**

#### **2:00 PM - 2:20 PM: Product Data & ProductCard Component**
```jsx
// Live Coding Block 5: Sample Lao product data in App.jsx
const sampleProducts = [
  { 
    id: 1, 
    name: 'ເບຍລາວ', 
    price: 3.50, 
    stock: 20, 
    category: 'Beverages',
    image: '/beerlao.jpeg'
  },
  { 
    id: 2, 
    name: 'ຕຳໝາກຫຸ່ງ', 
    price: 8.99, 
    stock: 15, 
    category: 'Food',
    image: '/papaya-salad.jpeg'
  },
  { 
    id: 3, 
    name: 'ປີ້ງແບ້', 
    price: 4.25, 
    stock: 30, 
    category: 'Food',
    image: '/grilled-goat.jpeg'
  },
  { 
    id: 4, 
    name: 'Heineken', 
    price: 2.50, 
    stock: 18, 
    category: 'Beverages',
    image: '/heineken.jpeg'
  }
]
```

```jsx
// Live Coding Block 6: components/ProductCard.jsx
import React from 'react'

function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = () => {
    if (product.stock <= 0) {
      alert('Sorry, this product is out of stock!')
      return
    }
    
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  return (
    <div style={{
      ...cardStyle,
      opacity: product.stock <= 0 ? 0.6 : 1
    }}>
      <div style={imageContainerStyle}>
        <img 
          src={product.image || '/images/placeholder.jpg'} 
          alt={product.name}
          style={imageStyle}
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'
          }}
        />
        {product.stock <= 0 && (
          <div style={outOfStockOverlayStyle}>
            OUT OF STOCK
          </div>
        )}
      </div>
      <div style={cardContentStyle}>
        <h3 style={nameStyle}>{product.name}</h3>
        <p style={priceStyle}>${product.price.toFixed(2)}</p>
        <p style={stockStyle}>
          Stock: <span style={product.stock <= 5 ? lowStockStyle : {}}>{product.stock}</span>
        </p>
        <button 
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          style={product.stock <= 0 ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
        >
          {product.stock <= 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  )
}

const cardStyle = {
  border: '1px solid #e9ecef',
  borderRadius: '12px',
  backgroundColor: 'white',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  overflow: 'hidden'
}

const imageContainerStyle = {
  width: '100%',
  height: '180px',
  overflow: 'hidden',
  position: 'relative'
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease'
}

const outOfStockOverlayStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(231, 76, 60, 0.9)',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  fontWeight: 'bold',
  fontSize: '0.8rem'
}

const cardContentStyle = {
  padding: '1rem',
  textAlign: 'center'
}

const nameStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#2c3e50'
}

const priceStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  color: '#27ae60'
}

const stockStyle = {
  margin: '0 0 1rem 0',
  fontSize: '0.9rem',
  color: '#7f8c8d'
}

const lowStockStyle = {
  color: '#e74c3c',
  fontWeight: 'bold'
}

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease'
}

const disabledButtonStyle = {
  backgroundColor: '#bdc3c7',
  cursor: 'not-allowed'
}

export default ProductCard
```

**Teaching Points:**
- Props handling
- Conditional rendering
- Event handling
- Button states

#### **2:20 PM - 2:40 PM: ProductList Component**
```jsx
// Live Coding Block 7: components/ProductList.jsx
import React from 'react'
import ProductCard from './ProductCard'

function ProductList({ products, onAddToCart }) {
  return (
    <div style={containerStyle}>
      <h2>Products</h2>
      <div style={gridStyle}>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

const containerStyle = {
  flex: 2,
  padding: '1rem'
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1rem',
  marginTop: '1rem'
}

export default ProductList
```

**Teaching Points:**
- Component composition
- Array mapping
- CSS Grid
- Key prop importance

#### **2:40 PM - 3:00 PM: Integrate Products into App**
```jsx
// Live Coding Block 8: Update App.jsx with products
import React, { useState } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import './App.css'

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Coffee', price: 3.50, stock: 20, category: 'Beverages' },
    { id: 2, name: 'Sandwich', price: 8.99, stock: 15, category: 'Food' },
    { id: 3, name: 'Juice', price: 4.25, stock: 30, category: 'Beverages' },
    { id: 4, name: 'Donut', price: 2.75, stock: 12, category: 'Food' },
    { id: 5, name: 'Tea', price: 2.50, stock: 18, category: 'Beverages' }
  ])
  
  const [cartItems, setCartItems] = useState([])
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const addToCart = (product) => {
    console.log('Adding to cart:', product.name)
    // We'll implement this in the next hour
  }

  return (
    <div className="App">
      <Header cartCount={cartCount} />
      <main style={mainStyle}>
        <ProductList products={products} onAddToCart={addToCart} />
        <div style={cartPanelStyle}>
          <h2>Shopping Cart</h2>
          <p>Cart functionality coming next...</p>
        </div>
      </main>
    </div>
  )
}

const mainStyle = {
  display: 'flex',
  minHeight: 'calc(100vh - 80px)',
  gap: '2rem',
  padding: '2rem'
}

const cartPanelStyle = {
  flex: 1,
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px'
}

export default App
```

**Teaching Points:**
- State lifting
- Component communication
- Placeholder implementation

---

### **Hour 3: Cart Functionality & State Management (3:00 PM - 4:00 PM)**

#### **3:00 PM - 3:20 PM: Cart Component Structure**
```jsx
// Live Coding Block 9: components/Cart.jsx
import React from 'react'

function Cart({ cartItems, onRemoveItem, onUpdateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div style={cartStyle}>
      <h2 style={titleStyle}>🛒 Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div style={emptyCartStyle}>
          <p>Your cart is empty</p>
          <p style={emptySubtextStyle}>Add some delicious items!</p>
        </div>
      ) : (
        <>
          <div style={itemsStyle}>
            {cartItems.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
          <div style={totalStyle}>
            <div style={totalLabelStyle}>Total Amount:</div>
            <div style={totalAmountStyle}>${total.toFixed(2)}</div>
          </div>
          <button style={checkoutStyle}>
            💳 Checkout Now
          </button>
        </>
      )}
    </div>
  )
}

function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div style={itemStyle}>
      <div style={itemImageStyle}>
        <img 
          src={item.image || '/images/placeholder.jpg'} 
          alt={item.name}
          style={imageStyle}
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg'
          }}
        />
      </div>
      <div style={itemDetailsStyle}>
        <h4 style={itemNameStyle}>{item.name}</h4>
        <p style={itemPriceStyle}>${item.price.toFixed(2)} each</p>
        <div style={quantityControlsStyle}>
          <button 
            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            style={quantityButtonStyle}
          >
            −
          </button>
          <span style={quantityDisplayStyle}>{item.quantity}</span>
          <button 
            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
            style={quantityButtonStyle}
          >
            +
          </button>
        </div>
      </div>
      <div style={itemActionsStyle}>
        <div style={itemTotalStyle}>${(item.price * item.quantity).toFixed(2)}</div>
        <button 
          onClick={() => onRemove && onRemove(item.id)} 
          style={removeButtonStyle}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

const cartStyle = {
  height: '100%'
}

const titleStyle = {
  marginBottom: '1.5rem',
  color: '#2c3e50',
  borderBottom: '2px solid #3498db',
  paddingBottom: '0.5rem'
}

const emptyCartStyle = {
  textAlign: 'center',
  padding: '3rem 1rem',
  color: '#7f8c8d'
}

const emptySubtextStyle = {
  fontSize: '0.9rem',
  marginTop: '0.5rem'
}

const itemsStyle = {
  marginBottom: '1.5rem',
  maxHeight: '400px',
  overflowY: 'auto'
}

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  marginBottom: '1rem',
  backgroundColor: '#f8f9fa',
  transition: 'all 0.2s ease'
}

const itemImageStyle = {
  width: '60px',
  height: '60px',
  flexShrink: 0
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '6px'
}

const itemDetailsStyle = {
  flex: 1,
  minWidth: 0
}

const itemNameStyle = {
  fontSize: '0.95rem',
  fontWeight: 'bold',
  margin: '0 0 0.25rem 0',
  color: '#2c3e50'
}

const itemPriceStyle = {
  fontSize: '0.85rem',
  color: '#7f8c8d',
  margin: '0 0 0.5rem 0'
}

const quantityControlsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
}

const quantityButtonStyle = {
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold'
}

const quantityDisplayStyle = {
  minWidth: '20px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '0.9rem'
}

const itemActionsStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '0.5rem'
}

const itemTotalStyle = {
  fontWeight: 'bold',
  fontSize: '1rem',
  color: '#27ae60'
}

const removeButtonStyle = {
  backgroundColor: '#e74c3c',
  border: 'none',
  padding: '0.4rem 0.6rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.85rem'
}

const totalStyle = {
  padding: '1rem',
  backgroundColor: '#2c3e50',
  borderRadius: '8px',
  marginBottom: '1rem',
  color: 'white',
  textAlign: 'center'
}

const totalLabelStyle = {
  fontSize: '1rem',
  marginBottom: '0.5rem'
}

const totalAmountStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold'
}

const checkoutStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
}

export default Cart
```

**Teaching Points:**
- Component composition
- Conditional rendering
- Event handling with parameters
- Calculate totals

#### **3:20 PM - 3:40 PM: Implement Cart Logic in App**
```jsx
// Live Coding Block 10: Complete cart functionality in App.jsx
const addToCart = (product) => {
  // Check stock
  if (product.stock <= 0) return
  
  const existingItem = cartItems.find(item => item.id === product.id)
  
  // Update stock
  setProducts(products.map(p =>
    p.id === product.id
      ? { ...p, stock: p.stock - 1 }
      : p
  ))
  
  if (existingItem) {
    // Increase quantity
    setCartItems(cartItems.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ))
  } else {
    // Add new item
    setCartItems([...cartItems, { ...product, quantity: 1 }])
  }
}

const removeFromCart = (productId) => {
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
  if (newQuantity < 1) return
  
  const currentItem = cartItems.find(item => item.id === productId)
  const quantityDiff = newQuantity - currentItem.quantity
  const currentProduct = products.find(p => p.id === productId)
  
  // Check stock availability
  if (quantityDiff > 0 && currentProduct.stock < quantityDiff) {
    alert('Not enough stock available!')
    return
  }
  
  // Update stock
  setProducts(products.map(p =>
    p.id === productId
      ? { ...p, stock: p.stock - quantityDiff }
      : p
  ))
  
  // Update cart
  setCartItems(cartItems.map(item =>
    item.id === productId
      ? { ...item, quantity: newQuantity }
      : item
  ))
}
```

**Teaching Points:**
- State management strategies
- Immutable updates
- Stock management logic
- Array methods (find, map, filter)

#### **3:40 PM - 4:00 PM: Connect Cart Component**
```jsx
// Live Coding Block 11: Final App.jsx integration
import React, { useState } from 'react'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  // ... previous state and functions ...

  return (
    <div className="App">
      <Header cartCount={cartCount} />
      <main style={mainStyle}>
        <ProductList products={products} onAddToCart={addToCart} />
        <Cart 
          cartItems={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      </main>
    </div>
  )
}
```

**Teaching Points:**
- Component integration
- Props drilling
- Testing the complete flow

---

### **Hour 4: Advanced Features & Polish (4:00 PM - 5:00 PM)**

#### **4:00 PM - 4:15 PM: Search Functionality**
```jsx
// Live Coding Block 12: components/SearchBar.jsx
import React, { useState } from 'react'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value) // Real-time search
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleChange}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        🔍
      </button>
    </form>
  )
}

const formStyle = {
  display: 'flex',
  marginBottom: '1rem',
  gap: '0.5rem'
}

const inputStyle = {
  flex: 1,
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem'
}

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
}

export default SearchBar
```

#### **4:15 PM - 4:30 PM: Category Filter**
```jsx
// Live Coding Block 13: components/CategoryFilter.jsx
import React from 'react'

function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div style={filterStyle}>
      <label>Filter by category:</label>
      <select 
        value={selectedCategory} 
        onChange={(e) => onCategoryChange(e.target.value)}
        style={selectStyle}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

const filterStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1rem'
}

const selectStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px'
}

export default CategoryFilter
```

#### **4:30 PM - 4:45 PM: Integrate Search & Filter**
```jsx
// Live Coding Block 14: Update ProductList with search & filter
import React, { useState, useEffect, useCallback } from 'react'
import ProductCard from './ProductCard'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'

function ProductList({ products, onAddToCart }) {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [...new Set(products.map(p => p.category))]

  const applyFilters = useCallback((search = searchTerm, category = selectedCategory) => {
    let filtered = products

    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const handleSearch = (search) => {
    setSearchTerm(search)
    applyFilters(search, selectedCategory)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    applyFilters(searchTerm, category)
  }

  return (
    <div style={containerStyle}>
      <h2>Products</h2>
      <div style={filtersStyle}>
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div style={gridStyle}>
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p style={noResultsStyle}>No products found matching your criteria.</p>
      )}
    </div>
  )
}

const filtersStyle = {
  marginBottom: '1rem'
}

const noResultsStyle = {
  textAlign: 'center',
  color: '#6c757d',
  fontStyle: 'italic',
  marginTop: '2rem'
}

// ... other styles remain the same
```

**Teaching Points:**
- useEffect and useCallback hooks
- Filtering and searching logic
- Real-time updates

#### **4:45 PM - 5:00 PM: Final Polish & Demo**
```jsx
// Live Coding Block 15: Add loading states and error handling
const [isLoading, setIsLoading] = useState(false)

// Add some polish to the UI
const globalStyles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f8f9fa;
  }
  
  .App {
    min-height: 100vh;
  }
  
  button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  .product-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`
```

**Final Demo Points:**
- Complete workflow demonstration
- Error handling scenarios
- Performance considerations
- Future improvements discussion

---

## 🎯 Learning Objectives Achieved

By the end of this session, students will have:
1. ✅ Set up a React project with Vite
2. ✅ Created reusable components
3. ✅ Implemented state management with hooks
4. ✅ Built a complete cart system with stock management
5. ✅ Added search and filtering functionality
6. ✅ Handled user interactions and events
7. ✅ Applied styling and responsive design principles

## 📝 Homework/Extension Tasks

1. Add local storage persistence for cart items
2. Implement checkout functionality with form validation
3. Add product images and better styling
4. Create admin panel for product management
5. Add unit tests for components
6. Implement dark/light theme toggle

## 🔧 Technologies Covered

- **React 18** - Modern React with hooks
- **Vite** - Build tool and dev server
- **JavaScript ES6+** - Modern JavaScript features
- **CSS-in-JS** - Inline styling approach
- **Component Architecture** - Reusable component patterns
- **State Management** - useState and useEffect hooks
- **Event Handling** - User interactions
- **Array Methods** - map, filter, reduce, find

---

*Total Duration: 4 hours*
*Difficulty Level: Beginner to Intermediate*
*Prerequisites: Basic JavaScript and HTML/CSS knowledge*