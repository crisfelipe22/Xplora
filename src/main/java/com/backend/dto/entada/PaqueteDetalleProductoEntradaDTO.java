package com.backend.dto.entada;

import jakarta.validation.constraints.Positive;

public class PaqueteDetalleProductoEntradaDTO {
    
    private Long id_paquete_experiencia;

    @Positive(message = "El id del detalle del producto no puede ser nulo o menor a cero")
    private Long id_detalle_producto;

    public PaqueteDetalleProductoEntradaDTO(Long id_paquete_experiencia, Long id_detalle_producto) {
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.id_detalle_producto = id_detalle_producto;
    }

    public PaqueteDetalleProductoEntradaDTO() {
    }

    public Long getId_paquete_experiencia() {
        return id_paquete_experiencia;
    }

    public void setId_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
    }

    public Long getId_detalle_producto() {
        return id_detalle_producto;
    }

    public void setId_detalle_producto(Long id_detalle_producto) {
        this.id_detalle_producto = id_detalle_producto;
    }
}
