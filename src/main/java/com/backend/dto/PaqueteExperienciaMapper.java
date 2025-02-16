package com.backend.dto;

import com.backend.dto.entada.PaqueteExperienciaEntradaDTO;
import com.backend.entity.PaqueteExperiencia;

public class PaqueteExperienciaMapper {

    // Convierte DTO de entrada a la entidad PaqueteExperiencia
    public static PaqueteExperiencia toEntiaty(PaqueteExperienciaEntradaDTO dto) {
        PaqueteExperiencia paquete = new PaqueteExperiencia();
        // Aquí necesitas un servicio o método para obtener la categoría por su ID
        // PaqueteExperiencia.setCategoria(categoria);
        paquete.setNombre(dto.getNombre());
        paquete.setDescripcion(dto.getDescripcion());
        return paquete;
    }
}
