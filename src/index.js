import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  AuthProvider,
  CartProvider,
  ProductsProvider,
  ThemeProvider,
} from "./context";
import { products } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ProductsProvider products={products}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
