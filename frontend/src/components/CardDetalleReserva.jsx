/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { React, useState } from "react";
import {
    Container,
    Typography,
    Card,
    Button,
    TextField,
    Box,
    Modal,
    useTheme,
    Snackbar,
    Alert,
    IconButton,
    CardContent, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from '../styles/CardDetalleReserva.module.css'

const CardDetalleReserva = ({product, fecha_inicio, fecha_fin, confirmarReserva, open, onClose, dialogContent}) =>{
    const navigate = useNavigate();
    const theme = useTheme();
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
            year: "numeric"    
        });
    };
    
    
    return(
        <Box className={styles.container} >
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
                    <Box className={styles.productContenido} >
                        <img
                            src={imagenArray[0]}
                            alt={product.nombre}
                            className={styles.productImage}
                        />

                        <Typography className={styles.productDescription}>
                            {product.descripcion}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            
            <Box className={styles.infoSection}>
                <Typography variant="subtitle1" className={styles.sectionTitle}>
                    Datos usuario
                </Typography>
                <Typography>{user.nombre}</Typography>
                <Typography>{user.email}</Typography>
            </Box>

            <Box className={styles.infoSection}>
                <Typography variant="subtitle1" className={styles.sectionTitle}>
                    Datos reserva experiencia
                </Typography>
                <Typography>{formatearFecha(fecha_inicio)} --- {formatearFecha(fecha_fin)}</Typography>
                <Box className={styles.totalSection}>
                    <Typography variant="h6">Total a pagar</Typography>
                    <Typography variant="h6" >
                    ${product.precio}
                    </Typography>
                </Box>

                <Button className={styles.confirmButton} variant="contained" color="primary"
                onClick={confirmarReserva}>
                    CONFIRMAR RESERVA
                </Button>
            </Box>

            <Dialog open={open} onClose={onClose} className={styles.dialogContent} 
            maxWidth={false}
            PaperProps={{
                className: styles.dialogContent 
            }}>
                <DialogTitle className={styles.tituloDialogo} >{dialogContent.title} </DialogTitle>
                <DialogContent  >
                    <Typography className={styles.contenidoDialogo}>{dialogContent.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogContent.onButtonClick} color="primary" variant="contained" className={styles.botonVerReservas}>
                        {dialogContent.buttonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CardDetalleReserva;