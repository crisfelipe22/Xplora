/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { React, useState } from "react";
import {
    Container,
    Typography,
    Button,
    TextField,
    Box,
    Modal,
    useTheme,
    Snackbar,
    Alert,
} from "@mui/material";
import styles from '../styles/CardDetalleReserva'

const CardDetalleReserva = ({product, fecha_inicio, fecha_fin}) =>{
    
    
    return(
        <Box>
            <Typography variant="h6" className={styles.tituloReserva}>
                ← Detalles experiencia
            </Typography>
        </Box>
    );
};

export default CardDetalleReserva;