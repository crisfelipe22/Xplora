
/* eslint-disable no-unused-vars */
import {React, useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Box } from "@mui/material";

const CardEditarProducto = () =>{

    const {id_paquete_experiencia} = useParams()
    console.log(id_paquete_experiencia)

    const [product, setProduct] = useState()
    //LLAMADO GET
    useEffect(() => {
            const fetchProductoEditar = async () => {
                try {
                    const response = await fetch(`/api/paquete-experiencia/${id_paquete_experiencia}`);
                    if (!response.ok) {
                        throw new Error('Error al obtener el producto');
                    }
                    const data = await response.json();
                    setProduct(data); 
                } catch (error) {
                    console.error('Hubo un problema con la solicitud de la API:', error);
                }
            };
            fetchProductoEditar();
        }, [id_paquete_experiencia]); 

        if (!product) {
            return <div>Cargando...</div>;
        }

    const imagenArray = product.imagen ? product.imagen.split(',').map(url => url.trim()) : [];

    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }

    //LLAMADO PUT
    /*
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/paquete-experiencia/${id_paquete_experiencia}`, product);
                alert("Producto actualizado exitosamente");
                 // Redirige a la lista de productos
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }
        */

    return(
        <Box>

        </Box>
    )
};

export default CardEditarProducto;