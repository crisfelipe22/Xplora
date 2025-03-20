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
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import styles from "../styles/ProductoAleatorio.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../contexts/FavoritesContext";

const CardProductoAleatorio = ({ product, categorias }) => {
  const imagenArray = product.imagen
    ? product.imagen.split(",").map((url) => url.trim())
    : [];
  const imagenUrl =
    imagenArray.length > 0 ? imagenArray[0] : "https://via.placeholder.com/300";
  //suponiendo raiting por ahora
  function stringToNumber(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // Simple hash function
    }
    return hash % 3; // Maps to 0, 1, or 2
  }
  const rating = stringToNumber(product.nombre) + 3;

  // Estado para manejar favoritos (usamos localStorage para persistencia)
  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite } = useFavorites(); // <-- Obtenemos funciones del contexto
  const isFavorite = favorites.includes(product.id_paquete_experiencia);

  const toggleFavoriteHandler = (e) => {
    e.preventDefault(); // Evitar que se active el Link al hacer clic en el corazón


    if (!isAuthenticated) {
      alert("Debes iniciar sesión para agregar favoritos.");
      return;
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
            value={rating}
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
        </CardContent>
      </Link>
    </Card>
  );
};

export default CardProductoAleatorio;