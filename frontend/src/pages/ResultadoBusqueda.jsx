/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import CardProductoAleatorio from "../components/CardProductoAleatorio";

const ResultadoBusqueda = () =>{
    const [searchParams] = useSearchParams();
    const [productosBusqueda, setProductosBusqueda] = useState([]);
    const [categorias, setCategorias] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //API PRODUCTO BUSCADO  
    useEffect(() => {
        const fetchResultados = async () => {
            setLoading(true);
            setError(null);
            /*const query = searchParams.get("query");
            const fechaInicio = searchParams.get("fechaInicio");
            const fechaFin = searchParams.get("fechaFin");*/
    
            try {
                const [productosResponse, categoriasResponse] = await Promise.all([
                    /*axios.get(`http://localhost:8080/api/productos/buscar`, {
                        params: { query, fechaInicio, fechaFin },
                    })*/
                    axios.get("/api/paquete-experiencia/aleatorios?cantidad=30"),//MIENTRAS OBTENGO EL ENDPOINT DE RESULTADO BUSQUEDA
                    axios.get("/api/categoria")
                ]);

                if (productosResponse.data.length === 0) {
                    setError("No se encontraron resultados para tu búsqueda.");
                } else {
                    setProductosBusqueda(productosResponse.data);
                    setCategorias(categoriasResponse.data)
                }
        
            } catch (error) {
                setError("Hubo un problema al obtener los datos. Intenta de nuevo.");
                console.error("Error obteniendo productos:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchResultados();
    }, [searchParams]);


    return(
        <></>
    )
};

export default ResultadoBusqueda;