package com.backend.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long id_categoria;

    @Column(name = "nombre", nullable = false, unique = true)
    private String nombre;

    // Getters y setters
    public Long getIdCategoria() {
        return id_categoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.id_categoria = id_categoria;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
