import React, { createContext, useContext } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children, products }) {
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
