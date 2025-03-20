import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Grid2,
  Box,
} from "@mui/material";
import CardProductoAleatorio from "./CardProductoAleatorio";
import { Favorite } from "@mui/icons-material";
import styles from "../styles/ProductoAleatorio.module.css";
import { useNavigate } from "react-router-dom";

const ListaFavoritos = () => {
  let navigate = useNavigate();
  const handleXplorar = () => {
    window.scrollTo(0, 0);
    navigate("/");
  }
  const { getFavoriteProducts, favorites, toggleFavorite, categorias } =
    useFavorites();
  const alMenosUnFavorito = favorites.length > 0;
  const favoritos = getFavoriteProducts(); // Obtener los productos favoritos

  return (
    <Grid2 container spacing={3}>
      {alMenosUnFavorito ? (
        favoritos.map((producto) => (
          <Grid2
            size={{ mobile: 12, tablet: 6, desktop: 4 }}
            key={producto.id_paquete_experiencia}
          >
            <CardProductoAleatorio product={producto} categorias={categorias} />
          </Grid2>
        ))
      ) : (
        <Box sx={{margin: "auto", textAlign: "center"}} onClick={handleXplorar}>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", width: "100%", mt: 2 }}
          >
            No tienes productos en favoritos
          </Typography>
          <Button color="primary" variant="contained">
            Ir a Xplorar
          </Button>
        </Box>
      )}
    </Grid2>
  );
};

export default ListaFavoritos;
