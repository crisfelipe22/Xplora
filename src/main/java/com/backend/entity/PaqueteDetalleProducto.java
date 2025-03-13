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
@Table(name = "paquete_detalle_producto")
public class PaqueteDetalleProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_paquete_detalle_producto")
    private Long id_paquete_detalle_producto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_paquete_experiencia", nullable = false)
    private PaqueteExperiencia paquete_experiencia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_detalle_producto", nullable = false)
    private DetalleProducto detalle_producto;

    public PaqueteDetalleProducto() {
    }

    public PaqueteDetalleProducto(PaqueteExperiencia paquete_experiencia, DetalleProducto detalle_producto) {
        this.paquete_experiencia = paquete_experiencia;
        this.detalle_producto = detalle_producto;
    }

    public PaqueteExperiencia getPaquete_experiencia() {
        return paquete_experiencia;
    }

    public void setPaquete_experiencia(PaqueteExperiencia paquete_experiencia) {
        this.paquete_experiencia = paquete_experiencia;
    }

    public Long getId_paquete_detalle_producto() {
        return id_paquete_detalle_producto;
    }

    public void setId_paquete_detalle_producto(Long id_paquete_detalle_producto) {
        this.id_paquete_detalle_producto = id_paquete_detalle_producto;
    }

    public DetalleProducto getDetalle_producto() {
        return detalle_producto;
    }

    public void setDetalle_producto(DetalleProducto detalle_producto) {
        this.detalle_producto = detalle_producto;
    }
}

