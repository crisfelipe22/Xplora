/* eslint-disable no-unused-vars */
import { Grid2, Box, Pagination} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import CardProductoAleatorio from './CardProductoAleatorio';
import styles from "../styles/ProductoAleatorio.module.css";

const ProductoAleatorio = () => {
    const [pag, setPag] = useState(1);
    const [itemPorPag, setItemPorPag] = useState(6);

    const [productosAleatorios, setProductosAleatorios] = useState([]);
    const [categorias, setCategorias] = useState()

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(user);
    }, []);

    useEffect(() => {
        const obtenerDatos = async () => {
          try {
            const [productosResponse, categoriasResponse] = await Promise.all([
              axios.get("/api/paquete-experiencia/aleatorios?cantidad=30"),
              axios.get("/api/categoria")
            ]);
            
            setProductosAleatorios(productosResponse.data);
            setCategorias(categoriasResponse.data);
          } catch (error) {
            console.error("Error obteniendo datos:", error);
            if (error.response) {
              console.error("Detalle del error:", error.response.status, error.response.data);
            }
          }
        };

        obtenerDatos();
    }, []);
    
    const startIndex = (pag - 1) * itemPorPag;
    const endIndex = startIndex + itemPorPag;
    const paginatedProducts = productosAleatorios.slice(startIndex, endIndex);

    return (
        <Box className={styles.gridContainer}>
            <Grid2 container spacing={4}  columns={12}>
                {paginatedProducts.map((product) => (
                    <Grid2 item size={{ mobile: 12, tablet: 6, desktop: 4 }} key={product.id_paquete_experiencia}>
                        <CardProductoAleatorio product={product} categorias={categorias} usuario={usuario}/>
                    </Grid2>
                ))}
            </Grid2>

            <Pagination
                count={Math.ceil(productosAleatorios.length / itemPorPag)}
                page={pag}
                onChange={(event, newPage) => setPag(newPage)}
                className={styles.pagination}
                shape="rounded"
                siblingCount={5} // Número de páginas visibles a los lados
                boundaryCount={1}  // Mostrar primera y última página siempre
            />
        </Box>
        
    )
}

export default ProductoAleatorio;