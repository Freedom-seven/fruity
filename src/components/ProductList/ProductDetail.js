import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useProducts, useTheme, useCart, useCartDispatch } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/ProductDetail.css";
import { Footer, Header, ProductCard } from "..";

function ProductDetail() {
  const { productId } = useParams();
  const products = useProducts();
  const { isDarkMode } = useTheme();
  const cartContext = useCart();
  const cartDispatch = useCartDispatch();

  const [isAddedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState(null);

  const checkIfInCart = useCallback(() => {
    return (
      product && cartContext.cart.some((item) => item.product.id === product.id)
    );
  }, [cartContext.cart, product]);

  useEffect(() => {
    const currentProduct = products.find((p) => p.id === parseInt(productId));

    if (!currentProduct) {
      console.log(`Product with ID ${productId} not found.`);
      console.log("Products:", products);
      return;
    }

    setProduct(currentProduct);

    const isInCart = checkIfInCart();
    setAddedToCart(isInCart);

    if (isInCart) {
      const cartItem = cartContext.cart.find(
        (item) => item.product.id === currentProduct.id
      );
      setQuantity(cartItem.quantity);
    }
  }, [productId, products, checkIfInCart, cartContext.cart]);

  if (product === null) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!product) {
    return <div className="not-found-message">Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      cartDispatch({ type: "ADD_TO_CART", payload: { product, quantity: 1 } });
      setAddedToCart(true);
      setQuantity(1);
    } else {
      setAddedToCart(false);
      setQuantity(0);
      cartDispatch({ type: "REMOVE_FROM_CART", payload: product.id });
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    if (isAddedToCart) {
      if (newQuantity === 0) {
        cartDispatch({ type: "REMOVE_FROM_CART", payload: product.id });
      } else {
        cartDispatch({
          type: "UPDATE_QUANTITY",
          payload: { productId: product.id, newQuantity },
        });
      }
    }
  };

  const relatedProducts = products
    .filter(
      (relatedProduct) =>
        relatedProduct.category === product.category &&
        relatedProduct.id !== product.id
    )
    .filter(
      (relatedProduct) =>
        !cartContext.cart.some((item) => item.product.id === relatedProduct.id)
    );

  return (
    <div className="product-detail">
      <Header />
      <div
        className={`product-detail-container ${
          isDarkMode ? "dark-mode" : "light-mode"
        }`}
      >
        <div className="product-image-container">
          <div className="image-container">
            <img
              src={product.image}
              alt={product.name}
              className="search-image"
            />
          </div>
        </div>
        <div
          className={`product-details ${
            isDarkMode ? "dark-mode" : "light-mode"
          }`}
        >
          <h2
            className={`product-names ${
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
          {product.description && (
            <p
              className={`product-description ${
                isDarkMode ? "dark-mode-text" : "light-mode-text"
              }`}
            >
              {product.description}
            </p>
          )}

          {product.variations && product.variations.length > 0 && (
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

          {product.weight && (
            <p
              className={`product-description ${
                isDarkMode ? "dark-mode-text" : "light-mode-text"
              }`}
            >
              Weight: {product.weight} grams
            </p>
          )}

          {quantity > 0 && (
            <div className="quantity-selector">
              <button
                className="quantity-button"
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                    cartDispatch({
                      type: "UPDATE_QUANTITY",
                      payload: {
                        productId: product.id,
                        newQuantity: quantity - 1,
                      },
                    });
                  }
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button
                className="quantity-button"
                onClick={() => {
                  setQuantity(quantity + 1);
                  cartDispatch({
                    type: "UPDATE_QUANTITY",
                    payload: {
                      productId: product.id,
                      newQuantity: quantity + 1,
                    },
                  });
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            className={`add-to-cart-button ${isAddedToCart ? "added" : ""}`}
          >
            {isAddedToCart ? (
              <span>
                <FontAwesomeIcon icon={faMinus} /> Remove from Cart
              </span>
            ) : (
              <span>
                <FontAwesomeIcon icon={faPlus} /> Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="related-products">
        <h2>Related Products</h2>
        <div className="related-products-container">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetail;
