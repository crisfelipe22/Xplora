package com.backend.dto.entada;
public class PedidoEntradaDTO {
    private Long id_paquete_experiencia;
    private boolean es_regalo;
    private double total;

    public PedidoEntradaDTO() {
    }

    public PedidoEntradaDTO(Long id_paquete_experiencia, boolean es_regalo, double total) {
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.es_regalo = es_regalo;
        this.total = total;
    }

    public Long getId_paquete_experiencia() {
        return id_paquete_experiencia;
    }

    public void setId_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
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
}
