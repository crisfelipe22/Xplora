/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import styles from "../styles/CardRecomendaciones.module.css"

const CardRecomendaciones = () => {
    //Suponiendo el arreglo de objetos por ahora
    const productosAleatorios = [
        {
            idPaqueteExperiencia: 3,
            categoria: {
                idCategoria: 2,
                nombre: "Relax"
            },
            nombre: "Spa de Lujo",
            descripcion: "Un día de relajación en un spa de 5 estrellas.",
            precio: 200,
            ubicacion: "Santiago, Chile",
            imagen: "https://scene7.toyota.eu/is/image/toyotaeurope/desconexion-spa-lujo-diseno-1920x1080_tcm-3153-1197223:Large-Landscape?ts=0&resMode=sharp2&op_usm=1.75,0.3,2,0",
        }
    ]
    
    //llamado GET productos aleatorios
    /*
    const [productosAleatorios, setProductosAleatorios] = useState([]);

    useEffect(() => {
        const obtenerProductosAleatorios = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/paquete-experiencia/aleatorios?cantidad=10");
            setProductosAleatorios(response.data);
        } catch (error) {
            console.error("Error obteniendo productos aleatorios:", error);
        }
        };

        obtenerProductosAleatorios();
    }, []);
    */

    return (
        <Box>
            <Typography variant="h4" mb={3}>
                Productos recomendados para ti
            </Typography>

            <Box>
                <Card>
                    <CardMedia
                        component="img"
                        height="140"
                        image={productosAleatorios[0].imagen} 
                        alt={productosAleatorios[0].nombre}
                    />
                    <CardContent>
                        <Typography variant="h6" className={styles.nombreProducto}>
                            {productosAleatorios[0].nombre}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className={styles.descripcionProducto}>
                            {productosAleatorios[0].descripcion}
                        </Typography>
                        <Typography variant="body1" className={styles.categoriaProducto}>
                            {productosAleatorios[0].categoria.nombre}
                        </Typography>
                        
                    </CardContent>
                </Card>
            </Box>
        </Box>

    )
}

export default CardRecomendaciones;