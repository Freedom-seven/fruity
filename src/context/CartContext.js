import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useReducer,
} from "react";

// Create the CartContext
const CartContext = createContext();
const CartDispatchContext = createContext();

// Create actions for managing the cart
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const REMOVE_ALL_ITEMS = "REMOVE_ALL_ITEMS";

// Create the CartProvider component
export function CartProvider({ children }) {
  // Load the cart from localStorage or initialize an empty cart
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Function to update cart state and localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Reducer function to manage cart actions
  const cartReducer = (state, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const { product, quantity } = action.payload;
        const existingProductIndex = state.findIndex(
          (item) => item.product.id === product.id
        );

        if (existingProductIndex !== -1) {
          const updatedCart = [...state];
          updatedCart[existingProductIndex].quantity += quantity;
          updateCart(updatedCart); // Update cart state
          return updatedCart;
        } else {
          const updatedCart = [...state, { product, quantity }];
          updateCart(updatedCart); // Update cart state
          return updatedCart;
        }

      case REMOVE_FROM_CART:
        const productId = action.payload;
        const updatedCart = state.filter(
          (item) => item.product.id !== productId
        );
        updateCart(updatedCart); // Update cart state
        return updatedCart;

      case UPDATE_QUANTITY:
        const { productId: id, newQuantity } = action.payload;
        const updatedCartQuantity = state.map((item) => {
          if (item.product.id === id) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        updateCart(updatedCartQuantity); // Update cart state
        return updatedCartQuantity;

      case REMOVE_ALL_ITEMS:
        const emptyCart = [];
        updateCart(emptyCart); // Update cart state
        return emptyCart;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, cart);

  // Clear the cart in localStorage when the cart state is cleared
  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product, quantity) => {
    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (productId, newQuantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { productId, newQuantity } });
  };

  // Function to remove all items from the cart
  const removeAllItems = () => {
    dispatch({ type: REMOVE_ALL_ITEMS });
  };

  return (
    <CartContext.Provider value={{ cart: state }}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

// Create a custom hook for using the CartContext
export function useCart() {
  return useContext(CartContext);
}

// Create a custom hook for using cart dispatch
export function useCartDispatch() {
  return useContext(CartDispatchContext);
}
