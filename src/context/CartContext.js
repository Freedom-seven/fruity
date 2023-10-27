import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useCallback,
} from "react";

const CartContext = createContext();
const CartDispatchContext = createContext();

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const REMOVE_ALL_ITEMS = "REMOVE_ALL_ITEMS";

export function CartProvider({ children }) {
  const [userCart, setUserCart] = useState([]);

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
          return updatedCart;
        } else {
          const updatedCart = [...state, { product, quantity }];
          return updatedCart;
        }

      case REMOVE_FROM_CART:
        const productId = action.payload;
        return state.filter((item) => item.product.id !== productId);

      case UPDATE_QUANTITY:
        const { productId: id, newQuantity } = action.payload;
        return state.map((item) => {
          if (item.product.id === id) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });

      case REMOVE_ALL_ITEMS:
        return [];

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, userCart);

  const updateUserCart = useCallback(() => {}, []);

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
