/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Rating,
  Chip,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import styles from "../styles/ProductoAleatorio.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";

const CardProductoAleatorio = ({ product, categorias, fechaInicio, fechaFin, mostrarFechas = false}) => {
  // console.log("Categorías recibidas:", categorias);
  // console.log("ID Categoría del producto:", product?.id_categoria);

  //mensajes
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const imagenArray = product.imagen
    ? product.imagen.split(",").map((url) => url.trim())
    : [];
  const imagenUrl =
    imagenArray.length > 0 ? imagenArray[0] : "/logo.svg";

  // Estado para manejar favoritos (usamos localStorage para persistencia)
  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite } = useFavorites(); // <-- Obtenemos funciones del contexto
  const isFavorite = favorites.includes(product.id_paquete_experiencia);

  const toggleFavoriteHandler = (e) => {
    e.preventDefault(); // Evitar que se active el Link al hacer clic en el corazón


    if (!isAuthenticated) {
      setSnackbarMessage(
        "Debes iniciar sesión para agregar favoritos."
      );
      setOpenSnackbar(true);
    }
    toggleFavorite(product.id_paquete_experiencia);
  };
  const getDescripcionCortaExperiencia = (str, char) => {
    const index = str.indexOf(char);
    if (index === -1) {
      return str;
    }
    return str.substring(0, index);
  };

  const descripcionExperiencia = product.descripcion;
  const descripcionCortaExperiencia = getDescripcionCortaExperiencia(
    descripcionExperiencia,
    "."
  );

  if (!product) {
    return null; // No renderiza nada si product es undefined
  }

  return (
    <Card className={styles.card}>
      <div className={styles.favoriteIcon}>
        <IconButton onClick={toggleFavoriteHandler} color="error">
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </div>
      <Link
        to={`/detalle-producto/${product.id_paquete_experiencia}`}
        style={{ textDecoration: "none" }}
      >
        <CardMedia
          component="img"
          image={imagenUrl || "nada"}
          alt={product.nombre}
          className={styles.imagenProducto}
        />
        <CardContent className={styles.cardContent}>
          <Rating
            value={product.puntuacion_promedio}
            precision={0.5}
            readOnly
            className={styles.rating}
          />

          <Typography variant="h6" className={styles.nombreProducto}>
            {product.nombre}
          </Typography>

          <Typography variant="body2" className={styles.descripcionProducto}>
            {descripcionCortaExperiencia + "."}
          </Typography>

          <Chip
            label={
              categorias.length > 0
                ? categorias.find(
                    (cat) => cat.id_categoria === product.id_categoria
                  )?.nombre || "Desconocido"
                : "Cargando..."
            }
            className={styles.categoriaProducto}
          />
          {/* Mostrar fechas solo si mostrarFechas es true */}
          {mostrarFechas && (
            <Typography variant="body2" color="primary" sx={{pt: 2}}>
              {`Fecha reservada: ${new Date(fechaInicio).toLocaleDateString()} - ${new Date(fechaFin).toLocaleDateString()}`}
            </Typography>
          )}
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

export default CardProductoAleatorio;