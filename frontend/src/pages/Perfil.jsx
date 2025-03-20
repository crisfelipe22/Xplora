import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Avatar, 
  Divider, 
  Card, 
  CardContent,
  useTheme,
  useMediaQuery, 
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AuthContext } from '../contexts/AuthContext'; 

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
    setTabValue(newValue)};

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
  const handleAddFavorite = (product) => {
    if (!favorites.some((fav) => fav.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  // Eliminar un producto de favoritos
  const removeFavorite = (productId) => {
    const updatedFavorites = favorites.filter((product) => product.id !== productId);
    setFavorites(updatedFavorites);
  };


  useEffect(() => {
    if (!user || !user.id) {
      setError(new Error("Usuario no definido o sin ID"));
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
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div>
    
    <Container maxWidth="md" sx={{ marginTop: "75px" }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { mobile: 2, tablet: 4 },
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            p: 3, 
            mb: 4, 
            borderRadius: '8px 8px 0 0',
            margin: -4,
            marginBottom: 4,
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Mi Cuenta
          </Typography>
        </Box>

        <Box sx={{ width: "100%", typography: "body1", marginTop: 5 }}>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="account tabs">
        <Tab icon={<AccountCircleIcon />} label="PERFIL" />
        <Tab icon={<FavoriteIcon />} label="LISTA DE FAVORITOS" />
      </Tabs>
      {tabValue === 0 && (

        <Box p={3}>
          <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "20px" }}>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  bgcolor: 'secondary.main',
                  fontSize: 40,
                  mb: 2
                }}
              >
                {obtenerIniciales(currentUser.nombre)}
              </Avatar>
              <Typography variant="h6" align="center" gutterBottom>
                {currentUser.nombre}
              </Typography>
              <Typography 
                variant="body2" 
                align="center" 
                sx={{ 
                  bgcolor: 'secondary.main', 
                  color: 'white', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 2 
                }}
              >
                {obtenerRolTexto(currentUser.id_rol)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Información Personal
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              {infoItems.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      mb: 1,
                      '&:hover': {
                        boxShadow: 2,
                        borderColor: 'secondary.light'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <Box sx={{ color: 'secondary.main', display: 'flex' }}>
                            {item.icon}
                          </Box>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body2" color="text.secondary">
                            {item.label}:
                          </Typography>
                          <Typography variant="body1">
                            {item.value}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        </Box>

      )}
      {tabValue === 1 && (
        <Box p={3}>
          {favorites.length === 0 ? (
            <Typography>No tienes productos en tu lista de favoritos.</Typography>
          ) : (
            favorites.map((product) => (
              <Box key={product.id} display="flex" alignItems="center" justifyContent="space-between" p={1} borderBottom="1px solid #ddd">
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

