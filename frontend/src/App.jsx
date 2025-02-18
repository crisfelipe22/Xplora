// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home"; 
import Admin from "./pages/Admin"; 
import CssBaseline from '@mui/material/CssBaseline';
import './App.css'
import { Route, Routes } from "react-router-dom";
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';


function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/productos" element={<Products />} />
        <Route path="/admin/productos/nuevo-producto" element={<AddProduct />} />
      </Routes>
      <Footer />
        
    </>
  );
}

export default App
