//import { Route, Routes } from "react-router-dom";
import './App.css'
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"; 
import Admin from './pages/Admin';
import Products from './pages/Products';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/productos" element={<Products />} />
      </Routes>
    </>
  );
}

export default App
