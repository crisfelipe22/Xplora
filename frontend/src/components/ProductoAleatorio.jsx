/* eslint-disable no-unused-vars */
import { Grid2, Box, Pagination, Typography, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import CardProductoAleatorio from './CardProductoAleatorio';
import styles from "../styles/ProductoAleatorio.module.css";

const ProductoAleatorio = () => {
    const [pag, setPag] = useState(1);
    const [itemPorPag, setItemPorPag] = useState(6);

    const [productosAleatorios, setProductosAleatorios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [usuario, setUsuario] = useState(null);

    // Obtener usuario del localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuario"));
        setUsuario(user);
    }, []);

    // Obtener datos de productos y categorías
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
            }
        };

        obtenerDatos();
    }, []);

    // Manejo de selección de categorías
    const handleCategoriaChange = (categoriaId) => {
        setCategoriasSeleccionadas((prevCategorias) =>
            prevCategorias.includes(categoriaId)
                ? prevCategorias.filter((id) => id !== categoriaId)
                : [...prevCategorias, categoriaId]
        );
    };

// Depuración para ver si los productos tienen categorías correctas
console.log("Productos:", productosAleatorios);
console.log("Categorías seleccionadas:", categoriasSeleccionadas);

const productosFiltrados = productosAleatorios.filter((producto) => {
  if (categoriasSeleccionadas.length === 0) return true; 
  return categoriasSeleccionadas.includes(producto.id_categoria); // ✅ Usando id_categoria directamente
});

    // Resetear filtros
    const limpiarFiltros = () => {
        setCategoriasSeleccionadas([]);
    };

    // Paginación
    const startIndex = (pag - 1) * itemPorPag;
    const endIndex = startIndex + itemPorPag;
    const paginatedProducts = productosFiltrados.slice(startIndex, endIndex);

    return (
        <Box className={styles.gridContainer}>
            <Grid2 container spacing={4} columns={12}>
                {/* 📌 Filtro en la izquierda */}
                <Grid2 size={{ mobile: 12, tablet: 3, desktop: 3 }}>
                    <Box className={styles.filterContainer}>
                        <Typography variant="h6">Filtrar</Typography>
                        <Typography variant="body2">{productosFiltrados.length} Experiencias</Typography>
                        <Button variant="contained" color="primary" onClick={limpiarFiltros}>
                            LIMPIAR FILTROS
                        </Button>

                        <Typography variant="subtitle2">Categorías</Typography>
                        <FormGroup>
                            {categorias.map((categoria) => (
                                <FormControlLabel
                                    key={categoria.id_categoria}
                                    control={
                                        <Checkbox
                                            checked={categoriasSeleccionadas.includes(categoria.id_categoria)}
                                            onChange={() => handleCategoriaChange(categoria.id_categoria)}
                                        />
                                    }
                                    label={categoria.nombre}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                </Grid2>

                {/* 📌 Productos en la derecha */}
                <Grid2 size={{ mobile: 12, tablet: 9, desktop: 9 }} container spacing={4}>
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <Grid2 size={{ mobile: 12, tablet: 6, desktop: 4 }} key={product.id_paquete_experiencia}>
                                <CardProductoAleatorio product={product} categorias={categorias} usuario={usuario} />
                            </Grid2>
                        ))
                    ) : (
                        <Typography variant="h6" sx={{ marginTop: 2, textAlign: "center", width: "100%" }}>
                            No hay productos disponibles.
                        </Typography>
                    )}
                </Grid2>
            </Grid2>

            {/* Paginación */}
            {productosFiltrados.length > itemPorPag && (
                <Pagination
                    count={Math.ceil(productosFiltrados.length / itemPorPag)}
                    page={pag}
                    onChange={(event, newPage) => setPag(newPage)}
                    className={styles.pagination}
                    shape="rounded"
                    siblingCount={5}
                    boundaryCount={1}
                />
            )}
        </Box>
    );
};

export default ProductoAleatorio;