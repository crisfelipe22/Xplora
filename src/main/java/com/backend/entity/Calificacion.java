package com.backend.entity;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "calificacion")
public class Calificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_calificacion;

    @OneToOne
    @JoinColumn(name = "id_reserva", nullable = false, unique = true)
    private Reserva reserva;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_paquete_experiencia", nullable = false)
    private PaqueteExperiencia paqueteExperiencia;

    @Column(nullable = false)
    private int puntuacion;

    @Column(length = 500)
    private String comentario;

    @Column(nullable = false)
    private Date fecha_calificacion;

    public Calificacion(Long id_calificacion, Reserva reserva, Usuario usuario, PaqueteExperiencia paqueteExperiencia, int puntuacion, String comentario, Date fecha_calificacion) {
        this.id_calificacion = id_calificacion;
        this.reserva = reserva;
        this.usuario = usuario;
        this.paqueteExperiencia = paqueteExperiencia;
        this.puntuacion = puntuacion;
        this.comentario = comentario;
        this.fecha_calificacion = fecha_calificacion;
    }

    public PaqueteExperiencia getPaqueteExperiencia() {
        return paqueteExperiencia;
    }

    public void setPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia) {
        this.paqueteExperiencia = paqueteExperiencia;
    }

    public Calificacion() {
    }

    public Long getId_calificacion() {
        return id_calificacion;
    }

    public void setId_calificacion(Long id_calificacion) {
        this.id_calificacion = id_calificacion;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public int getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(int puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Date getFecha_calificacion() {
        return fecha_calificacion;
    }

    public void setFecha_calificacion(Date fecha_calificacion) {
        this.fecha_calificacion = fecha_calificacion;
    }


}
