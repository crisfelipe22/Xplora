package com.backend.dto.salida.Categoria;

import java.util.Date;

public class PaqueteExperienciaSalidaDto {

    private Long idPaqueteExperiencia;
    private String nombre;

    private String descripcion;

    private double precio;

    private String ubicacion;
    private String imagenUrl;
    private String duracion;

    private Date fechaExperiencia;

    public PaqueteExperienciaSalidaDto(Long idPaqueteExperiencia, String nombre, String descripcion, double precio, String ubicacion, String imagenUrl, String duracion, Date fechaExperiencia) {
        this.idPaqueteExperiencia = idPaqueteExperiencia;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.ubicacion = ubicacion;
        this.imagenUrl = imagenUrl;
        this.duracion = duracion;
        this.fechaExperiencia = fechaExperiencia;
    }

    public PaqueteExperienciaSalidaDto() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public Date getFechaExperiencia() {
        return fechaExperiencia;
    }

    public void setFechaExperiencia(Date fechaExperiencia) {
        this.fechaExperiencia = fechaExperiencia;
    }
}
