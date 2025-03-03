package com.backend.dto.entada;
public class PedidoEntradaDTO {
    private Long paquete_experienciaId;
    private boolean es_regalo;
    private double total;

    public Long getPaquete_experienciaId() {
        return paquete_experienciaId;
    }

    public void setPaquete_experienciaId(Long paquete_experienciaId) {
        this.paquete_experienciaId = paquete_experienciaId;
    }

    public boolean isEs_regalo() {
        return es_regalo;
    }

    public void setEs_regalo(boolean es_regalo) {
        this.es_regalo = es_regalo;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public PedidoEntradaDTO(Long paquete_experienciaId, boolean es_regalo, double total) {
        this.paquete_experienciaId = paquete_experienciaId;
        this.es_regalo = es_regalo;
        this.total = total;
    }

    public PedidoEntradaDTO() {
    }
}
