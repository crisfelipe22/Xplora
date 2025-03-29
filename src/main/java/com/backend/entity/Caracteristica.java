package com.backend.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "")
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
        
    private Long logo;

    @ManyToMany
    @JoinTable(
        name = "caracteristica_paquete_experiencia",
        joinColumns = @JoinColumn(name = "id_caracteristica"),
        inverseJoinColumns = @JoinColumn(name = "id_paquete_experiencia")
    )
    private Set<PaqueteExperiencia> paquetesExperiencia = new HashSet<>();

    public Caracteristica() {
    }

    public Caracteristica(String nombre, Long logo) {
        this.nombre = nombre;
        this.logo = logo;
        this.paquetesExperiencia = new HashSet<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getLogo() {
        return logo;
    }

    public void setLogo(Long logo) {
        this.logo = logo;
    }

    public Set<PaqueteExperiencia> getPaquetesExperiencia() {
        return paquetesExperiencia;
    }

    public void setPaquetesExperiencia(Set<PaqueteExperiencia> paquetesExperiencia) {
        this.paquetesExperiencia = paquetesExperiencia;
    }
}
