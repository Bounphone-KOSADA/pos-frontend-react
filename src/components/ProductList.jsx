// src/components/ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { useState } from "react";

function ProductList({ onAddToCart }) {
  // Sample data for now
  // src/components/ProductList.jsx - Add image paths
  const allProducts = [
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
      stock: 30,
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
  ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const handleSearch = (searchTerm) => {
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h2>Products</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="no-products">No products found</p>
      )}
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  padding: "20px 0",
};

export default ProductList;
