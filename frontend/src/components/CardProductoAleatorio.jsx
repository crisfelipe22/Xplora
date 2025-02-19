/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styles from '../styles/ProductoAleatorio.module.css';

const CardProductoAleatorio = ({product}) => {
    const imagenArray = product.imagen ? product.imagen.split(',').map(url => url.trim()) : [];
    const imagenUrl =  imagenArray.length > 0 ? imagenArray[0] : "https://via.placeholder.com/300";
    
    return (
        <Card className={styles.card}>
            <CardMedia
                component="img"
                height="200"
                image={imagenUrl || 'nada'}
                alt={product.nombre}
                className={styles.cardImage}
            />
            <CardContent>

                <Typography variant="h6" className={styles.nombreProducto}>
                    {product.nombre}
                </Typography>

                <Typography variant="body2" className={styles.descripcionProducto}>
                    {product.descripcion}
                </Typography>

                <Typography variant="body2" className={styles.categoriaProducto}>
                    {product.categoria.nombre}
                </Typography>
                
            </CardContent>
        </Card>
        
    );
};


export default CardProductoAleatorio;