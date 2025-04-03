/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Typography, Box, Button} from "@mui/material";
import CardCalificacionProducto from "../components/CardCalificacionProducto";
import styles from "../styles/CardCalificacionProducto.module.css";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import EscribirCalificacionDialog from "../components/EscribirCalificacionDialog";
import { useAuth } from "../contexts/AuthContext";

const Calificaciones = ({product}) => {

    const { isAuthenticated } = useAuth();
    //APPI, POR AHORA CODEADO
    const calificaciones = [
        {
            usuario: 'Sara Mendoza',
            fecha_calificacion: '2025-03-14',
            calificacion: 4.5,
            descripcion: 'Simplemente mágico, empiezas el recorrido caminando, conoces dos cascadas increíbles, un poco de historia y pasas a conectarte con: La paz, la naturaleza, la conservación y la vida.'
        },
        {
            usuario: 'Solymar Quiaro',
            fecha_calificacion: '2024-11-01',
            calificacion: 3.0,
            descripcion: 'Simplemente mágico, empiezas el recorrido caminando, conoces dos cascadas increíbles, un poco de historia y pasas a conectarte con: La paz, la naturaleza, la conservación y la vida.'
        },
        {
            usuario: 'Sara Mendoza',
            fecha_calificacion: '2025-03-14',
            calificacion: 4.5,
            descripcion: 'Simplemente mágico, empiezas el recorrido caminando, conoces dos cascadas increíbles, un poco de historia y pasas a conectarte con: La paz, la naturaleza, la conservación y la vida.'
        },
        {
            usuario: 'Solymar Quiaro',
            fecha_calificacion: '2024-11-01',
            calificacion: 3.0,
            descripcion: 'Simplemente mágico, empiezas el recorrido caminando, conoces dos cascadas increíbles, un poco de historia y pasas a conectarte con: La paz, la naturaleza, la conservación y la vida.'
        }
    ]

    const promedioCalificacion = 3

    const [mostrarTodas, setMostrarTodas] = useState(false);
    const [puedeReservar, setPuedeReservar] = useState(false)

    const handleVerMas = () => {
        setMostrarTodas(!mostrarTodas); 
    };

    const [dialogoAbierto, setDialogoAbierto] = useState(false);

    
    
    return (
        <Box className={styles.calificacionesBox}>
            <Typography variant="h5" className={styles.titulo} >Reseñas</Typography>
            <Box className={styles.header}>
                <Box display="flex" alignItems="center">
                    <StarIcon style={{ color: "#FFC107", fontSize: "24px" }} /> 
                    <Typography variant="body1" style={{ marginLeft: 8 }}>
                        {promedioCalificacion} • {calificaciones.length} reseñas
                    </Typography>
                </Box>
                <Button className={styles.botonEscribir}
                    onClick={() => setDialogoAbierto(true)}>
                        Escribe tu reseña
                </Button>
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

            <EscribirCalificacionDialog 
                openDialog={dialogoAbierto} 
                handleCloseDialog={() => setDialogoAbierto(false)}
                usuario="Victoria Ancalaf"
                product={product}
            />

    </Box>
    );
};

export default Calificaciones;
