/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Container, Grid2, Typography, Chip, List, ListItem, ListItemIcon, Card, CardContent, Button, Rating, TextField, IconButton, Box } from '@mui/material';
import styles from "../styles/DetalleProducto.module.css";
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { useState } from "react";
import GaleriaImgProducto from './GaleriaImgProducto';

const CardDetalleProducto = ({product}) =>{
    const [openGallery, setOpenGallery] = useState(false);
    const handleOpenGallery = () => setOpenGallery(true);
    const handleCloseGallery = () => setOpenGallery(false);

    const imagenArray = product.imagen ? product.imagen.split(',').map(url => url.trim()) : [];

    //caracteristicas provisorias
    const caracteristicas = [
        'Traslado privado Caracas-Aeropuerto',
        'Boletos aéreos Caracas-Canaima',
        'Hospedaje en Lodge (campamento) de tu elección',
        'Todas las comidas desde el almuerzo del día de llegada hasta el desayuno del día de salida (incluyendo bebidas no alcohólicas)',
        'Impuestos de entrada al Parque Nacional Canaima',
        'Excursión al Salto Ángel incluida en modalidad full day o pernocta (sujeto a disponibilidad)',
        'Sesión de stand up de kayak en la laguna'
    ]
    //simulando raiting
    const rating = product.rating ?? Math.floor(Math.random() * 5) + 1;

    return (
        <Container className={styles.container}>
            <div className={styles.detalleSuperior}>
                <div className={styles.tituloVolver}>
                    <IconButton component={Link} to="/" className={styles.backButton}>
                        <ArrowBackIcon /> VOLVER ATRÁS
                    </IconButton>
                    <Typography variant="h3" className={styles.title}>{product.nombre}</Typography>
                </div>
                
                <div className={styles.imagenContainer}>
                    <img src={imagenArray[0]} alt={product.nombre} className={styles.mainImage} />
                    <div className={styles.imgContainer}>
                        {imagenArray.slice(1, 5).map((img, index) => (
                            <img key={index} src={img} alt={`Vista ${index + 1}`} className={styles.img} />
                        ))}
                    </div>
                </div>
                <Button variant="contained" onClick={handleOpenGallery} className={styles.seeAllImages}>VER TODAS LAS IMÁGENES</Button>
            </div>

            <Box className={styles.contenedorDetalles}> 
                <Box className={styles.contenedorDos}>
                    <div className={styles.seccionRating}>
                        <Chip label={product.categoria.nombre} className={styles.chip} />
                        <Rating value={rating} precision={0.5} readOnly className={styles.rating} />
                    </div>    
                    <List dense>
                        {caracteristicas.map((item, index) => (
                            <ListItem key={index} className={styles.listItem}>
                                <ListItemIcon className={styles.listIcon}>
                                    <CheckIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="body1">{item}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>                 

                <Card className={styles.cardPrecio}>
                    <Typography variant="h5" className={styles.precio}>${product.precio.toLocaleString()}</Typography>
                    <TextField type="date" label="Elige fecha" className={styles.datePicker} />
                    <Button variant="contained" className={styles.botonComprar}>COMPRAR EXPERIENCIA</Button>
                    <Typography variant="h5" className={styles.preguntaRegalo}>¿TE HICIERON ESTE REGALO?</Typography>
                </Card>
            </Box>            
            <GaleriaImgProducto open={openGallery} close={handleCloseGallery} imagen={product.imagen}/>
        </Container>
    )
};

export default CardDetalleProducto;