/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Snackbar,
  Alert
} from "@mui/material";
import styles from "../styles/ProductoAleatorio.module.css";
import { Link } from "react-router-dom";

const CardCategoriaAleatorio = ({ categoria }) => {
  // Mensajes
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const imagenArray = categoria.imagen
    ? categoria.imagen.split(",").map((url) => url.trim())
    : [];
  const imagenUrl =
    imagenArray.length > 0 ? imagenArray[0] : "/imagen_1.jpeg";

  const getDescripcionCortaExperiencia = (str, char) => {
    const index = str.indexOf(char);
    if (index === -1) {
      return str;
    }
    return str.substring(0, index);
  };

  const descripcionExperiencia = categoria.descripcion;
  const descripcionCortaExperiencia = getDescripcionCortaExperiencia(
    descripcionExperiencia,
    "."
  );

  return (
    <Card className={styles.card}>
      <Link style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          image={imagenUrl || "nada"}
          className={styles.imagenProducto}
        />
        <CardContent className={styles.cardContent}>
          <Typography variant="h6" className={styles.nombreProducto}>
            {categoria.nombre}
          </Typography>

          <Typography variant="body2" className={styles.descripcionProducto}>
            {descripcionCortaExperiencia + "."}
          </Typography>
        </CardContent>
      </Link>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        sx={{
          "&.MuiSnackbar-root": {
            top: "50%",
            transform: "translateY(-50%)",
          },
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "50%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CardCategoriaAleatorio;
