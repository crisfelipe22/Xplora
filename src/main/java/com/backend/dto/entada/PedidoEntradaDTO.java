package com.backend.dto.entada;
public class PedidoEntradaDTO {
    private Long paqueteExperienciaId;
    private boolean esRegalo;
    private double total;

    public PedidoEntradaDTO() {
    }

    // Getters y Setters
    public Long getPaqueteExperienciaId() {
        return paqueteExperienciaId;
    }

    public void setPaqueteExperienciaId(Long paqueteExperienciaId) {
        this.paqueteExperienciaId = paqueteExperienciaId;
    }

    public boolean isEsRegalo() {
        return esRegalo;
    }

    public void setEsRegalo(boolean esRegalo) {
        this.esRegalo = esRegalo;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}
