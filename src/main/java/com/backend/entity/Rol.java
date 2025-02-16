package com.backend.entity;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRol;

    @Column(nullable = false, length = 45)
    private String nombre;

    @OneToMany(mappedBy = "rol")
    private List<Usuario> usuarios;

    // Getters y Setters
}
