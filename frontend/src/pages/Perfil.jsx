import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AuthContext } from '../contexts/AuthContext'; 
import ListaFavoritos from "../components/ListaFavoritos";
import InformacionUsuario from "../components/InformacionUsuario";

const obtenerRolTexto = (idRol) => {
  switch (idRol) {
    case 1:
      return "Super Administrador";
    case 2:
      return "Administrador";
    case 3:
      return "Usuario";
    default:
      return "Rol Desconocido";
  }
};

const PerfilUsuario = () => {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Función para cargar favoritos desde localStorage
  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  };

  // Cargar favoritos al montar el componente
  useEffect(() => {
    loadFavorites();

    // Escuchar cambios en localStorage
    const handleStorageChange = (event) => {
      if (event.key === "favorites") {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Eliminar un producto de favoritos
  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter((product) => product?.id_paquete_experiencia !== product?.id_paquete_experiencia);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    if (!user || !user.id) {
      setError(new Error("Usuario no definido o sin ID"));
      setLoading(false);
      return;
    }

    const obtenerUsuarioPorId = async (id) => {
      try {
        const respuesta = await axios.get(`/api/auth/${id}`);
        return respuesta.data;
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        throw error; // Re-lanzamos el error para que pueda ser manejado por quien llama a la función
      }
    };

    const fetchUser = async () => {
      try {
        const userData = await obtenerUsuarioPorId(user.id);
        setCurrentUser(userData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Cargando información...</p>;
  if (error) return <p>Error al cargar los datos del usuario</p>;
  if (!currentUser) return <p>No se encontró información del usuario</p>;

  // Obtener las iniciales del nombre para el avatar
  const obtenerIniciales = (nombre) => {
    if (!nombre) return "U";
    return nombre
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ marginTop: "113px", mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: { mobile: 2, tablet: 4 },
            borderRadius: 2,
            overflow: "hidden",
            height: "calc(100vh - 80px)",
          }}
        >
          <Box
            sx={{
              p: 2,
            }}
          >
            <Typography
              sx={{ typography: { mobile: "h5", tablet: "h4", desktop: "h4" } }}
            >
              Mi Cuenta
            </Typography>
          </Box>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <Tabs
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              value={tabValue}
              onChange={handleTabChange}
              aria-label="account tabs"
            >
              <Tab icon={<AccountCircleIcon />} label="PERFIL" />
              <Tab icon={<FavoriteIcon />} label="LISTA DE FAVORITOS" />
            </Tabs>
            {tabValue === 0 && (
              <InformacionUsuario
                currentUser={currentUser}
                obtenerIniciales={obtenerIniciales}
                obtenerRolTexto={obtenerRolTexto}
              />
            )}
            {tabValue === 1 && (
              <Box p={3}>
                {favorites.length === 0 ? (
                  <Typography>
                    No tienes productos en tu lista de favoritos.
                  </Typography>
                ) : (
                  <Box>
                    <ListaFavoritos />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default PerfilUsuario;
