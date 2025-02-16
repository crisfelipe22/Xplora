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

    @Column(nullable = false, length = 45, unique = true)
    private String nombre;

    @Column(nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private double precio;

    private String ubicacion;
    private String imagenUrl;
    private String duracion;

    @Temporal(TemporalType.DATE)
    private Date fechaExperiencia;

    @ManyToOne
    @JoinColumn(name = "id_Categoria")
    private Categoria categoria;

    // Getters y Setters
}
