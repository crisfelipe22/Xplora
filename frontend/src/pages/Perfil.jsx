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
  useMediaQuery
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AuthContext } from '../contexts/AuthContext'; // Ajusta esta ruta

const obtenerRolTexto = (idRol) => {
  switch(idRol) {
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

const obtenerUsuarioPorId = async (id) => {
  try {
    const respuesta = await axios.get(`api/auth/${id}`);
    console.log(respuesta.data)
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error; // Re-lanzamos el error para que pueda ser manejado por quien llama a la función
  }
};

const PerfilUsuario = () => {
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down('tablet'));
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [user.id]);

  if (loading) return <p>Cargando información...</p>;
  if (error) return <p>Error al cargar los datos del usuario</p>;
  if (!currentUser) return <p>No se encontró información del usuario</p>;
  
  const infoItems = [
    { 
      icon: <PersonIcon />, 
      label: "Nombre", 
      value: currentUser.nombre 
    },
    { 
      icon: <EmailIcon />, 
      label: "Correo Electrónico", 
      value: currentUser.email 
    },
    { 
      icon: <HomeIcon />, 
      label: "Dirección", 
      value: currentUser.direccion 
    },
    { 
      icon: <PhoneIcon />, 
      label: "Teléfono", 
      value: currentUser.telefono 
    },
    { 
      icon: <AdminPanelSettingsIcon />, 
      label: "Rol", 
      value: obtenerRolTexto(currentUser.id_rol) 
    },
  ];

  // Obtener las iniciales del nombre para el avatar
  const obtenerIniciales = (nombre) => {
    if (!nombre) return "U";
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
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
            Mi Perfil
          </Typography>
        </Box>

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
      </Paper>
    </Container>
  );
};

export default PerfilUsuario;