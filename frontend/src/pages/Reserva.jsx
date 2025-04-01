/* eslint-disable no-unused-vars */
import CardDetalleReserva from "../components/CardDetalleReserva";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReserva } from "../contexts/ReservaContext";
import { useAuth } from "../contexts/AuthContext";


const Reserva = () =>{
    const { id_paquete_experiencia } = useParams();
    const navigate = useNavigate();
    const { confirmarReserva } = useReserva();
    const { user } = useAuth();

    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        title: "",
        message: "",
        buttonText: "",
        /*onButtonClick: () => {}*/
    });
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

    const handleConfirmarReserva = () => {
        confirmarReserva(
            {
                idUsuario: user.id,
                idPaqueteExperiencia: product.id_paquete_experiencia,
                fecha_inicio: fechas.fecha_inicio,
                fecha_fin: fechas.fecha_fin,
                nombrePaquete: product.nombre
            },
            setOpenDialog, 
            setDialogContent, 
            navigate
        );
    };

    return(
        <CardDetalleReserva 
            product={product} 
            fecha_inicio={fechas.fecha_inicio} 
            fecha_fin={fechas.fecha_fin}
            confirmarReserva={handleConfirmarReserva}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            dialogContent={dialogContent}
        />
    )
};

export default Reserva;