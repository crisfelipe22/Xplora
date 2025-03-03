/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardDetalleProducto from '../components/CardDetalleProducto';
import axios from "axios";


const DetalleProducto = () =>{
    const {id_paquete_experiencia} = useParams()
    console.log(id_paquete_experiencia)

    //LLAMADO GET  
    
    const [product, setProduct] = useState();
    const [categorias, setCategorias] = useState()

    useEffect(() => {
        const fetchProductoDetalle = async () => {
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
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/categoria");
                setCategorias(response.data); 
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        obtenerCategorias();
        fetchProductoDetalle();
    }, [id_paquete_experiencia]); 

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <CardDetalleProducto product={product} categorias={categorias} />
    )
};

export default DetalleProducto;