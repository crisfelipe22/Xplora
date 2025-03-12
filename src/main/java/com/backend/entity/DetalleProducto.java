package com.backend.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "detalle_producto")
public class DetalleProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    private String descripcion;
    
    private String logo;

    @ManyToMany
    @JoinTable(
        name = "paquete_experiencia_detalle_producto",
        joinColumns = @JoinColumn(name = "detalle_producto_id"),
        inverseJoinColumns = @JoinColumn(name = "paquete_experiencia_id")
    )
    private Set<PaqueteExperiencia> paquetesExperiencia = new HashSet<>();

    public DetalleProducto() {
    }

    public DetalleProducto(String nombre, String descripcion, String logo) {
        this.nombre = nombre;
        this.descripcion = descripcion;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Set<PaqueteExperiencia> getPaquetesExperiencia() {
        return paquetesExperiencia;
    }

    public void setPaquetesExperiencia(Set<PaqueteExperiencia> paquetesExperiencia) {
        this.paquetesExperiencia = paquetesExperiencia;
    }
}
