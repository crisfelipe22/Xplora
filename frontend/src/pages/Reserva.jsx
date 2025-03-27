/* eslint-disable no-unused-vars */
import CardDetalleReserva from "../components/CardDetalleReserva";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Reserva = () =>{
    const { id_paquete_experiencia } = useParams();
    const navigate = useNavigate();

    const [openDialog, setOpenDialog] = useState(false);
    const [product, setProduct] = useState();
    const [fechas, setFechas] = useState({ fecha_inicio: "", fecha_fin: "" });

    useEffect(() => {
        // Obtener fechas de localStorage
        const preReserva = localStorage.getItem("preReserva");
        if (preReserva) {
            setFechas(JSON.parse(preReserva));
            
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


    if (!product) {
        return <div>Cargando...</div>;
    }

    const confirmarReserva = () => {
        localStorage.removeItem("preReserva");
        setOpenDialog(true);

        setTimeout(() => {
            setOpenDialog(false);
            navigate("/");
        }, 6000);
    };

    return(
        <CardDetalleReserva 
            product={product} 
            fecha_inicio={fechas.fecha_inicio} 
            fecha_fin={fechas.fecha_fin}
            confirmarReserva={confirmarReserva}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
        />
    )
};

export default Reserva;