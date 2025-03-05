import React, { useState } from "react";
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
import { useMediaQuery, useTheme } from "@mui/material";

const FormRegistroUsuario = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    terms: false,
  });

  const imagenFondo = "/imagen_20.png"; // Correct way to reference public files
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/auth/registro",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: form.nombre,
              apellido: form.apellido,
              email: form.email,
              password: form.password,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error en el registro");
        }

        const data = await response.json();
        console.log("Registro exitoso:", data);

        alert("Registro exitoso");

        setForm({
          nombre: "",
          apellido: "",
          email: "",
          password: "",
          terms: false,
        });
        setErrors({});
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Hubo un problema con el registro. Inténtalo de nuevo.");
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
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          height: "100vh",
          width: "50%",
          padding: "0",
          margin: "0",
          paddingLeft: "5%",
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
              slotProps={{ inputLabel: { shrink: true } }}
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
              name="password"
              value={form.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
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
        xs={12}
        md={6}
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
    </Grid>
  );
};

export default FormRegistroUsuario;
