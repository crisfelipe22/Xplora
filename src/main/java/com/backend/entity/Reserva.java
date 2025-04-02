package com.backend.entity;

import jakarta.persistence.*;
        import java.util.Date;

@Entity
@Table(name = "reserva")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_reserva;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_paqueteExperiencia", nullable = false)
    private PaqueteExperiencia paqueteExperiencia;

    private Date fecha_inicio;
    private Date fecha_fin;

    @OneToOne(mappedBy = "reserva", cascade = CascadeType.ALL, orphanRemoval = true)
    private Calificacion calificacion;

    public Reserva() {
    }

    public Reserva(Usuario usuario,PaqueteExperiencia paqueteExperiencia, Date fecha_inicio, Date fecha_fin) {
        this.usuario = usuario;
        this.paqueteExperiencia = paqueteExperiencia;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }

    public Long getId_reserva() {
        return id_reserva;
    }

    public void setId_reserva(Long id_reserva) {
        this.id_reserva = id_reserva;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public PaqueteExperiencia getPaqueteExperiencia() {
        return paqueteExperiencia;
    }

    public void setPaqueteExperiencia(PaqueteExperiencia paqueteExperiencia) {
        this.paqueteExperiencia = paqueteExperiencia;
    }

    public Date getFecha_inicio() {
        return fecha_inicio;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_inicio(Date fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }
    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public Calificacion getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(Calificacion calificacion) {
        this.calificacion = calificacion;
    }

}
