/* eslint-disable no-unused-vars */
import CardDetalleReserva from "../components/CardDetalleReserva";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Reserva = () =>{
    const { id_paquete_experiencia } = useParams();
    const [product, setProduct] = useState();
    const [fechas, setFechas] = useState({ fecha_inicio: "", fecha_fin: "" });

    useEffect(() => {
        // Obtener fechas de localStorage
        const preReserva = localStorage.getItem("preReserva");
        if (preReserva) {
            setFechas(JSON.parse(preReserva));
            localStorage.removeItem("preReserva"); 
        }

        const obtenerProducto = async () => {
            try {
                const response = await axios.get(`/api/paquete-experiencia/${id_paquete_experiencia}`);
                setProduct(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        obtenerProducto();
    }, [id_paquete_experiencia]);

    console.log(fechas)
    //console.log('product' + product)

    if (!product) {
        return <div>Cargando...</div>;
    }

    return(
        <CardDetalleReserva product={product} fecha_inicio={fechas.fecha_inicio} fecha_fin={fechas.fecha_fin}  />
    )
};

export default Reserva;