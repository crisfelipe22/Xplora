package com.backend.dto.entada;

import jakarta.validation.constraints.NotNull;
import io.swagger.v3.oas.annotations.media.Schema;

public class PaqueteExperienciaFavoritoEntradaDTO {

    @NotNull(message = "El ID del usuario es obligatorio")
    @Schema(description = "ID del usuario que agrega el favorito", example = "1")
    private Long id_usuario;

    @NotNull(message = "El ID del paquete de experiencia es obligatorio")
    @Schema(description = "ID del paquete de experiencia a marcar como favorito", example = "10")
    private Long id_paquete_experiencia;

    public PaqueteExperienciaFavoritoEntradaDTO() {}

    public PaqueteExperienciaFavoritoEntradaDTO(Long id_usuario, Long id_paquete_experiencia) {
        this.id_usuario = id_usuario;
        this.id_paquete_experiencia = id_paquete_experiencia;
    }

    public Long getid_usuario() {
        return id_usuario;
    }

    public void setid_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public Long getid_paquete_experiencia() {
        return id_paquete_experiencia;
    }

    public void setid_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
    }
}
