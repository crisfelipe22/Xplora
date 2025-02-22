package com.backend.dto.entada.Categoria;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;

import java.util.Date;

public class PaqueteExperienciaEntradaDto {

    @NotBlank(message="Debe indicar el nombre del paquete de experiencia")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String nombre;

    @NotBlank(message="Debe indicar la descripción del paquete de experiencia")
    @Size(min = 3, max = 50, message = "La descripción debe tener entre 3 y 50 caracteres")
    private String descripcion;

    @NotBlank(message="Debe indicar la descripción del paquete de experiencia")
    @Size(min = 3, max = 50, message = "La descripción debe tener entre 3 y 50 caracteres")
    private double precio;

    @NotBlank(message="Debe indicar la ubicación del paquete de experiencia")
    @Size(min = 3, max = 50, message = "La ubicación debe tener entre 3 y 50 caracteres")
    private String ubicacion;

    @NotBlank(message="Debe indicar de la imagen del paquete de experiencia")
    private String imagenUrl;

    @NotNull(message = "Debe indicar la fecha de la experiencia")
    @Future(message = "La fecha de la experiencia debe ser en el futuro")
    private Date fechaExperiencia;
    @NotBlank(message = "Debe indicar la duración de la experiencia")
    @Pattern(regexp = "^[0-9]+\\s?(min|hora|horas|dia|dias)$", message = "La duración debe estar en un formato válido, por ejemplo: '30 min', '2 horas', '1 dia'")
    private String duracion;

    public PaqueteExperienciaEntradaDto(String nombre, String descripcion, double precio, String ubicacion, String imagenUrl, Date fechaExperiencia, String duracion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.ubicacion = ubicacion;
        this.imagenUrl = imagenUrl;
        this.fechaExperiencia = fechaExperiencia;
        this.duracion = duracion;
    }

    public PaqueteExperienciaEntradaDto() {
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

    public Date getFechaExperiencia() {
        return fechaExperiencia;
    }

    public void setFechaExperiencia(Date fechaExperiencia) {
        this.fechaExperiencia = fechaExperiencia;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }
}
