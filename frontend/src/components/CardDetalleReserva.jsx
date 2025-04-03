/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { React, useState } from "react";
import {
  Typography,
  Card,
  Button,
  Box,
  IconButton,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/CardDetalleReserva.module.css";

const CardDetalleReserva = ({
  product,
  fecha_inicio,
  fecha_fin,
  confirmarReserva,
  open,
  onClose,
  dialogContent,
  isLoading,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const imagenArray = product.imagen
    ? product.imagen.split(",").map((url) => url.trim())
    : [];

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Box
      sx={{
        pl: { mobile: 1, tablet: 2, desktop: 4 },
        pr: { mobile: 1, tablet: 2, desktop: 60 },
      }}
    >
      <Box className={styles.tituloVolver}>
        <IconButton
          component={RouterLink}
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h3" className={styles.title}>
          Detalles experiencia
        </Typography>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" className={styles.productTitle}>
            {product.nombre}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { mobile: "column", tablet: "row" },
            }}
          >
            <img
              src={imagenArray[0]}
              alt={product.nombre}
              className={styles.productImage}
            />

            <Typography
              sx={{
                typography: { mobile: "body2", tablet: "body1" },
                color: "#5C5B5E",
                flex: 1,
                textAlign: "justify",
              }}
            >
              {product.descripcion}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box className={styles.infoSection}>
        <Typography
          gutterBottom
          sx={{
            typography: { mobile: "body1", tablet: "h6" },
            fontWeight: { mobile: "bold" },
          }}
        >
          Datos usuario
        </Typography>
        <Typography
          gutterBottom
          sx={{
            typography: { mobile: "body2", tablet: "body1", color: "#5C5B5E" },
          }}
        >
          {user.nombre}
        </Typography>
        <Typography
          sx={{
            typography: { mobile: "body2", tablet: "body1", color: "#5C5B5E" },
          }}
        >
          {user.email}
        </Typography>
      </Box>

      <Box className={styles.infoSection}>
        <Typography
          gutterBottom
          sx={{
            typography: { mobile: "body1", tablet: "h6" },
            fontWeight: { mobile: "bold" },
          }}
        >
          Datos reserva experiencia
        </Typography>
        <Typography
          sx={{
            typography: { mobile: "body2", tablet: "body1", color: "#5C5B5E" },
          }}
        >
          {formatearFecha(fecha_inicio)} --- {formatearFecha(fecha_fin)}
        </Typography>
        <Box className={styles.totalSection}>
          <Typography
            sx={{
              typography: { mobile: "body1", tablet: "h6" },
              fontWeight: { mobile: "bold" },
            }}
          >
            Total a pagar
          </Typography>
          <Typography variant="h6">${product.precio}</Typography>
        </Box>

        <Button
          sx={{ width: { mobile: "100%", tablet: "50%" } }}
          variant="contained"
          color="primary"
          onClick={confirmarReserva}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              PROCESANDO...
            </>
          ) : (
            "CONFIRMAR RESERVA"
          )}
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={onClose}
        className={styles.dialogContent}
        maxWidth={false}
        PaperProps={{
          className: styles.dialogContent,
        }}
      >
        <DialogTitle className={styles.tituloDialogo}>
          {dialogContent.title}{" "}
        </DialogTitle>
        <DialogContent>
          <Typography className={styles.contenidoDialogo}>
            {dialogContent.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={dialogContent.onButtonClick}
            color="primary"
            variant="contained"
            className={styles.botonVerReservas}
          >
            {dialogContent.buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CardDetalleReserva;
