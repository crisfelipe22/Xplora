/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, Typography, CardMedia, Rating, Chip} from '@mui/material';
import styles from '../styles/ProductoAleatorio.module.css';
import { Link } from 'react-router-dom';

const CardProductoAleatorio = ({product}) => {
    const imagenArray = product.imagen ? product.imagen.split(',').map(url => url.trim()) : [];
    const imagenUrl =  imagenArray.length > 0 ? imagenArray[0] : "https://via.placeholder.com/300";
    //suponiendo raiting por ahora
    const rating = product.rating ?? Math.floor(Math.random() * 3) + 3;

    return (
        <Link to={ `/detalle-producto/${product.id_paquete_experiencia}`} style={{ textDecoration: 'none' }}>
            <Card className={styles.card}>
                <CardMedia
                    component="img"
                    height="200"
                    image={imagenUrl || 'nada'}
                    alt={product.nombre}
                    className={styles.imagenProducto}
                />
                <CardContent className={styles.cardContent}>
                    <Rating value={rating} precision={0.5} readOnly className={styles.rating} />

                    <Typography variant="h6" className={styles.nombreProducto}>
                        {product.nombre}
                    </Typography>

                    <Typography variant="body2" className={styles.descripcionProducto}>
                        {product.descripcion}
                    </Typography>

                    <Chip label={product.categoria.nombre} className={styles.categoriaProducto} />
                    
                </CardContent>
            </Card>
        </Link>
        
    );
};


export default CardProductoAleatorio;