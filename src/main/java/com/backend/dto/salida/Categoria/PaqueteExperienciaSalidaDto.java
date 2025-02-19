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

    private Date fecha_experiencia;

    private Long id_categoria;

    public PaqueteExperienciaSalidaDto(Long id_paquete_experiencia, String nombre, String descripcion, double precio, String ubicacion, String imagen, String duracion, Date fecha_experiencia, Long id_categoria) {
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.ubicacion = ubicacion;
        this.imagen = imagen;
        this.duracion = duracion;
        this.fecha_experiencia = fecha_experiencia;
        this.id_categoria = id_categoria;
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

    public Long getId_paquete_experiencia() {
        return id_paquete_experiencia;
    }

    public Date getFecha_experiencia() {
        return fecha_experiencia;
    }

    public void setId_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
    }

    public void setFecha_experiencia(Date fecha_experiencia) {
        this.fecha_experiencia = fecha_experiencia;
    }

    public Long getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Long id_categoria) {
        this.id_categoria = id_categoria;
    }
}
