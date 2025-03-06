import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Link, 
  AppBar, 
  Toolbar, 
  IconButton, 
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    contrasena: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      
      // Store token and user info in localStorage or context
      login(response.data.token, {
        id: response.data.id,
        nombre: response.data.nombre,
        email: response.data.email,
        iniciales: response.data.iniciales,
        rol: response.data.rol
      });
      
      // Redirect to dashboard or home page
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError('Datos inválidos. Por favor verifique su información.');
            break;
          case 401:
            setError('Credenciales inválidas. Por favor verifique su email y contraseña.');
            break;
          case 404:
            setError('Usuario no encontrado.');
            break;
          default:
            setError('Ha ocurrido un error. Por favor intente nuevamente.');
        }
      } else {
        setError('Error de conexión. Por favor verifique su conexión a internet.');
      }
      
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {/* Login Form */}
      <Container component="main" maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 0.5 }}>
            Inicia sesión
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
              ¿No tienes cuenta?
            </Typography>
            <Link href="/registro" variant="body2" color="primary">
              Crear cuenta
            </Link>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contrasena"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.contrasena}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 2, 
                mb: 2, 
                py: 1.5,
                backgroundColor: '#6200EE',
                '&:hover': {
                  backgroundColor: '#3700B3',
                },
                textTransform: 'uppercase'
              }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Error Snackbar */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
);
};

export default LoginForm;