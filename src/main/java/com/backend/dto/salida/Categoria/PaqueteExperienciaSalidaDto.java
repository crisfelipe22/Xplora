package com.backend.dto.salida.Categoria;

import java.util.Date;

public class PaqueteExperienciaSalidaDto {

    private Long id_paquete_experiencia;
    private String nombre;

    private String descripcion;

    private double precio;

    private String ubicacion;
    private String imagen;
    private String duracion;

    private Date fechaExperiencia;

    public PaqueteExperienciaSalidaDto(Long id_paquete_experiencia, String nombre, String descripcion, double precio, String ubicacion, String imagen, String duracion, Date fechaExperiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.ubicacion = ubicacion;
        this.imagen = imagen;
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

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
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
