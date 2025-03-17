package com.backend.dto.entada;

import jakarta.validation.constraints.Positive;

public class CaracteristicaPaqueteExperienciaEntradaDTO {
    
    private Long id_paquete_experiencia;

    @Positive(message = "El id de la caracteristica no puede ser nulo o menor a cero")
    private Long id_caracteristica;

    public CaracteristicaPaqueteExperienciaEntradaDTO(Long id_paquete_experiencia, Long id_caracteristica) {
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.id_caracteristica = id_caracteristica;
    }

    public CaracteristicaPaqueteExperienciaEntradaDTO() {
    }

    public Long getId_paquete_experiencia() {
        return id_paquete_experiencia;
    }

    public void setId_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
    }

    public Long getId_caracteristica() {
        return id_caracteristica;
    }

    public void setId_caracteristica(Long id_caracteristica) {
        this.id_caracteristica = id_caracteristica;
    }
}
