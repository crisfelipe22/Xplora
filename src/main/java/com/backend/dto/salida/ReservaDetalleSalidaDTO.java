package com.backend.dto.salida;

public class ReservaDetalleSalidaDTO {

    private Long idReserva;
    private String nombreUsuario;
    private String nombrePaquete;
    private String descripcionPaquete;
    private String duracionPaquete;
    private Double precioPaquete;
    private String ubicacionPaquete;

    // Constructor vacío
    public ReservaDetalleSalidaDTO() {}

    // Constructor con todos los campos
    public ReservaDetalleSalidaDTO(Long idReserva, String nombreUsuario, String nombrePaquete,
                                   String descripcionPaquete, String duracionPaquete,
                                   Double precioPaquete, String ubicacionPaquete) {
        this.idReserva = idReserva;
        this.nombreUsuario = nombreUsuario;
        this.nombrePaquete = nombrePaquete;
        this.descripcionPaquete = descripcionPaquete;
        this.duracionPaquete = duracionPaquete;
        this.precioPaquete = precioPaquete;
        this.ubicacionPaquete = ubicacionPaquete;
    }

    // Getters y Setters
    public Long getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getNombrePaquete() {
        return nombrePaquete;
    }

    public void setNombrePaquete(String nombrePaquete) {
        this.nombrePaquete = nombrePaquete;
    }

    public String getDescripcionPaquete() {
        return descripcionPaquete;
    }

    public void setDescripcionPaquete(String descripcionPaquete) {
        this.descripcionPaquete = descripcionPaquete;
    }

    public String getDuracionPaquete() {
        return duracionPaquete;
    }

    public void setDuracionPaquete(String duracionPaquete) {
        this.duracionPaquete = duracionPaquete;
    }

    public Double getPrecioPaquete() {
        return precioPaquete;
    }

    public void setPrecioPaquete(Double precioPaquete) {
        this.precioPaquete = precioPaquete;
    }

    public String getUbicacionPaquete() {
        return ubicacionPaquete;
    }

    public void setUbicacionPaquete(String ubicacionPaquete) {
        this.ubicacionPaquete = ubicacionPaquete;
    }

    @Override
    public String toString() {
        return "ReservaDetalleSalidaDTO{" +
                "idReserva=" + idReserva +
                ", nombreUsuario='" + nombreUsuario + '\'' +
                ", nombrePaquete='" + nombrePaquete + '\'' +
                ", descripcionPaquete='" + descripcionPaquete + '\'' +
                ", duracionPaquete='" + duracionPaquete + '\'' +
                ", precioPaquete=" + precioPaquete +
                ", ubicacionPaquete='" + ubicacionPaquete + '\'' +
                '}';
    }
}

