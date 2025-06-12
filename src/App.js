import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import Register from "./pages/Register";
import Brand from "./pages/Brands";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Display from "./pages/Display";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/brands" element={<Brand />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/display" element={<Display />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
