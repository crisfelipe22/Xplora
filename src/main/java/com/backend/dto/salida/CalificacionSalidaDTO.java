package com.backend.dto.salida;


import java.util.Date;

public class CalificacionSalidaDTO {

    private Long id;
    private int puntuacion;
    private String comentario;
    private Date fecha_calificacion;
    private Long id_reserva;
    private Long id_usuario;

    private Long id_paquete_experiencia;
    private String nombre_usuario;

    public CalificacionSalidaDTO(Long id, int puntuacion, String comentario, Date fecha_calificacion, Long id_reserva, Long id_usuario, Long id_paquete_experiencia, String nombre_usuario) {
        this.id = id;
        this.puntuacion = puntuacion;
        this.comentario = comentario;
        this.fecha_calificacion = fecha_calificacion;
        this.id_reserva = id_reserva;
        this.id_usuario = id_usuario;
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.nombre_usuario = nombre_usuario;
    }

    public CalificacionSalidaDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getId_reserva() {
        return id_reserva;
    }

    public void setId_reserva(Long id_reserva) {
        this.id_reserva = id_reserva;
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public Long getId_paquete_experiencia() {
        return id_paquete_experiencia;
    }

    public void setId_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
    }

    public String getNombre_usuario() {
        return nombre_usuario;
    }

    public void setNombre_usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }
}
