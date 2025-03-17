import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../contexts/AuthContext";

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

  // Cargar favoritos desde localStorage al montar el componente
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Agregar un producto a favoritos
  /* const handleAddFavorite = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  }; */

  // Eliminar un producto de favoritos
  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter(
      (product) => product.id !== productId
    );
    setFavorites(updatedFavorites);
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
              <Card
                sx={{
                  backgroundColor: "background.default",
                  mt: 2,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    px: 2.5,
                    py: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      typography: {
                        mobile: "h6",
                        tablet: "h5",
                        desktop: "h5",
                      },
                    }}
                  >
                    {currentUser.nombre}
                  </Typography>

                  <Avatar
                    sx={{
                      width: {
                        mobile: "40px",
                        tablet: "100px",
                      },
                      height: {
                        mobile: "40px",
                        tablet: "100px",
                      },
                      bgcolor: "secondary.main",
                      fontSize: {
                        tablet: "48px",
                      },
                    }}
                  >
                    {obtenerIniciales(currentUser.nombre)}
                  </Avatar>
                </Box>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    px: 2.5,
                    py: 2,
                  }}
                >
                  <Typography
                    sx={{
                      typography: { mobile: "body2", tablet: "subtitle1" },
                    }}
                  >
                    Tipo Usuario
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{
                      typography: { mobile: "body1", tablet: "h6" },
                      fontWeight: { mobile: 600 },
                      pb: 2,
                    }}
                  >
                    {obtenerRolTexto(currentUser.id_rol)}
                  </Typography>
                  <Typography
                    sx={{
                      typography: { mobile: "body2", tablet: "subtitle1" },
                    }}
                  >
                    Correo electrónico
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{
                      typography: { mobile: "body1", tablet: "h6" },
                      fontWeight: { mobile: 600 },
                    }}
                  >
                    {currentUser.email}
                  </Typography>
                </CardContent>
              </Card>
            )}
            {tabValue === 1 && (
              <Box p={3}>
                {favorites.length === 0 ? (
                  <Typography>
                    No tienes productos en tu lista de favoritos.
                  </Typography>
                ) : (
                  favorites.map((product) => (
                    <Box
                      key={product.id}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      p={1}
                      borderBottom="1px solid #ddd"
                    >
                      <Typography>{product.name}</Typography>
                      <IconButton onClick={() => removeFavorite(product.id)}>
                        <FavoriteIcon color="error" />
                      </IconButton>
                    </Box>
                  ))
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
