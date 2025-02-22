/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardDetalleProducto from '../components/CardDetalleProducto'


const DetalleProducto = () =>{
    const {id_paquete_experiencia} = useParams()
    console.log(id_paquete_experiencia)

    //LLAMADO GET  
    
    const [product, setProduct] = useState();

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
        fetchProductoDetalle();
    }, [id_paquete_experiencia]); 

    if (!product) {
        return <div>Cargando...</div>;
    }
   

    return (
        <CardDetalleProducto product={product} />
    )
};

export default DetalleProducto;