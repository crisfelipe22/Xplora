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
import Caracteristicas from "./pages/Caracteristicas";
import AddProduct from "./pages/AddProduct";
import DetalleProducto from "./pages/DetalleProducto";
import EditarProductoAdmin from "./pages/EditarProductoAdmin";
import AdminUsers from "./pages/AdminUsers";
import ResultadoBusqueda from './pages/ResultadoBusqueda';
import Categoria from './pages/AdminCategoria';
import Reserva from './pages/Reserva';
import RegistroExitoso from './pages/RegistroExitoso';

function App() {
  const location = useLocation();
  const esRutaAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <AuthProvider>
      <FavoritesProvider>
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
        <Route path="/admin/categoria" element={<ProtectedRoute  requiredRoles={['ROLE_Administrador', 'ROLE_SuperAdministrador']} ><Categoria /></ProtectedRoute>} />
        <Route path="/admin/caracteristicas" element={<ProtectedRoute  requiredRoles={['ROLE_Administrador', 'ROLE_SuperAdministrador']} ><Caracteristicas /></ProtectedRoute>} />
        <Route
          path="/detalle-producto/:id_paquete_experiencia"
          element={<DetalleProducto />}
        />
        <Route path="/registro" element={<Registro />} />
        <Route path="/registro-exitoso" element={<RegistroExitoso />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" 
          element={<ProtectedRoute  ><Perfil /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/resultados" element={<ResultadoBusqueda />} />
        <Route
          path="/reserva/:id_paquete_experiencia"
          element={<ProtectedRoute> <Reserva /> </ProtectedRoute>}
        />
      </Routes>
      {!esRutaAdmin && <Footer />}
      </IconProvider>
      </FavoritesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
