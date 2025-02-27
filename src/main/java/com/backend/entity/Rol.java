package com.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id_rol")
    private Long id_rol;

    @Column(name = "nombre", nullable = false, unique = true)
    private String nombre;

    // Getters y Setters
    public Long getId_rol() {
        return id_rol;
    }

    public void setId_Rol(Long id_rol) {
        this.id_rol = id_rol;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}