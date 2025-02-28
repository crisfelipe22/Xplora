import React, { useState } from "react";
import imagenFondo from "/frontend/public/imagen_20.png";
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Link,
} from "@mui/material";

const FormRegistroUsuario = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (!/^[A-Za-z ]+$/.test(form.nombre)) {
      newErrors.nombre = "Solo se permiten letras";
    }

    if (!form.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    } else if (!/^[A-Za-z ]+$/.test(form.apellido)) {
      newErrors.apellido = "Solo se permiten letras";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Correo inválido";
    }

    if (!form.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulario enviado:", form);
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        backgroundColor: "#FAF9FF",
        overflow: "hidden",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: 400,
            p: 4,
            borderRadius: 2,
            backgroundColor: "background.paper",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Regístrate
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Si ya tienes una cuenta en Xplora, puedes{" "}
            <Link href="#" color="primary" underline="hover">
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
            />

            <TextField
              fullWidth
              label="Apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              error={Boolean(errors.apellido)}
              helperText={errors.apellido}
              margin="normal"
              variant="outlined"
              placeholder="Ingresa tu apellido"
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
            />

            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              margin="normal"
              variant="outlined"
              placeholder="*************"
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
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <img
          src={imagenFondo}
          alt="Registro"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FormRegistroUsuario;
