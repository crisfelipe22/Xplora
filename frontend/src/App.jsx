import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"; // Página principal
import Admin from "./components/AddProductForm"; // Página principal

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App
