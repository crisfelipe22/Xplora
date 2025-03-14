import React from 'react';
import { 
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const AccesoNoAutorizado = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderTop: `4px solid ${theme.palette.error.main}`,
            width: '100%',
            maxWidth: 600,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          
          <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
            Acceso Denegado
          </Typography>
          
          <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
            No tienes permisos para acceder a esta sección. Esta área está reservada para usuarios con rol de administrador.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate('/')}
              sx={{ minWidth: 150 }}
            >
              Ir al inicio
            </Button>
            
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={() => navigate(-1)}
              sx={{ minWidth: 150 }}
            >
              Volver atrás
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AccesoNoAutorizado;