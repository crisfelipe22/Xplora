/* eslint-disable no-unused-vars */
import { Grid2, Box, Pagination, Typography, Button, Checkbox, FormControlLabel, FormGroup, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CardProductoAleatorio from './CardProductoAleatorio';
import styles from "../styles/ProductoAleatorio.module.css";
import { Padding, SystemSecurityUpdateWarningTwoTone, FilterList } from '@mui/icons-material';
import CloseIcon from "@mui/icons-material/Close";

const ProductoAleatorio = () => {
    const [pag, setPag] = useState(1);
    const [itemPorPag, setItemPorPag] = useState(6);
    const [productosAleatorios, setProductosAleatorios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [filtroAbierto, setFiltroAbierto] = useState(false);

    const filtroRef = useRef(null);

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
            }
        };
        obtenerDatos();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filtroRef.current && !filtroRef.current.contains(event.target)) {
                setFiltroAbierto(false);
            }
        };

        if (filtroAbierto) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filtroAbierto]);

    const handleCategoriaChange = (categoriaId) => {
        setCategoriasSeleccionadas((prevCategorias) =>
            prevCategorias.includes(categoriaId)
                ? prevCategorias.filter((id) => id !== categoriaId)
                : [...prevCategorias, categoriaId]
        );
        setPag(1);
    };

    const productosFiltrados = productosAleatorios.filter((producto) => {
        if (categoriasSeleccionadas.length === 0) return true;
        return categoriasSeleccionadas.includes(producto.id_categoria);
    });

    const cerrarFiltro = () => {
        setFiltroAbierto(false);
    }

    const limpiarFiltros = () => {
        setCategoriasSeleccionadas([]);
    };

    const startIndex = (pag - 1) * itemPorPag;
    const endIndex = startIndex + itemPorPag;
    const paginatedProducts = productosFiltrados.slice(startIndex, endIndex);

    return (
        <>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
                <Typography variant="h5" className="titulo-recomendados">
                    Lo que nuestros Xplorers recomiendan
                </Typography>

                <Button className={styles.FilterButton} onClick={() => setFiltroAbierto(true)}>
                    <FilterList />
                    FILTRAR
                </Button>
            </Box>
            <Box sx={{ Padding: 1 }} className={styles.gridContainer}>
                <Grid2 container spacing={4} columns={12}>

                    {/* Filtro en desktop */}
                    <Box item xs={12} md={3} className={styles.desktopFilter}>
                        <Typography variant="h6" sx={{ marginY: 2 }}>Filtrar</Typography>
                        <Typography variant="body2" sx={{ marginY: 2 }}>{productosFiltrados.length} Experiencias</Typography>
                        <Button variant="contained" color="primary" onClick={limpiarFiltros}>
                            LIMPIAR FILTROS
                        </Button>
                        <Typography variant="body2" sx={{ marginY: 2 }}>Categorías</Typography>
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

                    {/* Productos */}
                    <Grid2 size={{ mobile: 12, tablet: 12, desktop: 10 }} container spacing={4}>
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

                    {/*Filtros en tablet/móvil */}
                    {filtroAbierto && (
                        <div className={styles.movileFilter} ref={filtroRef}>
                            <Box sx={{ padding: 2 }}>
                                <IconButton onClick={cerrarFiltro} sx={{ display: "flex", alignItems: "center", color: "black", padding: 0 }}>
                                    <CloseIcon sx={{ fontSize: "0.5em", padding: 0 }} />
                                    <Typography variant="caption">
                                        CERRAR
                                    </Typography>
                                </IconButton>
                                <Typography variant="h6">Filtrar</Typography>
                                <Typography variant="body2" sx={{ marginY: 2 }}>{productosFiltrados.length} Experiencias</Typography>
                                <Button variant="contained" color="primary" onClick={limpiarFiltros}>
                                    LIMPIAR FILTROS
                                </Button>
                                <Typography variant="subtitle2" sx={{ marginY: 2 }}>Categorías</Typography>

                                <FormGroup >
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
                        </div>
                    )}
                </Grid2>
            </Box>
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
        </>
    );
};

export default ProductoAleatorio;
