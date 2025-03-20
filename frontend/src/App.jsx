// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { IconProvider } from './contexts/IconContext';
import ProtectedRoute from './components/ProtectedRoute'
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Unauthorized from "./pages/Unauthorized";
import Perfil from "./pages/Perfil"
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import DetalleProducto from "./pages/DetalleProducto";
import EditarProductoAdmin from "./pages/EditarProductoAdmin";
import AdminUsers from "./pages/AdminUsers";
import ResultadoBusqueda from './pages/ResultadoBusqueda';


function App() {
  const location = useLocation();
  const esRutaAdmin = location.pathname.startsWith("/admin");

  const productos = [
    { id_paquete_experiencia: 1, nombre: "Spa de Lujo", descripcion: "Spa de Lujo", imagen: "/imgen_1.jpeg" },
    { id_paquete_experiencia: 2, nombre: "Paseo en kayak", descripcion: "Paseo en kayak", imagen: "/img2.jpg" },
    { id_paquete_experiencia: 3, nombre: "Noche en cabaña", descripcion: "Noche en cabaña", imagen: "/img3.jpg" },
    { id_paquete_experiencia: 4, nombre: "Parapente en la montaña", descripcion: "Parapente en la montaña", imagen: "/img4.jpg" },
    { id_paquete_experiencia: 5, nombre: "Tour de vinos premium", descripcion: "Descripción 5", imagen: "/img5.jpg" },
    { id_paquete_experiencia: 6, nombre: "Aventura en glamping", descripcion: "Aventura en glamping", imagen: "/img6.jpg" },
    { id_paquete_experiencia: 7, nombre: "Rafting en aguas blancas", descripcion: "Rafting en aguas blancas", imagen: "/img7.jpg" },
    { id_paquete_experiencia: 8, nombre: "Experiencia gastronómica fusión", descripcion: "Experiencia gastronómica fusión", imagen: "/img8.jpg" },
    { id_paquete_experiencia: 9, nombre: "Refugio alpino exclusivo", descripcion: "Refugio alpino exclusivo", imagen: "/img9.jpg" },
    { id_paquete_experiencia: 10, nombre: "Buceo en aguas cristalinas", descripcion: "Buceo en aguas cristalinas", imagen: "/img10.jpg" },
    { id_paquete_experiencia: 11, nombre: "Taller de cocina internacional", descripcion: "Taller de cocina internacional", imagen: "/img11.jpg" },
    { id_paquete_experiencia: 12, nombre: "Campamento en la nieve", descripcion: "Campamento en la nieve", imagen: "/img12.jpg" },
  ];

  return (
    <>
      <AuthProvider>
      <FavoritesProvider productos={productos}>
      <IconProvider>
      <CssBaseline />
      {!esRutaAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<ProtectedRoute  requiredRoles={['ROLE_Administrador', 'ROLE_SuperAdministrador']}><Admin /></ProtectedRoute>} />
        <Route path="/admin/productos" element={<ProtectedRoute  requiredRoles={['ROLE_Administrador', 'ROLE_SuperAdministrador']} ><Products /></ProtectedRoute>} />
        <Route
          path="/admin/productos/nuevo-producto"
          element={<ProtectedRoute  requiredRoles={['ROLE_Administrador', 'ROLE_SuperAdministrador']}><AddProduct /></ProtectedRoute>} />
        <Route path="/admin/productos/editar/:id_paquete_experiencia" element={<ProtectedRoute  requiredRoles={['ROLE_Administrador', 'ROLE_SuperAdministrador']}><EditarProductoAdmin /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute  requiredRoles={['ROLE_Administrador', 'ROLE_SuperAdministrador']}><AdminUsers /></ProtectedRoute>} />
        <Route
          path="/detalle-producto/:id_paquete_experiencia"
          element={<DetalleProducto />}
        />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" 
          element={<ProtectedRoute  ><Perfil /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/resultados" element={<ResultadoBusqueda />} />
      </Routes>
      {!esRutaAdmin && <Footer />}
      </IconProvider>
      </FavoritesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
