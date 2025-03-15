package com.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "caracteristica_paquete_experiencia")
public class CaracteristicaPaqueteExperiencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_caracteristica_paquete_experiencia")
    private Long id_caracteristica_paquete_experiencia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_paquete_experiencia", nullable = false)
    private PaqueteExperiencia paquete_experiencia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_caracteristica", nullable = false)
    private Caracteristica caracteristica;

    public CaracteristicaPaqueteExperiencia(Long id_caracteristica_paquete_experiencia, PaqueteExperiencia paquete_experiencia, Caracteristica caracteristica) {
        this.id_caracteristica_paquete_experiencia = id_caracteristica_paquete_experiencia;
        this.paquete_experiencia = paquete_experiencia;
        this.caracteristica = caracteristica;
    }

    public CaracteristicaPaqueteExperiencia() {
    }

    public Long getId_caracteristica_paquete_experiencia() {
        return id_caracteristica_paquete_experiencia;
    }

    public void setId_caracteristica_paquete_experiencia(Long id_caracteristica_paquete_experiencia) {
        this.id_caracteristica_paquete_experiencia = id_caracteristica_paquete_experiencia;
    }

    public PaqueteExperiencia getPaquete_experiencia() {
        return paquete_experiencia;
    }

    public void setPaquete_experiencia(PaqueteExperiencia paquete_experiencia) {
        this.paquete_experiencia = paquete_experiencia;
    }

    public Caracteristica getCaracteristica() {
        return caracteristica;
    }

    public void setCaracteristica(Caracteristica caracteristica) {
        this.caracteristica = caracteristica;
    }
}

