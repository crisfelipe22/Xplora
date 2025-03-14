package com.backend.dto.salida;

import java.util.Date;

public class PaqueteExperienciaSalidaDTO {

    private Long id_paquete_experiencia;
    private String nombre;

    private String descripcion;

    private double precio;

    private String ubicacion;
    private String imagen;
    private String duracion;

    private Long id_categoria;

    private Date fecha_inicio;

    private Date fecha_fin;

    public PaqueteExperienciaSalidaDTO(Long id_paquete_experiencia, String nombre, String descripcion, double precio, String ubicacion, String imagen, String duracion, Long id_categoria, Date fecha_inicio, Date fecha_fin) {
        this.id_paquete_experiencia = id_paquete_experiencia;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.ubicacion = ubicacion;
        this.imagen = imagen;
        this.duracion = duracion;
        this.id_categoria = id_categoria;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
    }

    public PaqueteExperienciaSalidaDTO() {
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

    public void setId_paquete_experiencia(Long id_paquete_experiencia) {
        this.id_paquete_experiencia = id_paquete_experiencia;
    }

    public Long getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Long id_categoria) {
        this.id_categoria = id_categoria;
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
