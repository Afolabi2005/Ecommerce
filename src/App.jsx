import { useState } from "react";
import "./App.css";
import Home from "./components/Home Page/Home";
import { Route, Routes } from "react-router-dom";
import Shop_Home from "./components/Shop Page/Shop_Home";
import ProductDetail from "./components/Shop Page/ProductDetail";
import Cart from "./components/Home Page/Cart";
import Address from "./components/Shop Page/Address";
import Shipping from "./components/Shop Page/Shipping";
import Payment from "./components/Shop Page/Payment";
import Stories from "./components/Home Page/Stories";
import About from "./components/Home Page/About";

function App() {
  return (
    <div className="public-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop_Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/checkout" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
