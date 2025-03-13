package com.backend.dto.salida;

import com.backend.entity.PaqueteDetalleProducto;

public class PaqueteDetalleSalidaDTO {

    private Long id_paquete_detalle_producto;
    
    private Long id_paquete_experiencia;

    private Long id_detalle_producto;

    public PaqueteDetalleSalidaDTO(Long id_paquete_detalle_producto, Long id_paquete_experiencia, Long id_detalle_producto) {
        this.id_paquete_detalle_producto = id_paquete_detalle_producto;
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.id_detalle_producto = id_detalle_producto;
    }

    public PaqueteDetalleSalidaDTO(PaqueteDetalleProducto detalle) {
        this.id_paquete_detalle_producto = detalle.getId_paquete_detalle_producto();
        this.id_paquete_experiencia = detalle.getPaquete_experiencia().getId_paquete_experiencia();
        this.id_detalle_producto = detalle.getDetalle_producto().getId();
    }

    public Long getId_paquete_detalle_producto() {
        return id_paquete_detalle_producto;
    }

    public void setId_paquete_detalle_producto(Long id_paquete_detalle_producto) {
        this.id_paquete_detalle_producto = id_paquete_detalle_producto;
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
