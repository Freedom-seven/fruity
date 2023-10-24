import React from "react";
import { useCartDispatch, useTheme } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import "../../styles/CartItems.css";

function CartList({ item }) {
  const { id, name, price, image } = item.product;
  const { quantity } = item;
  const itemPrice = price * quantity;
  const dispatch = useCartDispatch();
  const { isDarkMode } = useTheme();

  const handleRemoveItem = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the outer div
    dispatch({ type: "REMOVE_FROM_CART", payload: item.product.id });
  };

  return (
    <li
      key={id}
      className={`cart-item ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="cart-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="cart-item-details">
        <p className="cart-item-name">{name}</p>
        <div>
          <p className="cart-item-price">
            ${price} Qty: {quantity}
          </p>
          <p className="cart-item-total">${itemPrice.toFixed(2)}</p>
        </div>
        <button
          className={`remove-item-button ${
            isDarkMode ? "dark-mode-button" : "light-mode-button"
          }`}
          onClick={handleRemoveItem}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </li>
  );
}

export default CartList;
