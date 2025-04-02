package com.backend.dto.entada;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.Date;

public class CalificacionEntradaDTO {

    @Min(value = 1, message = "La puntuación mínima es 1")
    @Max(value = 5, message = "La puntuación máxima es 5")
    private int puntuacion;

    private String comentario;
    private Date fecha_calificacion;

    public CalificacionEntradaDTO(int puntuacion, String comentario, Date fecha_calificacion) {
        this.puntuacion = puntuacion;
        this.comentario = comentario;
        this.fecha_calificacion = fecha_calificacion;
    }

    public CalificacionEntradaDTO() {
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
