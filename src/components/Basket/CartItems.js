import React from "react";
import { useCart, useCartDispatch } from "../../context";
import "../../styles/CartItems.css";

function CartItem({ item }) {
  const { id, name, price, image } = item.product;
  const { quantity } = item;
  const itemPrice = price * quantity;
  const dispatch = useCartDispatch();

  const handleRemoveItem = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item.product.id });
  };

  return (
    <li key={id} className="cart-item">
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
        <button className="remove-item-button" onClick={handleRemoveItem}>
          Remove
        </button>
      </div>
    </li>
  );
}

function CartItems() {
  const { cart } = useCart();
  const dispatch = useCartDispatch();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
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

  return (
    <div className="cart-container with-background-blur">
      <button className="remove-all-button" onClick={handleRemoveAllItems}>
        Remove All
      </button>
      <div className="cart-items-wrapper">
        <ul className="cart-items-list">
          {cart.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </ul>
      </div>
      <div className="cart-summary">
        <button className="checkout-button">
          Check Out ${totalPrice.toFixed(2)}
        </button>
      </div>
    </div>
  );
}

export default CartItems;
