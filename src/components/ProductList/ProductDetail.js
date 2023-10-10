import React from "react";
import { useParams } from "react-router-dom";
import { useProducts, useTheme } from "../../context";
import "../../styles/ProductDetail.css";

function ProductDetail() {
  const { productId } = useParams();
  const products = useProducts();
  const { isDarkMode } = useTheme(); // Access the dark mode state

  // Check if the products array is defined and not empty
  if (!products || products.length === 0) {
    console.log("Products array is empty or undefined.");
    return <div>Product not found</div>;
  }

  // Find the product by ID
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    // Handle product not found
    console.log(`Product with ID ${productId} not found.`);
    console.log("Products:", products);
    return <div>Product not found</div>;
  }

  console.log("Product:", product); // Log the product details for debugging

  return (
    <div
      className={`product-detail-container ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-details">
        <h2
          className={`product-name ${
            isDarkMode ? "dark-mode-text" : "light-mode-text"
          }`}
        >
          {product.name}
        </h2>
        <p
          className={`product-price ${
            isDarkMode ? "dark-mode-text" : "light-mode-text"
          }`}
        >
          ${product.price}
        </p>
        <p
          className={`product-description ${
            isDarkMode ? "dark-mode-text" : "light-mode-text"
          }`}
        >
          {product.description}
        </p>

        {/* Product Variations */}
        {product.variations && (
          <div
            className={`product-variations ${
              isDarkMode ? "dark-mode-text" : "light-mode-text"
            }`}
          >
            <h3>Variations:</h3>
            <ul>
              {product.variations.map((variation) => (
                <li key={variation.id}>{variation.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          className={`add-to-cart-button ${
            isDarkMode ? "dark-mode-button" : "light-mode-button"
          }`}
        >
          Add to Cart
        </button>
      </div>

      {/* Product Reviews */}
      <div
        className={`product-reviews ${
          isDarkMode ? "dark-mode-text" : "light-mode-text"
        }`}
      >
        <h3>Product Reviews</h3>
        {/* Display user reviews and ratings here */}
        {/* Provide a form for users to leave reviews */}
      </div>

      {/* Related Products */}
      <div
        className={`related-products ${
          isDarkMode ? "dark-mode-text" : "light-mode-text"
        }`}
      >
        <h3>Related Products</h3>
        {/* Display related products here */}
      </div>

      {/* Additional Information */}
      <div
        className={`additional-info ${
          isDarkMode ? "dark-mode-text" : "light-mode-text"
        }`}
      >
        <h3>Additional Information</h3>
        <ul>
          <li>Category: {product.category}</li>
          <li>Weight: {product.weight} grams</li>
          {/* Add more product details here */}
        </ul>
      </div>
    </div>
  );
}

export default ProductDetail;
