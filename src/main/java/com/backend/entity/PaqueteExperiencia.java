package com.backend.entity;
import jakarta.persistence.*;
import jakarta.persistence.Entity;


import java.util.Date;

@Entity
@Table(name = "paquete_experiencia")
public class PaqueteExperiencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPaqueteExperiencia;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
    @Column(nullable = false)
    private String nombre;
    private String descripcion;
    private double precio;
    private String ubicacion;
    private String imagen;
    private String duracion;
    private Date fechaExperiencia;


    public PaqueteExperiencia() {
    }

    // Getters y Setters
    // Getters y Setters
    public Long getIdPaqueteExperiencia() {
        return idPaqueteExperiencia;
    }

    public void setIdPaqueteExperiencia(Long idPaqueteExperiencia) {
        this.idPaqueteExperiencia = idPaqueteExperiencia;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
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

