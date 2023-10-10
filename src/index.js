import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { CartProvider, ProductsProvider, ThemeProvider } from "./context"; // Assuming ProductsProvider and ThemeProvider are not causing circular imports.

import { products } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <ProductsProvider products={products}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ProductsProvider>
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
