/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid2, CircularProgress, Alert, Pagination } from "@mui/material";
import CardProductoAleatorio from "../components/CardProductoAleatorio";

const ResultadoBusqueda = () =>{
    const [searchParams] = useSearchParams();
    const [productosBusqueda, setProductosBusqueda] = useState([]);
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [pag, setPag] = useState(1);
    const [itemPorPag, setItemPorPag] = useState(9);

    //API PRODUCTO BUSCADO  
    useEffect(() => {
        const fetchResultados = async () => {
            setLoading(true);
            setError(null);
            const nombre = searchParams.get("nombre");
            const fecha_inicio = searchParams.get("fecha_inicio");
            const fecha_fin = searchParams.get("fecha_fin");
            console.log("Buscando:", { nombre, fecha_inicio, fecha_fin })
            try {
                const [productosResponse, categoriasResponse] = await Promise.all([
                    axios.get(`/api/paquete-experiencia/filtro`, {
                        params: { nombre, fecha_inicio, fecha_fin },
                    }),
                    
                    axios.get("/api/categoria")
                ]);

                if (productosResponse.data.length === 0) {
                    setError("No se encontraron resultados para tu búsqueda.");
                } else {
                    setProductosBusqueda(productosResponse.data);
                    setCategorias(categoriasResponse.data)
                }
                console.log("Productos recibidos:", productosResponse.data);
                console.log("Categorías recibidas:", categoriasResponse.data);
            } catch (error) {
                setError("Hubo un problema al obtener los datos. Intenta de nuevo.");
                console.error("Error obteniendo productos:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchResultados();
    }, [searchParams]);

    

    const startIndex = (pag - 1) * itemPorPag;
    const endIndex = startIndex + itemPorPag;
    const paginatedProducts = productosBusqueda.slice(startIndex, endIndex);

    return(
        <Container>
            <Typography variant="h5" className="titulo-recomendados" sx={{marginTop: "75px"}}>
                Resultados de tú busqueda
            </Typography>

            {loading && <CircularProgress />} {/* Muestra el spinner mientras carga */}
            {error && <Alert severity="error">{error}</Alert>} 

            {!loading && !error && (
                <Grid2 container spacing={4}  columns={12}>
                    {paginatedProducts.map((product) => (
                        <Grid2 item size={{ mobile: 12, tablet: 6, desktop: 4 }} key={product.id_paquete_experiencia}>
                            <CardProductoAleatorio product={product} categorias={categorias}/>
                        </Grid2>
                    ))}
                </Grid2>
                
            )}
            <Pagination
                count={Math.ceil(productosBusqueda.length / itemPorPag)}
                page={pag}
                onChange={(event, newPage) => setPag(newPage)}
                /*className={styles.pagination}*/
                shape="rounded"
                siblingCount={5} // Número de páginas visibles a los lados
                boundaryCount={1}  // Mostrar primera y última página siempre
            />
            
        </Container>
    )
};

export default ResultadoBusqueda;