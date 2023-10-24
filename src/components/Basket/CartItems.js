import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart, useCartDispatch } from "../../context";
import { useAuth } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import { CartList } from "..";
import "../../styles/CartItems.css";

function CartItems() {
  const { cart } = useCart();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Use isAuthenticated from the AuthContext

  if (cart.length === 0) {
    return (
      <div className="cart-empty" onClick={(e) => e.stopPropagation()}>
        <p>Your basket is empty. Start shopping now!</p>
      </div>
    );
  }

  const totalPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handleRemoveAllItems = () => {
    dispatch({ type: "REMOVE_ALL_ITEMS" });
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="cart-container with-background-blur"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="remove-all-button" onClick={handleRemoveAllItems}>
        <FontAwesomeIcon icon={faTrashCan} /> Delete All
      </button>
      <div className="cart-items-wrapper">
        <ul className="cart-items-list">
          {cart.map((item) => (
            <CartList key={item.product.id} item={item} />
          ))}
        </ul>
      </div>
      <div className="cart-summary">
        <button onClick={handleCheckout} className="checkout-button">
          Check Out ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

export default CartItems;
