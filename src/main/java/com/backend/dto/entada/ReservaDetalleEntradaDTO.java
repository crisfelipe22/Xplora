package com.backend.dto.entada;

public class ReservaDetalleEntradaDTO {
    private Long reservaId;

    // Constructor
    public ReservaDetalleEntradaDTO() {}

    public ReservaDetalleEntradaDTO(Long reservaId) {
        this.reservaId = reservaId;
    }

    // Getter y Setter
    public Long getReservaId() {
        return reservaId;
    }

    public void setReservaId(Long reservaId) {
        this.reservaId = reservaId;
    }
}
