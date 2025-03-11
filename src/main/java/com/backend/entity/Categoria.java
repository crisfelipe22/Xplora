package com.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "categoria", uniqueConstraints = {@UniqueConstraint(columnNames = "nombre")})
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long id_categoria;

    @Column(name = "nombre", nullable = false, unique = true)
    private String nombre;

    // Getters y setters

    public Categoria(Long id_categoria, String nombre) {
        this.id_categoria = id_categoria;
        this.nombre = nombre;
    }

    public Categoria() {
    }

    public Long getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Long id_categoria) {
        this.id_categoria = id_categoria;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}