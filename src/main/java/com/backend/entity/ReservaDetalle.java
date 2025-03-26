package com.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "reserva_detalle")
public class ReservaDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_reserva_detalle;

    @ManyToOne
    @JoinColumn(name = "id_reserva", nullable = false)
    private Reserva reserva;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_paquete_experiencia", nullable = false)
    private PaqueteExperiencia paqueteExperiencia;

    private String usuarioNombre; // Información adicional del usuario
    private String paqueteNombre; // Nombre del paquete
    private String paqueteDescripcion;
    private double paquetePrecio;
    private String paqueteUbicacion;
    private String paqueteDuracion;

    public ReservaDetalle() {
    }

    public ReservaDetalle(Reserva reserva, PaqueteExperiencia paqueteExperiencia, String usuarioNombre, String paqueteNombre, String paqueteDescripcion, double paquetePrecio, String paqueteUbicacion, String paqueteDuracion, Usuario usuario) {
        this.reserva = reserva;
        this.usuario = usuario;
        this.paqueteExperiencia = paqueteExperiencia;
        this.usuarioNombre = usuarioNombre;
        this.paqueteNombre = paqueteNombre;
        this.paqueteDescripcion = paqueteDescripcion;
        this.paquetePrecio = paquetePrecio;
        this.paqueteUbicacion = paqueteUbicacion;
        this.paqueteDuracion = paqueteDuracion;
    }

    public Long getId_reserva_detalle() {
        return id_reserva_detalle;
    }

    public void setId_reserva_detalle(Long id_reserva_detalle) {
        this.id_reserva_detalle = id_reserva_detalle;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }

    public PaqueteExperiencia getPaqueteExperiencia() {
        return paqueteExperiencia;
    }

    public void setPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia) {
        this.paqueteExperiencia = paqueteExperiencia;
    }

    public String getUsuarioNombre() {
        return usuarioNombre;
    }

    public void setUsuarioNombre(String usuarioNombre) {
        this.usuarioNombre = usuarioNombre;
    }

    public String getPaqueteNombre() {
        return paqueteNombre;
    }

    public void setPaqueteNombre(String paqueteNombre) {
        this.paqueteNombre = paqueteNombre;
    }

    public String getPaqueteDescripcion() {
        return paqueteDescripcion;
    }

    public void setPaqueteDescripcion(String paqueteDescripcion) {
        this.paqueteDescripcion = paqueteDescripcion;
    }

    public double getPaquetePrecio() {
        return paquetePrecio;
    }

    public void setPaquetePrecio(double paquetePrecio) {
        this.paquetePrecio = paquetePrecio;
    }

    public String getPaqueteUbicacion() {
        return paqueteUbicacion;
    }

    public void setPaqueteUbicacion(String paqueteUbicacion) {
        this.paqueteUbicacion = paqueteUbicacion;
    }

    public String getPaqueteDuracion() {
        return paqueteDuracion;
    }

    public void setPaqueteDuracion(String paqueteDuracion) {
        this.paqueteDuracion = paqueteDuracion;
    }
}
