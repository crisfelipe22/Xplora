/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Creamos el contexto
const ReservaContext = createContext();

// Hook para usar el contexto fácilmente
export const useReserva = () => useContext(ReservaContext);

export const ReservaProvider = ({ children }) => {
    const [fechasDisponibles, setFechasDisponibles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [confirmingReserva, setConfirmingReserva] = useState(false);
    const [errorReserva, setErrorReserva] = useState(null);
    const [reserva, setReserva] = useState(null);

    
        const obtenerFechasDisponibles = async (id_paquete_experiencia) => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/reservas/fechas-disponibles/${id_paquete_experiencia}`);
                setFechasDisponibles(response.data); 
                setErrorReserva(null);
            } catch (err) {
                console.error("Error obteniendo las fechas reservadas", err);
                setErrorReserva("No se pudieron cargar las fechas reservadas.");
            } finally {
                setLoading(false);
            }
        };
    
    
//CAMBIAR LOS NOMBRES DE LAS VARIABLES id_usuario y id_paquete_experiencia AQUI Y EN RESERVA!!!!!!!
    const confirmarReserva = async ({ idUsuario, idPaqueteExperiencia, fecha_inicio, fecha_fin, nombrePaquete }, setOpenDialog, setDialogContent, navigate) => {  
      setConfirmingReserva(true);
      try {
            // Verificar disponibilidad antes de confirmar la reserva
            const response = await axios.get(`/api/reservas/fechas-disponibles/${idPaqueteExperiencia}`);
            
            const fechasDisponibles = response.data
    
            const inicio = new Date(fecha_inicio).toISOString().split("T")[0];
            const fin = new Date(fecha_fin).toISOString().split("T")[0];

            // Validamos si alguna de las fechas seleccionadas está ya ocupada
            if (!fechasDisponibles.includes(inicio) || !fechasDisponibles.includes(fin)) {
                setDialogContent({
                    title: "¡Algo salió mal!",
                    message: "Por favor, revisa tus datos y vuelve a intentarlo.",
                    buttonText: "Volver a los detalles",
                    onButtonClick: () =>{
                        localStorage.removeItem("preReserva");
                        navigate(`/detalle-producto/${idPaqueteExperiencia}`)
                    } 
                });
    
                setOpenDialog(true);
                return;
            }
    
        
            await axios.post("/api/reservas", {
                idUsuario,
                idPaqueteExperiencia,
                fecha_inicio,
                fecha_fin
            });
            localStorage.removeItem("preReserva"); 

            setDialogContent({
                title: "¡Felicidades!",
                message: `Ya tienes tu reserva a la experiencia: ${nombrePaquete}`,
                buttonText: "Ver mis reservas",
                onButtonClick: () => navigate("/perfil") /*Ajusta la ruta a MIS RESERVAS*/
            });

            if (typeof setOpenDialog === "function") {
                setOpenDialog(true);
            } 

        } catch (error) {
            console.error("Error al confirmar la reserva", error);
            setDialogContent({
                title: "¡Error!",
                message: "Hubo un problema al procesar tu reserva. Por favor, intenta nuevamente.",
                buttonText: "Cerrar",
                onButtonClick: () => setOpenDialog(false)
            });
            setOpenDialog(true);
        } finally {
            setConfirmingReserva(false);
        }
    };

return (
        <ReservaContext.Provider value={{ 
            fechasDisponibles, 
            obtenerFechasDisponibles, 
            confirmarReserva, 
            loading, 
            confirmingReserva, 
            errorReserva 
        }}>
            {children}
        </ReservaContext.Provider>
    );
};
