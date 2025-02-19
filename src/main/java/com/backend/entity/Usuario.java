package com.backend.entity;
import jakarta.persistence.*;
import java.util.Date;
import jakarta.persistence.Entity;


@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;

    @Column(nullable = false, length = 45)
    private String nombre;

    @Column(nullable = false, length = 45, unique = true)
    private String email;

    @Column(nullable = false, length = 45)
    private String contrasena;

    private int telefono;

    @Column(length = 100)
    private String direccion;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaRegistro;

    @ManyToOne
    @JoinColumn(name = "id_Rol", nullable = false)
    private Rol rol;

    // Getters y Setters
}
