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
      const fetchData = async () => {
        try {
          const [productResponse, categoriesResponse] = await Promise.all([
            fetch(`/api/paquete-experiencia/${id_paquete_experiencia}`),
            axios.get("/api/categoria")
          ]);

          const productData = await productResponse.json();
          setProduct(productData);
          setCategorias(categoriesResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [id_paquete_experiencia]);

    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <CardDetalleProducto product={product} categorias={categorias} />
    )
};

export default DetalleProducto;