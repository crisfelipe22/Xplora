package com.backend.dto.salida;

import com.backend.entity.CaracteristicaPaqueteExperiencia;

public class CaracteristicaPaqueteExperienciaSalidaDTO {

    private Long id_caracteristica_paquete_experiencia;
    
    private Long id_paquete_experiencia;

    private Long id_caracteristica;

    public CaracteristicaPaqueteExperienciaSalidaDTO(Long id_caracteristica_paquete_experiencia, Long id_paquete_experiencia, Long id_caracteristica) {
        this.id_caracteristica_paquete_experiencia = id_caracteristica_paquete_experiencia;
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.id_caracteristica = id_caracteristica;
    }

    public CaracteristicaPaqueteExperienciaSalidaDTO(CaracteristicaPaqueteExperiencia caracteristica) {
        this.id_caracteristica_paquete_experiencia = caracteristica.getId_caracteristica_paquete_experiencia();
        this.id_paquete_experiencia = caracteristica.getPaquete_experiencia().getId_paquete_experiencia();
        this.id_caracteristica = caracteristica.getCaracteristica().getId();
    }

    public Long getid_caracteristica_paquete_experiencia() {
        return id_caracteristica_paquete_experiencia;
    }

    public void setid_caracteristica_paquete_experiencia(Long id_caracteristica_paquete_experiencia) {
        this.id_caracteristica_paquete_experiencia = id_caracteristica_paquete_experiencia;
    }

    public Long getId_paquete_experiencia() {
        return id_paquete_experiencia;
    }

    public void setId_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
    }

    public Long getid_caracteristica() {
        return id_caracteristica;
    }

    public void setid_caracteristica(Long id_caracteristica) {
        this.id_caracteristica = id_caracteristica;
    }
}
