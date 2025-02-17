package com.backend.dto.salida;

public class PedidoSalidaDTO {
    private Long idPedido;
    private Long paqueteExperienciaId;
    private boolean esRegalo;
    private double total;

    public PedidoSalidaDTO() {
    }

    // Getters y Setters
    public Long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Long idPedido) {
        this.idPedido = idPedido;
    }

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
