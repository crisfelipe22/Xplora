package com.backend.dto.salida;

public class PaqueteExperienciaFavoritoSalidaDTO {
    private Long id_favorito;
    private Long id_paquete_experiencia;
    private Long id_usuario;

    public PaqueteExperienciaFavoritoSalidaDTO(Long id_favorito, Long id_paquete_experiencia, Long id_usuario) {
        this.id_favorito = id_favorito;
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.id_usuario = id_usuario;
    }

    public PaqueteExperienciaFavoritoSalidaDTO() {
    }

    public Long getId_favorito() {
        return id_favorito;
    }

    public void setId_favorito(Long id_favorito) {
        this.id_favorito = id_favorito;
    }

    public Long getId_paquete_experiencia() {
        return id_paquete_experiencia;
    }

    public void setId_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }
}