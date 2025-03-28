/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Creamos el contexto
const ReservaContext = createContext();

// Hook para usar el contexto fácilmente
export const useReserva = () => useContext(ReservaContext);

export const ReservaProvider = ({ children }) => {
    const [fechasReservadas, setFechasReservadas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reserva, setReserva] = useState(null);

    
        const obtenerFechasReservadas = async (id_paquete_experiencia) => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/reservas/paquete/${id_paquete_experiencia}`);
                setFechasReservadas(response.data); // Suponiendo que devuelve un array de fechas
                setError(null);
            } catch (err) {
                console.error("Error obteniendo las fechas reservadas", err);
                setError("No se pudieron cargar las fechas reservadas.");
            } finally {
                setLoading(false);
            }
        };
    
    
//CAMBIAR LOS NOMBRES DE LAS VARIABLES id_usuario y id_paquete_experiencia AQUI Y EN RESERVA!!!!!!!
    const confirmarReserva = async ({ idUsuario, idPaqueteExperiencia, fecha_inicio, fecha_fin }, setOpenDialog, navigate) => {
        try {
            await axios.post("/api/reservas", {
                idUsuario,
                idPaqueteExperiencia,
                fecha_inicio,
                fecha_fin
            });
            localStorage.removeItem("preReserva"); 
            if (typeof setOpenDialog === "function") {
                setOpenDialog(true);
            } 

            setTimeout(() => {
                navigate("/");
            }, 6000);
        } catch (error) {
            console.error("Error al confirmar la reserva", error);
        }
    };

    return (
        <ReservaContext.Provider value={{ fechasReservadas, obtenerFechasReservadas, confirmarReserva, loading, error }}>
            {children}
        </ReservaContext.Provider>
    );
};
