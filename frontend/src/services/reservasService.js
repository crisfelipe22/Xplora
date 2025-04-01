import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; 

export const obtenerReservasPorUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservas/usuario/${usuarioId}`);
    return response.data; // Devuelve la lista de reservas del usuario
  } catch (error) {
    console.error("Error obteniendo reservas del usuario:", error);
    throw error;
  }
};

export const obtenerPaqueteExperienciaPorId = async (idPaqueteExperiencia) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/paquete-experiencia/${idPaqueteExperiencia}`);
    return response.data; // Devuelve el detalle del paquete de experiencia
  } catch (error) {
    console.error("Error obteniendo paquete de experiencia:", error);
    throw error;
  }
};

export const obtenerCategoriaPorId = async (idCategoria) => {
    try {
        console.log("Llamando a la API:", `${API_BASE_URL}/categoria/${idCategoria}`);

        const response = await axios.get(`${API_BASE_URL}/categoria/${idCategoria}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });

      return response.data;  // Devuelve la categoría correctamente
    } catch (error) {
      console.error("Error obteniendo la categoría:", error);
      return null;  // Si falla, retorna null
    }
  };
  
  
