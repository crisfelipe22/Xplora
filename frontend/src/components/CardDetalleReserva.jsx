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
    CardContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import styles from '../styles/CardDetalleReserva.module.css'

const CardDetalleReserva = ({product, fecha_inicio, fecha_fin}) =>{
    const navigate = useNavigate();
    const theme = useTheme();
    const imagenArray = product.imagen
    ? product.imagen.split(",").map((url) => url.trim())
    : [];

    
    return(
        <Box>
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
                    <Box>
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
                <Typography>usuario.nombre</Typography>
                <Typography>usuario.email</Typography>
            </Box>

            <Box className={styles.infoSection}>
                <Typography variant="subtitle1" className={styles.sectionTitle}>
                    Datos reserva experiencia
                </Typography>
                <Typography>{fecha_inicio} - {fecha_fin}</Typography>
                <Box className={styles.totalSection}>
                    <Typography variant="h6">Total a pagar</Typography>
                    <Typography variant="h6" className={styles.totalPrice}>
                    ${product.precio}
                    </Typography>
                </Box>

                <Button className={styles.confirmButton} variant="contained" color="primary">
                    CONFIRMAR RESERVA
                </Button>
            </Box>

        </Box>
    );
};

export default CardDetalleReserva;