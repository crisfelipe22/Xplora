/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "../styles/FormRegistroUsuario.css";
import {
  Grid,
  Alert,
  Snackbar,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

const FormRegistroUsuario = () => {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    email: "",
    contrasena: "",
    terms: false,
    telefono: 123456,
    id_rol: 3,
  });

  const imagenFondo = "/imagen_20.png"; // Correct way to reference public files
   const [openAlertExito, setOpenAlertExito] = useState(false);
   let navigate = useNavigate();
   const handleCloseAlertExito = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenAlertExito(false);
  };

  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("desktop"));

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (!/^[A-Za-z ]+$/.test(form.nombre)) {
      newErrors.nombre = "Solo se permiten letras";
    }

    if (!form.direccion.trim()) {
      newErrors.direccion = "La dirección es obligatoria";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Correo inválido";
    }

    if (!form.contrasena.trim()) {
      newErrors.contrasena = "La contraseña es obligatoria";
    } else if (form.contrasena.length < 6) {
      newErrors.contrasena = "Mínimo 6 caracteres";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(form.contrasena)) {
      newErrors.contrasena = "Debe contener al menos una letra y un número";
    }

    if (!form.terms) {
      newErrors.terms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      nombre: form.nombre,
      direccion: form.direccion,
      email: form.email,
      contrasena: form.contrasena,
      telefono: 123456,
      id_rol: 3,
    };
    
    if (validate()) {
      try {
        const response = await axios.post(
          "/api/auth/registro",
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Usuario registrado:", dataToSend);
        setOpenAlertExito(true);
        setTimeout(() => {
          setOpenAlertExito(false)
          navigate("/login")
        }, 3000);;

        setForm({
          nombre: "",
          direccion: "",
          email: "",
          contrasena: "",
          terms: false,
        });
        setErrors({});
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert(
          "Hubo un problema con el registro: " +
            ((Object.values(error.response?.data)[0]) || "Error desconocido")
        );
      }
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        display: "flex",
        backgroundColor: "#FAF9FF",
        overflow: "hidden",
      }}
    >
      <Grid
        item
        className="formulario-grid"
        sx={{
          display: "flex",
          //justifyContent: "left",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: {mobile: "100%", tablet: "75%", desktop: "50%"},
          padding: { mobile: "0", tablet: "5%" },

          margin: "0",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "550px",
            p: 4,
            borderRadius: 2,
            backgroundColor: "transparent",
            boxShadow: 0,
            margin: 0,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Regístrate
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Si ya tienes una cuenta en Xplora, puedes{" "}
            <Link href="#" underline="hover">
              iniciar sesión
            </Link>
          </Typography>

          <Box sx={{ borderBottom: "1px solid #E0E0E0", my: 2 }} />

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              error={Boolean(errors.nombre)}
              helperText={errors.nombre}
              margin="normal"
              variant="outlined"
              placeholder="Ingresa tu nombre"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              fullWidth
              label="Dirección"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              error={Boolean(errors.direccion)}
              helperText={errors.direccion}
              margin="normal"
              variant="outlined"
              placeholder="Ingresa tu dirección"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              margin="normal"
              variant="outlined"
              placeholder="micorreo@gmail.com"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              error={Boolean(errors.contrasena)}
              helperText={errors.contrasena}
              margin="normal"
              variant="outlined"
              placeholder="*************"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                />
              }
              label="Acepto los Términos y Condiciones"
            />
            {errors.terms && (
              <Typography color="error" variant="caption">
                {errors.terms}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, fontWeight: "bold" }}
              type="submit"
            >
              CREAR CUENTA
            </Button>
          </form>
        </Box>
      </Grid>

      <Grid
        item
        sx={{
          display: isMobileOrTablet ? "none" : "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          className="mi-imagen"
          component="img"
          src={imagenFondo}
          alt="Registro"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            //display: "block",
          }}
        />
      </Grid>

      <Snackbar
        open={openAlertExito}
        autoHideDuration={3000}
        onClose={handleCloseAlertExito}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlertExito} severity="success" 
        sx={{
          marginTop: '85px',
          fontSize: '16px',
          }}>
          ¡Usuario registrado con éxito!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default FormRegistroUsuario;
