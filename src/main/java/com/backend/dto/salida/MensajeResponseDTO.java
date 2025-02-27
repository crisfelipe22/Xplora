package com.backend.dto.salida;

// DTO para mensaje de respuesta genérico
public class MensajeResponseDTO {

    private String mensaje;
    private boolean exito;

    public MensajeResponseDTO(String mensaje, boolean exito) {
        this.mensaje = mensaje;
        this.exito = exito;
    }

    // Getters y Setters
    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public boolean isExito() {
        return exito;
    }

    public void setExito(boolean exito) {
        this.exito = exito;
    }
}