package com.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "paquete_detalle_producto")
public class PaqueteDetalleProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_paquete_experiencia", nullable = false)
    private PaqueteExperiencia paqueteExperiencia;

    @ManyToOne
    @JoinColumn(name = "id_detalle_producto", nullable = false)
    private DetalleProducto detalleProducto;

    public PaqueteDetalleProducto() {
    }

    public PaqueteDetalleProducto(PaqueteExperiencia paqueteExperiencia, DetalleProducto detalleProducto) {
        this.paqueteExperiencia = paqueteExperiencia;
        this.detalleProducto = detalleProducto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PaqueteExperiencia getPaqueteExperiencia() {
        return paqueteExperiencia;
    }

    public void setPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia) {
        this.paqueteExperiencia = paqueteExperiencia;
    }

    public DetalleProducto getDetalleProducto() {
        return detalleProducto;
    }

    public void setDetalleProducto(DetalleProducto detalleProducto) {
        this.detalleProducto = detalleProducto;
    }
}

