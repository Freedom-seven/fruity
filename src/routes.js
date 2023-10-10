import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login, ProductDetail, Signup } from "./components";

function NavigationRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        {/* <Route path="/products" element={<ProductList />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default NavigationRoute;
