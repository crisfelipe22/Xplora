import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { Card, CardMedia, CardContent, Typography, IconButton, Grid } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import styles from '../styles/ProductoAleatorio.module.css';

const ListaFavoritos = () => {
  const { getFavoriteProducts, favorites, toggleFavorite} = useFavorites();
  console.log("Favoritos guardados en el contexto:", favorites);
  const favoritos = getFavoriteProducts(); // Obtener los productos favoritos
  console.log("Productos favoritos después de filtrar:", favoritos);

  console.log("Productos favoritos:", favoritos);

  return (
    <Grid container spacing={3}>
      {favoritos.length > 0 ? (
        favoritos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id_paquete_experiencia}>
            <Card className={styles.card}>
              <CardMedia component="img"
                                  height="200"
                                  width="610"
                                  className={styles.imagenProducto}/>
              <CardContent>
                <Typography variant="h6">{producto.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">{producto.descripcion}</Typography>
                <IconButton onClick={() => toggleFavorite(producto.id_paquete_experiencia)} color="error">
                  <Favorite />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", width: "100%", mt: 2 }}>
          No tienes productos en favoritos
        </Typography>
      )}
    </Grid>
  );
};

export default ListaFavoritos;
