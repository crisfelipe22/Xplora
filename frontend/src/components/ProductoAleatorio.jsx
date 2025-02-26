import { Grid2, Box} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import CardProductoAleatorio from './CardProductoAleatorio';
import styles from "../styles/ProductoAleatorio.module.css";

const ProductoAleatorio = () => {
    
    const [productosAleatorios, setProductosAleatorios] = useState([]);

    useEffect(() => {
        const obtenerProductosAleatorios = async () => {
        try {
            const response = await axios.get("/api/paquete-experiencia/aleatorios?cantidad=6");
            setProductosAleatorios(response.data);
        } catch (error) {
            console.error("Error obteniendo productos aleatorios:", error);
        }
        };

        obtenerProductosAleatorios();
    }, []);


    return (
        <Box className={styles.gridContainer}>
            <Grid2 container spacing={4}  columns={12}>
                {productosAleatorios.map((product) => (
                    <Grid2 item size={{ mobile: 12, tablet: 6, desktop: 4 }} key={product.id_paquete_experiencia}>
                        <CardProductoAleatorio product={product} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>

    )
}

export default ProductoAleatorio;