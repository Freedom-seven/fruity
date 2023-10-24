import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { useAuth } from ".";

const CartContext = createContext();
const CartDispatchContext = createContext();

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const REMOVE_ALL_ITEMS = "REMOVE_ALL_ITEMS";

export function CartProvider({ children }) {
  const { isAuthenticated, user } = useAuth();

  // Determine the storage key based on the user's authentication status
  const storageKey = isAuthenticated
    ? `cart_${user.id}`
    : "cart_unauthenticated";

  // Load the user's cart from localStorage or initialize an empty cart
  const [userCart, setUserCart] = useState(() => {
    const cartData = localStorage.getItem(storageKey);
    return cartData ? JSON.parse(cartData) : [];
  });

  const updateUserCart = useCallback(
    (newCart) => {
      setUserCart(newCart);
      localStorage.setItem(storageKey, JSON.stringify(newCart));
    },
    [storageKey]
  );

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
          updateUserCart(updatedCart);
          return updatedCart;
        } else {
          const updatedCart = [...state, { product, quantity }];
          updateUserCart(updatedCart);
          return updatedCart;
        }

      case REMOVE_FROM_CART:
        const productId = action.payload;
        const updatedCart = state.filter(
          (item) => item.product.id !== productId
        );
        updateUserCart(updatedCart);
        return updatedCart;

      case UPDATE_QUANTITY:
        const { productId: id, newQuantity } = action.payload;
        const updatedCartQuantity = state.map((item) => {
          if (item.product.id === id) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        updateUserCart(updatedCartQuantity);
        return updatedCartQuantity;

      case REMOVE_ALL_ITEMS:
        const emptyCart = [];
        updateUserCart(emptyCart);
        return emptyCart;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, userCart);

  useEffect(() => {
    if (userCart.length === 0 && user && isAuthenticated) {
      localStorage.removeItem(storageKey);
    }
  }, [userCart, user, isAuthenticated, storageKey]);

  // const addToCart = (product, quantity) => {
  //   if (!isAuthenticated) {
  //     return;
  //   }
  //   dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
  // };

  // const removeFromCart = (productId) => {
  //   if (!isAuthenticated) {
  //     return;
  //   }
  //   dispatch({ type: REMOVE_FROM_CART, payload: productId });
  // };

  // const updateQuantity = (productId, newQuantity) => {
  //   if (!isAuthenticated) {
  //     return;
  //   }
  //   dispatch({ type: UPDATE_QUANTITY, payload: { productId, newQuantity } });
  // };

  // const removeAllItems = () => {
  //   if (!isAuthenticated) {
  //     return;
  //   }
  //   dispatch({ type: REMOVE_ALL_ITEMS });
  // };

  return (
    <CartContext.Provider value={{ cart: state }}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}
