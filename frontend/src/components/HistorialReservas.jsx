import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { 
  obtenerReservasPorUsuario, 
  obtenerPaqueteExperienciaPorId, 
  obtenerCategoriaPorId 
} from "../services/reservasService";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import CardProductoAleatorio from "./CardProductoAleatorio";

const HistorialReservas = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        if (!user || !user.id) return;

        const reservasUsuario = await obtenerReservasPorUsuario(user.id);
        const reservasConDetalles = await Promise.all(
          reservasUsuario.map(async (reserva) => {
            const paquete = await obtenerPaqueteExperienciaPorId(reserva.idPaqueteExperiencia);
            console.log("Paquete obtenido:", paquete);

            let categoria = null;
            if (paquete?.id_categoria) {
              console.log("Obteniendo categoría con ID:", paquete.id_categoria);
              categoria = await obtenerCategoriaPorId(paquete.id_categoria);
            }

            console.log("Categoría obtenida:", categoria);

            return { 
              ...reserva, 
              paquete, 
              categoria // ✅ Agregamos la categoría correctamente
            };
          })
        );

        setReservas(reservasConDetalles);
      } catch (error) {
        console.error("Error cargando historial de reservas:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, [user]);

  if (cargando) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {reservas.length === 0 ? (
        <Typography>No tienes reservas aún.</Typography>
      ) : (
        <Grid container spacing={3}>
            {reservas.map((reserva) => (
                <Grid item xs={12} sm={6} md={4} key={reserva.idReserva}>
                {reserva.paquete ? (
                    <CardProductoAleatorio
                      product={reserva.paquete}
                      categorias={reserva.categoria ? [reserva.categoria] : []}
                      fechaInicio={reserva.fecha_inicio}
                      fechaFin={reserva.fecha_fin}
                      mostrarFechas={true}
                    />
                ) : (
                    <Typography variant="body2">Cargando datos...</Typography>
                )}
                </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default HistorialReservas;
