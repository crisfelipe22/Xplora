package com.backend.dto.entada;
import java.util.Date;

public class ReservaEntradaDTO {
    private Long idUsuario;
    private Long idPaqueteExperiencia;
    private Date fecha_inicio;
    private Date fecha_fin;


    public ReservaEntradaDTO() {
    }

    public ReservaEntradaDTO(Long idUsuario, Long idPaqueteExperiencia, Date fecha_inicio, Date fecha_fin) {
        this.idUsuario = idUsuario;
        this.idPaqueteExperiencia = idPaqueteExperiencia;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin= fecha_fin;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdPaqueteExperiencia() {
        return idPaqueteExperiencia;
    }

    public void setIdPaqueteExperiencia(Long idPaqueteExperiencia) {
        this.idPaqueteExperiencia = idPaqueteExperiencia;
    }

    public Date getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(Date fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }
}

