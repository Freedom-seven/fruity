import React, { useState, useEffect, useCallback } from "react";
import { useCartDispatch, useCart, useTheme } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/ProductCard.css";

function ProductCard({ product }) {
  const [isAddedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const cartContext = useCart();
  const cartDispatch = useCartDispatch();
  const { isDarkMode } = useTheme();

  const checkIfInCart = useCallback(() => {
    return cartContext.cart.some((item) => item.product.id === product.id);
  }, [cartContext.cart, product.id]);

  useEffect(() => {
    const isInCart = checkIfInCart();
    setAddedToCart(isInCart);

    if (isInCart) {
      const cartItem = cartContext.cart.find(
        (item) => item.product.id === product.id
      );
      setQuantity(cartItem.quantity);
    }
  }, [product.id, cartContext.cart, checkIfInCart]);

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

  const cardClassName = `product-card ${
    isDarkMode ? "dark-mode" : "light-mode"
  }`;
  return (
    <div className={cardClassName}>
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      {isAddedToCart ? (
        <div className="quantity-selector">
          <button
            className="quantity-button"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
                cartDispatch({
                  type: "UPDATE_QUANTITY",
                  payload: { productId: product.id, newQuantity: quantity - 1 },
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
                payload: { productId: product.id, newQuantity: quantity + 1 },
              });
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      ) : null}
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
  );
}

export default ProductCard;
