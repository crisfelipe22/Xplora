/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Typography, Box, Button, Snackbar, Alert} from "@mui/material";
import CardCalificacionProducto from "../components/CardCalificacionProducto";
import styles from "../styles/CardCalificacionProducto.module.css";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect, use } from "react";
import EscribirCalificacionDialog from "../components/EscribirCalificacionDialog";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Calificaciones = ({product}) => {

    const { isAuthenticated, user } = useAuth();
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    const promedioCalificacion = product.puntuacion_promedio

    const [mostrarTodas, setMostrarTodas] = useState(false);
    const [tieneReserva, setTieneReserva] = useState(false);
    const [reservas, setReservas] = useState([])
    const [reservaParaCalificar, setReservaParaCalificar] = useState(null);
    const [alerta, setAlerta] = useState({ open: false, mensaje: "", tipo: "success" });

    const handleVerMas = () => {
        setMostrarTodas(!mostrarTodas); 
    };

    const mostrarAlerta = (mensaje, tipo = "success") => {
        setAlerta({ open: true, mensaje, tipo });
    };

    const [dialogoAbierto, setDialogoAbierto] = useState(false);
    
    useEffect(() => {
        obtenerCalificaciones();
        if (isAuthenticated && user) {
            verificarReserva();
        }
    }, [isAuthenticated, user]);
    
    const obtenerCalificaciones = async () => {
        try {
            const response = await axios.get(`/api/calificaciones/paquete_experiencia/${product.id_paquete_experiencia}`);
            setCalificaciones(response.data);
        } catch (error) {
            console.error("Error al obtener las calificaciones:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const verificarReserva = async () => {
        try {
            const response = await axios.get(`/api/reservas/usuario/${user.id}`);
            setReservas(response.data);
            const reservasUsuario = response.data;
            const haReservado = reservasUsuario.some(reserva => reserva.idPaqueteExperiencia === product.id_paquete_experiencia);
            setTieneReserva(haReservado);
            const reservaEncontrada = reservasUsuario.find(reserva => reserva.idPaqueteExperiencia === product.id_paquete_experiencia);
            setReservaParaCalificar(reservaEncontrada || null);
        } catch (error) {
            console.error("Error al verificar la reserva:", error);
        }
    };
    
    console.log('calificaciones', calificaciones)

    return (
        <Box className={styles.calificacionesBox}>
            <Typography variant="h5" className={styles.titulo} >Reseñas</Typography>
            <Box className={styles.header}>
                <Box display="flex" alignItems="center">
                    <StarIcon style={{ color: "#FFC107", fontSize: "24px" }} /> 
                    <Typography variant="body1" style={{ marginLeft: 8 }}>
                        {promedioCalificacion} • {calificaciones.length} {calificaciones.length === 1 ? "reseña" : "reseñas"}
                    </Typography>
                </Box>
                {isAuthenticated && tieneReserva && (
                    <Button 
                        className={styles.botonEscribir}
                        onClick={() => setDialogoAbierto(true)}
                    >
                        Escribe tu reseña
                    </Button>
                )}
            </Box>

            {calificaciones.length > 0 ? (
                <>
                    {calificaciones.slice(0, mostrarTodas ? calificaciones.length : 2).map((cal, index) => (
                        <CardCalificacionProducto key={index} calificacion={cal} />
                    ))}

                    {calificaciones.length > 2 && (
                        <Button variant="outlined" onClick={handleVerMas} className={styles.botonVerTodas}>
                            {mostrarTodas ? "Ver menos" : "Ver todas las reseñas"}
                        </Button>
                    )}
                </>
            ) : (
                <Typography variant="body1">Aún no hay reseñas.</Typography>
            )}

            {isAuthenticated && (
                <EscribirCalificacionDialog 
                    openDialog={dialogoAbierto} 
                    handleCloseDialog={() => setDialogoAbierto(false)}
                    user={user}
                    product={product}
                    reserva={reservaParaCalificar}
                    mostrarAlerta={mostrarAlerta}
                />
            )}

            <Snackbar
                open={alerta.open}
                autoHideDuration={3000}
                onClose={() => setAlerta({ ...alerta, open: false })}
                anchorOrigin={{ vertical: "center", horizontal: "right" }}
            >
                <Alert onClose={() => setAlerta({ ...alerta, open: false })} severity={alerta.tipo}>
                    {alerta.mensaje}
                </Alert>
            </Snackbar>
            
    </Box>
    );
};

export default Calificaciones;
