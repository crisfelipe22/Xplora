//import { Route, Routes } from "react-router-dom";
import './App.css'
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"; 
import Admin from './pages/Admin';


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
