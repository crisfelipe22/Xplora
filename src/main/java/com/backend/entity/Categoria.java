package com.backend.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;

import java.util.List;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    @Column(nullable = false, length = 45, unique = true)
    private String nombre;

    @Column(nullable = false)
    private String descripcion;

    @OneToMany(mappedBy = "categoria")
    private List<PaqueteExperiencia> paqueteExperiencias;

    // Getters y Setters

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
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

    public List<PaqueteExperiencia> getPaqueteExperiencias() {
        return paqueteExperiencias;
    }

    public void setPaqueteExperiencias(List<PaqueteExperiencia> paqueteExperiencias) {
        this.paqueteExperiencias = paqueteExperiencias;
    }
}
